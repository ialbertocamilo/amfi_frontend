import { IPostulationData } from '@/api/postulationApi';
import { IProjectInvitation } from '@/interfaces/project-director.interface';
import { IProject } from '@/interfaces/project.interface';
import { ProjectMapper, ProjectStatus } from '@/mappers/project.mapper';
import moment from 'moment';
import React from 'react';
import UploaderComponent from './UploaderComponent';
import ProjectStatusText from './inputs/ProjectStatusText';
interface BriefProps {
    projectJson: {
        id: string;
        name: string;
        agencyName: string;
        status: string;
        brand: string;
        product: string;
        versionName: string;
        category: string;
        projectName: string;
        entregables: [{
            duracion: string;
            aspectRatio: string;
            formatoMedidas: string;
            cantidad: number;
        }];
        entregaBrief: string;
        visualizacion: string;
        entregaPresupuesto: string;
        entregaProyecto: string;
        link1?: string;
        link2?: string;
    };
    project?: IProject;
    data: IPostulationData
    invitedDirectors: IProjectInvitation[];
}

export const Brief: React.FC<BriefProps> = ({ projectJson, project, data, invitedDirectors }) => {
    const ProductionHouses = () => {
        if (invitedDirectors.length === 0) {
            return <p>Aún no hay casas productoras invitadas.</p>
        }
        return invitedDirectors?.map((director) => (
            <div key={director.id}>
                <p className="flex items-center"><span
                    className="text-green-500 mr-2">✔</span> {director.productionHouse.name}</p>
                <p>Director licitante: {director.director?.name} {director.director?.lastname}</p>
            </div>
        ))
    }
    return <>
        <div className="flex justify-between items-start border-b pb-4 mb-4">
            <div>
                <h1 className="text-2xl font-bold">{projectJson?.name}</h1>
                <p>Creador: <strong>{data?.director?.name}</strong></p>
                <p>Agencia: <strong>{data.project?.agency?.name}</strong></p>
            </div>
            <div className="text-right">
                <div className="flex justify-start items-center mt-1">
                    <p className="mr-2">Estado: </p> <ProjectStatusText status={project?.status as ProjectStatus} />
                </div>
                <p>Creado: {new Date(data?.project?.createdAt as string).toLocaleDateString()}</p>
            </div>
        </div>
        {/* Información de proyecto */}
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Información de proyecto {projectJson?.projectName}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p><strong>Marca:</strong> {projectJson?.brand}</p>
                    <p><strong>Producto:</strong> {projectJson?.product}</p>
                </div>
                <div>
                    <p><strong>Versiones:</strong> {projectJson?.versionName}</p>
                    <p><strong>Campaña/Nombre del proyecto:</strong> {projectJson?.projectName}</p>
                </div>
                <div>
                    <p><strong>Entrega Brief:</strong> {moment(projectJson?.entregaBrief as string).format('DD/MM/YYYY')}</p>
                    <p><strong>Visualización:</strong> {projectJson?.visualizacion}</p>
                </div>
                <div>
                    <p><strong>Entrega de presupuestos y TT:</strong> {moment(projectJson?.entregaPresupuesto as string).format('DD/MM/YYYY')}</p>
                    <p><strong>Entrega proyecto:</strong> {moment(projectJson?.entregaProyecto as string).format('DD/MM/YYYY')}</p>
                </div>

            </div>
        </div>
        {/* Documentos de proyecto */}
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Documentos de proyecto</h2>
            <div className="grid grid-cols-2 gap-4">
                <UploaderComponent projectId={data?.project?.id} identifier={'first_file'} blockUpload />
                <UploaderComponent projectId={data?.project?.id} identifier={'second_file'} blockUpload />
            </div>
        </div>
        {/* Links */}
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Links</h2>
            <div className="grid grid-cols-2 gap-4">
                <a target="_blank" href={projectJson?.link1} className="text-blue-500 underline">{projectJson?.link1}</a>
                <a target="_blank" href={projectJson?.link2} className="text-blue-500 underline">{projectJson?.link2}</a>
            </div>
        </div>
        {/* Casas productoras Licitantes */}
        <div>
            <h2 className="text-lg font-semibold mb-4">Casas productoras Licitantes</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <ProductionHouses />
            </div>
        </div>
    </>

}
