import React, {useEffect, useState} from 'react';
import "./globals.css";
import toast from "react-hot-toast";
import {useRouter} from 'next/router';
import Layout from "@/components/Layout";
import {ProjectMapper} from "@/mappers/project.mapper";
import {getProductionHouseProjects} from "@/api/projectApi";
import {IProjectInvitation} from "@/interfaces/project-director.interface";
import moment from "moment";
import DownloadIcon from "@/components/icons/DownloadIcon";
import NextIcon from "@/components/icons/NextIcon";
import {CompanyType} from "@/constants";
import {ProjectInvitationMapper} from "@/mappers/project-invitation.mapper";
import Loader from '@/components/Loader';


const ProjectStatus = ({status}: { status: string }) => {
    if (!status) return <span className="bg-red-100 text-red-500 text-sm px-4 py-2 rounded-full">Pendiente</span>
    return <span className="bg-green-100 text-green-500 text-sm px-4 py-2 rounded">
              {ProjectMapper.mapProjectStatus(status)}
           </span>
}
const InvitationStatus = ({status}: { status: boolean }) => {
    if (!status) return <span className="bg-red-100 text-red-500 text-sm px-4 py-2 rounded-full">Pendiente</span>
    return <span className="bg-green-100 text-green-500 text-sm px-4 py-2 rounded">
              {ProjectInvitationMapper.mapStatus(status)}
           </span>
}
const NewBadge = ({createdAt}: { createdAt: Date }) => {
    return (moment().isSame(createdAt, 'day') && (
        <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">Nuevo</span>));
};
const ProposalUploaded = ({isUploaded, onClick}: { isUploaded: boolean, onClick?: (e) => void }) => {
    if (isUploaded) return <span className="text-sm text-red-500 text-bold flex items-center cursor-pointer"
                                 onClick={onClick}>
        <DownloadIcon/>
        <b className="ml-2">Descargar propuesta enviada</b>
    </span>
}
const ListaDeProyectos = () => {
    const [projects, setProjects] = useState<IProjectInvitation[]>([]);
    const [filterText, setFilterText] = useState('');

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleRedirect = (projectInvitation:IProjectInvitation) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.company?.type === CompanyType.ProductionStudio) {
            router.push(`/postulacion-proceso?projectInvitationId=${projectInvitation.id}`);
        } else {
            router.push(`/proyecto?id=${projectInvitation.project?.id   }`);
        }
    };

    const filteredProjects = projects?.filter((project) => project.project.name.toLowerCase().includes(filterText.toLowerCase())) || [];

    async function listarProyecto() {

        setLoading(true);
        try {
            const response = await getProductionHouseProjects();
            setProjects(response || []);
        } catch (error: any) {
            if (error.status === 400) error.response?.data?.message.forEach((value: any) => toast.error(value))
            if (error.status === 409) toast.error(error.response?.data?.clientMessage)
        }
        setLoading(false);
    }

    useEffect(() => {
        listarProyecto();
    }, []);

    return (
        <Layout>
            <Loader loading={loading}>
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
                        <div className="text-center text-gray-500">No hay proyectos disponibles.</div>)}

                    {filteredProjects.map((projectInvitation, index) => (<div
                        key={index}
                        className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg space-y-4 hover:bg-gray-100 transition duration-200 ease-in-out transform hover:scale-105
                    cursor-pointer"
                        onClick={() => handleRedirect(projectInvitation)}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-medium">{projectInvitation.project.name}</span>
                            <NewBadge createdAt={projectInvitation.createdAt}/>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ProposalUploaded
                                isUploaded={projectInvitation.proposalUploaded}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/otra-ruta?projectId=${projectInvitation.project?.id}`);
                                }}
                            />
                            <InvitationStatus status={projectInvitation.accepted}/>
                            <ProjectStatus status={projectInvitation.project.status}/>
                            <NextIcon/>
                        </div>
                    </div>))}
                </div>

            </Loader>
        </Layout>
    );
};

export default ListaDeProyectos;