import { IPostulationData } from '@/api/postulationApi';
import { IProjectInvitation } from '@/interfaces/project-director.interface';
import { ProjectMapper } from '@/mappers/project.mapper';
import React from 'react';
import UploaderComponent from './UploaderComponent';
interface BriefProps {
    project: {
        id:string;
        name: string;
        agencyName: string;
        status: string;
        brand: string;
        product: string;
        category: string;
        projectName: string;
        quantity: number;
        entregables: {
            duracion: string;
            aspecto: string;
            formato: string;
        };
        entregaBrief: string;
        visualizacion: string;
        entregaPresupuesto: string;
        entregaProyecto: string;
        link1?: string;
        link2?: string;
    };
    data: IPostulationData
    invitedDirectors: IProjectInvitation[];
}

export const Brief: React.FC<BriefProps> = ({ project, data, invitedDirectors }) => {
    const ProductionHouses = () => {
        if (invitedDirectors.length === 0) {
            return <p>Aún no hay casas productoras invitadas.</p>
        }
        return invitedDirectors?.map((director) => (
            <div key={director.id}>
                <p className="flex items-center"><span
                    className="text-green-500 mr-2">✔</span> {director.productionHouse.name}</p>
                <p>Director licitante: {director.director.name} {director.director.lastname}</p>
            </div>
        ))
    }
    return <>
        <div className="flex justify-between items-start border-b pb-4 mb-4">
            <div>
                <h1 className="text-2xl font-bold">{project?.name}</h1>
                <p>Creador: <strong>{data?.director?.name}</strong></p>
                <p>Agencia: {project?.agencyName}</p>
                <p>Estado: <strong>{ProjectMapper.mapProjectStatus(project?.status as string)}</strong></p>
            </div>
            <div className="text-right">
                <p>Creado: {new Date(data?.project?.createdAt as string).toLocaleDateString()}</p>
                <div className="flex items-center space-x-4 mt-2"></div>
            </div>
        </div>
        {/* Información de proyecto */}
        <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Información de proyecto</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p><strong>Marca:</strong> {project?.brand}</p>
                    <p><strong>Producto:</strong> {project?.product}</p>
                    <p><strong>Categoría:</strong> {project?.category}</p>
                    <p><strong>Campaña:</strong> {project?.projectName}</p>
                </div>
                <div>
                    <p><strong>Cantidad:</strong> {project?.quantity}</p>
                    <p><strong>Duración:</strong> {project?.entregables?.duracion}</p>
                    <p><strong>Aspecto:</strong> {project?.entregables?.aspecto}</p>
                    <p><strong>Formato:</strong> {project?.entregables?.formato}</p>
                </div>
                <div>
                    <p><strong>Brief:</strong> {new Date(project?.entregaBrief).toLocaleDateString()}</p>
                    <p><strong>Visualización:</strong> {project?.visualizacion}</p>
                </div>
                <div>
                    <p><strong>Entrega de presupuestos y TT:</strong> {new Date(project?.entregaPresupuesto).toLocaleDateString()}</p>
                    <p><strong>Entrega proyecto:</strong> {new Date(project?.entregaProyecto).toLocaleDateString()}</p>
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
                <a target="_blank" href={project?.link1} className="text-blue-500 underline">{project?.link1}</a>
                <a target="_blank" href={project?.link2} className="text-blue-500 underline">{project?.link2}</a>
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
