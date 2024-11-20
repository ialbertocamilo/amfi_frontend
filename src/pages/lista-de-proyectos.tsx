import React, {useEffect, useState} from 'react';
import "./globals.css";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {useRouter} from 'next/router';
import Layout from "@/components/Layout";
import {ProjectMapper} from "@/mappers/project.mapper";

const ListaDeProyectos = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [filterText, setFilterText] = useState('');

    const router = useRouter();

    const handleRedirect = (projectId: string) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.company?.type === 'production-studio') {
            router.push(`/postulacion-proceso?projectId=${projectId}`);
        } else {
            router.push(`/proyecto?id=${projectId}`);
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(filterText.toLowerCase())
    );

    async function listarProyecto() {

        try {
            const response = await api.get('/project', );
            setProjects(response.data||[]);
        } catch (error: any) {
            if (error.status === 400)
                error.response?.data?.message.forEach((value: any) => toast.error(value))
            if (error.status === 409)
                toast.error(error.response?.data?.clientMessage)
        }
    }

    useEffect(() => {
        listarProyecto();
    }, []);

    return (

        <Layout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Lista de Proyectos</h1>
            </div>

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Filtrar tabla..."
                    className="p-2 border border-gray-300 rounded w-full"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
                <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded">Ver</button>
            </div>

            <div className="space-y-4">
                {filteredProjects.length === 0 && (
                    <div className="text-center text-gray-500">No hay proyectos disponibles.</div>
                )}
                {filteredProjects.map((project, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-medium">{project.name}</span>
                            {project.isNew && (
                                <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">Nuevo</span>
                            )}
                            {project.status === 'Descargar propuesta enviada' && (
                                <span className="text-sm text-red-500">
                        <i className="mr-1">⬇️</i>
                                    {project.status}
                      </span>
                            )}
                        </div>
                        {project.status && (
                            <span className="bg-green-100 text-green-500 text-sm px-4 py-2 rounded-full">
                  {ProjectMapper.mapProjectStatus(project.status)}
                  </span>
                        )}
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => handleRedirect(project.id)}
                        >
                            &gt;
                        </button>
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default ListaDeProyectos;