'use client';
import { checkMaxUsers, getInfoUsers } from "@/api/companyApi";
import { fetchUserInfo, User } from "@/api/userApi";
import ActionUsers from "@/components/ActionUsers";
import Layout from "@/components/Layout";
import PaginatedComponent from "@/components/PaginationComponent";
import { storageConstants } from "@/constants";
import { ICheckMaxUsersResponse } from "@/interfaces/company.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "./globals.css";

const Usuarios = () => {

    const [user, setUser] = useState<IUser>()
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUser = localStorage.getItem(storageConstants.user);
            if (localUser) {
                const convertedUser = JSON.parse(localUser) as IUser;
                setUser(convertedUser);
            }
        }
    }, []);
    const headers = [
        {key: "correlative", label: "ID"},
        {key: "name", label: "Nombre"},
        {key: "registrationDate", label: "Fecha Registro"},
        {key: "type", label: "Tipo"},
        {key: "isVerified", label: "Verificación"},
        {key: "action", label: "Acción"}
    ];

    const router = useRouter();
    const [data, setData] = useState<User[]>([]);


    const [infoUsers, setInfoUsers] = useState<ICheckMaxUsersResponse>()
    const crearUsuario = () => {
        try {

            checkMaxUsers().then((res) => {
                if (res && res.canAddUser) {
                    router.push("/nuevo-usuario");
                } else {
                    //Redirigir a /planes?register=true&email=mulinapog@mailinator.com&transactionId=171dc122-0957-4792-a6e4-b99ce3dc699a
                }
            })
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchUserInfo().then((data) => {
            const transformedData = data.map((data, index) => ({
                ...data,
                correlative: index + 1,
                isVerified: renderBadge(data.isVerified),
                action: <ActionUsers id={data.id} userRole={user?.role as string}/>
            }));
            setData(transformedData);
            setFilteredData(transformedData);
        });

        getInfoUsers().then((data) => {
            if (data)
                setInfoUsers(data)
        })
    }, []);

    const [filter, setFilter] = useState("");
    const [filteredData, setFilteredData] = useState<User[]>([]);
    useEffect(() => {
        if (data?.length)
            setFilteredData(
                data?.filter(
                    (user) =>
                        user?.name.toLowerCase().includes(filter.toLowerCase()) ||
                        user?.company.toLowerCase().includes(filter.toLowerCase()) ||
                        user?.type.toLowerCase().includes(filter.toLowerCase())
                )
            );
    }, [filter, data]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };
    const renderBadge = (isVerified: boolean) => {
        return (
            <span className={`px-2 py-1 rounded-full text-white ${isVerified ? 'bg-green-500' : 'bg-red-500'}`}>
        {isVerified ? 'Verificado' : 'No Verificado'}
      </span>
        );
    };
    return (
        <Layout>
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 font-bold">Cantidad de usuarios: {data.length}</p>
                <p className="text-gray-700 font-bold">Usuarios
                    restantes: {infoUsers?.maxUsers !== undefined && infoUsers?.totalUsers !== undefined ? infoUsers.maxUsers - infoUsers.totalUsers : 'N/A'}</p>
                <p className="text-gray-700 font-bold">Cantidad máxima: {infoUsers?.maxUsers} </p>

            </div>
            <div className="flex justify-end mt-4 mb-4">
                <a href={`/planes?register=true&email=${user?.email}&transactionId=`}
                   className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white py-1 px-3 rounded inline-flex items-center transition duration-200">
                    💰
                    Comprar plan
                </a>
            </div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Usuarios</h1>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={crearUsuario}
                >
                    + Nuevo usuario
                </button>
            </div>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nombre, compañia, tipo"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>

                <PaginatedComponent
                    view={(id: string) => router.push(`/usuario?id=${id}`)}
                    headers={headers}
                    items={filteredData}
                    itemsPerPage={10}
                />
        </Layout>
    );
};

export default Usuarios;
