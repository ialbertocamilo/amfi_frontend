import React, { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/router";
import PaginatedComponent from "@/components/PaginationComponent";
import { api } from "@/lib/api";
import Layout from "@/components/Layout";
import { UserMapper } from "@/mappers/user.mapper";
import { IUser } from "@/interfaces/user.interface";
import moment from "moment";

interface User {
  id: string;
  company: string;
  name: string;
  registrationDate: string;
  type: string;
}

const Usuarios = () => {
  const headers = [
    { key: "id", label: "ID" },
    { key: "company", label: "Empresa" },
    { key: "name", label: "Nombre" },
    { key: "registrationDate", label: "Fecha Registro" },
    { key: "type", label: "Tipo" },
  ];

  const router = useRouter();
  const [data, setData] = useState<User[]>([]);

  const crearUsuario = () => {
    router.push("/nuevo-usuario");
  };

  useEffect(() => {
    api.get("/user/info").then((response) => {
      const transformedData = response.data.map((user: User) => ({
        ...user,
        registrationDate: moment(user.registrationDate).format('DD/MM/YYYY HH:mm'),
        type: UserMapper.mapRole(user.type),
      }));
      setData(transformedData);
      setFilteredData(transformedData);
    });
  }, []);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  useEffect(() => {
    setFilteredData(
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.company.toLowerCase().includes(filter.toLowerCase()) ||
          user.type.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, data]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Layout>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Usuarios</h1>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded"
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

          <div className="bg-white shadow-md rounded">
            <PaginatedComponent
              headers={headers}
              items={filteredData}
              itemsPerPage={10}
            />
          </div>
    </Layout>
  );
};

export default Usuarios;
