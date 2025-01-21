import { getInvitedDirectors } from '@/api/directorApi';
import { acceptDirectInvitation, acceptInvitation, declineInvitation, IPostulationData } from '@/api/postulationApi';
import { IProjectInvitation } from '@/interfaces/project-director.interface';
import { IProject } from '@/interfaces/project.interface';
import { manageLogicError } from '@/lib/utils';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Brief } from '../Brief';
import CustomModal from '../CustomModal';
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


  const [postulacion, setPostulacion] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectJSON, setProjectJSON] = useState<any>()
  const [project, setProject] = useState<IProject>()


  const [invitationId, setInvitationId] = useState('');
  const handleConfirm = async () => {
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
    if (data.project?.status === ProjectStatus.Closed) {
      toast.error('El proyecto se encuentra cerrado')
      router.push('/lista-de-proyectos')
      return;
    }
    setProjectJSON(data.project.extra)
    setProject(data.project)
    getInvitedDirectors(data.project.id).then((res) => {
      const result = res.filter(value => value.accepted)
      setInvitedDirectors(result)
    })
  }, [data])

  const decline = () => {
    setModalDecline(true)
  }

  const handleDecline = () => {

    declineInvitation(token as string || projectInvitationId as string).then(() => {
      toast.success('Invitación rechazada')
      router.push('/lista-de-proyectos')
    })
  }
  return (

    <div className="container mt-4 mx-auto p-6 bg-white shadow-lg rounded-md">
    
      <>
      <Brief projectJson={projectJSON} data={data} project={project} invitedDirectors={invitedDirectors} />
      <br />
      {postulacion && (
        <>
          <ResumenProyecto data={projectJSON} />
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
        onCancel={handleCancel} isOpen={modalDecline} />
        </>
    </div>
  );
};

export default ProjectPostulationInvitationDetails;