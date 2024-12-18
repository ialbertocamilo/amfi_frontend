import { getInvitedDirectors } from '@/api/directorApi';
import { acceptDirectInvitation, acceptInvitation, declineInvitation, IPostulationData } from '@/api/postulationApi';
import { IProjectInvitation } from '@/interfaces/project-director.interface';
import { manageLogicError } from '@/lib/utils';
import { ProjectMapper, ProjectStatus } from '@/mappers/project.mapper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomModal from '../CustomModal';
import UploaderComponent from '../UploaderComponent';
import ConfirmacionParticipacionModal from './ConfirmacionParticipacionModal';
import ResumenProyecto from './ResumenProyecto';

interface ProjectDetailsProps {
  token?: string,
  projectInvitationId?: string,
  data: IPostulationData;
}

const ProjectPostulationInvitationDetails: React.FC<ProjectDetailsProps> = ({
  token,
  projectInvitationId,
  data
}) => {

  const router = useRouter();
  const startPostulation = () => {
    router.push(`/postulacion-proceso?projectInvitationId=${invitationId}`);
  };

  const [invitedDirectors, setInvitedDirectors] = useState<IProjectInvitation[]>([]);
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

  const [postulacion, setPostulacion] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState<any>()


  const [invitationId, setInvitationId] = useState('');
  const handleConfirm = async () => {
    // Lógica para confirmar la acción
    try {
      if (token) { // si hay token
        const invitation = await acceptInvitation(token as string)
        if (!invitation) toast.error('Error al confirmar la invitación')
        setInvitationId(invitation?.result?.invitationId as string)
      } else { // si hay projectInvitationId
        const invitation = await acceptDirectInvitation(projectInvitationId as string)
        if (!invitation) toast.error('Error al confirmar la invitación')
        setInvitationId(invitation?.result?.invitationId as string)

      }
    } catch (e) {
      manageLogicError(e)
      return;
    }

    toast.success('Invitación confirmada correctamente')
    setIsModalOpen(false);
    setPostulacion(true);
  };


  const [modalDecline, setModalDecline] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalDecline(false)
  };

  useEffect(() => {
    if (data.project.status === ProjectStatus.Closed) {
      toast.error('El proyecto se encuentra cerrado')
      return;
    }
    setProject(data.project.extra)
    getInvitedDirectors(data.project.id).then((res) => {
      const result = res.filter(value => value.accepted)
      setInvitedDirectors(result)
    })
  }, [data])

  const decline = () => {
    setModalDecline(true)
  }

  const handleDecline = () => {

    declineInvitation(token as string || projectInvitationId as string).then((data) => {
      toast.success('Invitación rechazada')
      router.push('/lista-de-proyectos')
    })
  }
  return (

    <div className="container mt-4 mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{data?.project?.name}</h1>
          <p>Creador: <strong>{data?.director?.name}</strong></p>
          <p>Agencia: {project?.agencyName}</p>
          <p>Estado: <strong>{ProjectMapper.mapProjectStatus(data?.project?.status as string)}</strong></p>
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
          <UploaderComponent projectId={data?.project?.id as string} identifier={'first_file'} blockUpload />
          <UploaderComponent projectId={data?.project?.id as string} identifier={'second_file'} blockUpload />
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
      <br />
      {postulacion && (
        <>
          <ResumenProyecto data={project} />
          <div className="flex justify-center pt-8">
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={startPostulation}>
              Iniciar postulación
            </button>
          </div>
        </>
      )}
      {/* Botones de acción */}
      {!postulacion && (
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <button className="bg-white text-red-500 border border-red-500 py-2 px-4 rounded" onClick={decline}>No participar</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
              Participar
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ConfirmacionParticipacionModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      <CustomModal
        title="Rechazar invitación"
        message="¿Estás seguro que rechazar la invitación a postular?"
        confirmText="Sí, rechazar"
        cancelText="No, volver"
        onConfirm={handleDecline}
        onCancel={handleCancel} isOpen={modalDecline}/>
    </div>
  );
};

export default ProjectPostulationInvitationDetails;