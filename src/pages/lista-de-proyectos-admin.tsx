import React, {useCallback, useEffect, useState} from "react";
import "./globals.css";
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import PaginatedComponent from "@/components/PaginationComponent";
import {getProjects} from "@/api/projectApi";
import moment from "moment";
import Layout from "@/components/Layout";
import useUser from "@/hooks/user.hook";
import ActionProjects from "@/components/ActionProjects";
import {ProjectMapper} from "@/mappers/project.mapper";
import {formatToLocalTime} from "@/lib/utils";

const ListaProyectosAdmin = () => {
    const headers = [
        {label: "Correlativo", key: "correlativo"},
        {label: "Nombre", key: "proyecto"},
        {label: "Agencia", key: "agencia"},
        {label: "Anunciante", key: "anunciante"},
        {label: "Fecha registro", key: "fechaRegistro"},
        {label: "Creador", key: "creador"},
        {label: "Estado", key: "estado"},
        {label: "Acción", key: "action"},
    ];

    const [projects, setProjects] = useState<any[]>([]);
    const router = useRouter();
    const {user, loading} = useUser();

    const crearProyecto = () => {
        router.push("/proyecto");
    };

    const fetchProjects = useCallback(async () => {
        try {
            const response = await getProjects();
            const projectsData = response?.map((proyecto: any, index: number) => ({
                correlativo: index + 1,
                id: proyecto.id,
                proyecto: proyecto.name,
                agencia: proyecto.agency?.name,
                anunciante: proyecto.advertiser?.name ?? '-',
                fechaRegistro:  formatToLocalTime(proyecto.createdAt),
                estado: ProjectMapper.mapProjectStatus(proyecto.status),
                creador: proyecto.creator?.name + ' ' + (proyecto?.creator?.lastName||''),
                action: (
                    <ActionProjects
                        id={proyecto.id}
                        userRole={user?.role as string}
                    />
                ),
            }));
            setProjects(projectsData);
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            if (error.status === 400) {
                error.response?.data?.message.forEach((value: any) => toast.error(value));
            }
            if (error.status === 409) {
                toast.error(error.response?.data?.clientMessage);
            }
        }
    }, [user?.role]);

    useEffect(() => {
        if (!loading) {
            fetchProjects();
        }
    }, [loading, fetchProjects]);

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
                    view={(id: string) => router.push(`/detalle-proyecto?id=${id}`)}
                    headers={headers}
                    items={projects}
                    itemsPerPage={10}
                />
            </div>
        </Layout>
    );
};

export default ListaProyectosAdmin;