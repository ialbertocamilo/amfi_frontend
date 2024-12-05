import React, { useEffect, useState } from "react";
import "./globals.css";
import toast from "react-hot-toast";
import PaginatedComponent from "@/components/PaginationComponent";
import { getProductoras } from "@/api/productoraApi";
import moment from "moment";
import Layout from "@/components/Layout";
import useUser from "@/hooks/user.hook";
import { useRouter } from "next/router";

const Productoras = () => {
    const [productoras, setProductoras] = useState<any[]>([]);

    const headers = [
        { label: "Correlativo", key: "correlativo" },
        { label: "Nombre", key: "name" },
        { label: "Nombre Legal", key: "legalName" },
        { label: "RFC", key: "nationalIdentifierOrRFC" },
        { label: "Año de Fundación", key: "foundingYear" },
        { label: "Fecha de Creación", key: "createdAt" },
    ];

    const { user, fetchUser } = useUser();

    useEffect(() => { fetchUser() }, [])
    const fetchProductoras = async () => {
        try {
            const response = await getProductoras();

            const productorasData = response.map((productora: any, index) => ({
                correlativo: index + 1,
                id: productora.id,
                slug: productora.slug,
                name: productora.name,
                legalName: productora.legalName,
                nationalIdentifierOrRFC: productora.nationalIdentifierOrRFC,
                foundingYear: productora.foundingYear,
                createdAt: moment(productora.createdAt).format("DD/MM/YYYY"),
            }));
            setProductoras(productorasData);
        } catch (error: any) {
            console.error("Error fetching productoras:", error);
            toast.error("Error al tratar de obtener productoras");
        }
    };

    useEffect(() => {
        if (user)
            fetchProductoras();
    }, [user]);

    const [filter, setFilter] = useState("");

    const [filteredData, setFilteredData] = useState<any[]>([]);
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };
    useEffect(() => {
        setFilteredData(
            productoras.filter(
                (data) =>
                    data.name?.toLowerCase().includes(filter?.toLowerCase()) ||
                    data.legalName?.toLowerCase().includes(filter?.toLowerCase()) ||
                    data.nationalIdentifierOrRFC?.toLowerCase()
                        .includes(filter?.toLowerCase())
            )
        );
    }, [filter, productoras]);

    const router = useRouter()
    return (
        <Layout>
            <h1 className="text-2xl font-semibold">Lista de productoras</h1>
            <div className="flex justify-between items-center mb-4"></div>

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por nombre, compañia, tipo"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>

            <div className="bg-white shadow-md rounded">
                <PaginatedComponent
                    view={(id: string) => router.push('productora?id=' + id)}
                    headers={headers}
                    items={filteredData}
                    itemsPerPage={10}
                />
            </div>
        </Layout>
    );
};

export default Productoras;
