import React, { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import PaginatedComponent from "@/components/PaginationComponent";
import { getProjects } from "@/api/projectApi";
import moment from "moment";
import Layout from "@/components/Layout";
import useUser from "@/hooks/user.hook";
import ActionProjects from "@/components/ActionProjects";
import { ProjectMapper } from "@/mappers/project.mapper";

interface User {
  id: string;
  proyecto: string;
  agencia: string;
  fechaRegistro: string;
  estado: string;
  creador: string;
  correlativo: number;
}

const ProjectStatusMap: { [key: string]: string } = {
  draft: "Borrador",
  inprogress: "En progreso",
  revision: "En revisión",
  finished: "Finalizado",
  closed: "Cerrado",
};
const ListaProyectosAdmin = () => {
  const headers = [
    { label: "Correlativo", key: "correlativo" },
    { label: "ID", key: "id" },
    {
      label: "Nombre",
      key: "proyecto",
    },
    {
      label: "Agencia",
      key: "agencia",
    },
    {
      label: "Anunciante",
      key: "anunciante",
    },
    { label: "Fecha registro", key: "fechaRegistro" },
    { label: "Creador", key: "creador" },
    {
      label: "Estado",
      key: "estado",
    },
    { label: "Acción", key: "action" },
  ];

  const [projects, setProjects] = useState<any[]>([]);

  const router = useRouter();

  const crearProyecto = () => {
    router.push("/proyecto");
  };

  const {user,loading} = useUser();
  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      const projectsData = response.map((proyecto: any, index: number) => ({
        correlativo: index + 1,
        id: proyecto.id,
        proyecto: proyecto.name,
        agencia: proyecto.agency?.name,
        anunciante: proyecto.advertiser?.name??'-',
        fechaRegistro: moment(proyecto.creator?.createdAt).format("DD/MM/YYYY"),
        estado: ProjectMapper.mapProjectStatus(proyecto.status),
        creador: proyecto.creator?.name,
        action: (
          <ActionProjects
            id={proyecto.id}
            userRole={user?.role as string}
          ></ActionProjects>
        ),
      }));
      setProjects(projectsData);
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      if (error.status === 400)
        error.response?.data?.message.forEach((value: any) =>
          toast.error(value)
        );
      if (error.status === 409)
        toast.error(error.response?.data?.clientMessage);
    }
  };

  useEffect(() => {
    if (!loading)
      fetchProjects();
  }, [loading]);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Lista de proyectos</h1>
      </div>

      <div className="flex flex-col md:flex-row mb-4 justify-between">
        <div className="flex w-full md:w-1/4 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Filtrar tabla..."
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded">
            Ver
          </button>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={crearProyecto}
        >
          Nuevo proyecto
        </button>
      </div>

      <div className="bg-white shadow-md rounded">
        <PaginatedComponent
          headers={headers}
          items={projects}
          itemsPerPage={10}
        />
      </div>
    </Layout>
  );
};

export default ListaProyectosAdmin;
