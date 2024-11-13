import { getProjectById, updateProjectStatus } from '@/api/projectApi';
import { ProjectMapper, ProjectStatus } from '@/mappers/project.mapper';
import React, { useEffect, useState } from 'react';

import { getInvitedDirectors } from '@/api/directorApi';
import { sendReminderToProductionHouses } from '@/api/productoraApi';
import { ProjectDirectorInvited } from '@/interfaces/project-director.interface';
import moment from 'moment';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';



const getStatusColor = (status: boolean) => {
  switch (status) {
    case false:
      return 'bg-red-200 text-red-800';
    case true:
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-teal-200 text-teal-800';
  }
};

const getStatusProposalColor = (statusProposal:boolean)=>{

  switch (statusProposal) {
    case true:
      return 'bg-green-200 text-green-800';
    case false:
      return 'bg-teal-200 text-teal-800';
  }
}

const getStatusProposal = (statusProposal:boolean)=>{

  switch (statusProposal) {
    case true:
      return 'Documento subido';
    case false:
      return 'Documento por subir';
  }
}

const getStatusName = (status: boolean) => {
  switch (status) {
    case false:
      return 'Rechazado'
    case true:
      return 'Aceptado'
    default:
      return 'Pendiente';
  }
};

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    anunciante: "",
    marca: "",
    producto: "",
    categoria: "",
    nombreProyecto: "",
    versiones: "",
    cantidad: 1,
    cantidadSeleccionar: "",
    agencia: "",
    correoResponsable: "",
    directorCreativo: "",
    contactoFinanzas: "",
    directorCuentas: "",
    productorAgencia: "",
    numeroODT: "",
    contactoCompras: "",
    creado: '',
    estado: ''
  });
  const fetchProject = async () => {
    const projectData = await getProjectById(id as string);
    if (projectData) {

      setFormData({
        anunciante: projectData?.brand || "",
        marca: projectData?.brand || "",
        producto: projectData?.product || "",
        categoria: projectData?.category || "",
        nombreProyecto: projectData?.name || "",
        versiones: projectData?.versions?.name || "",
        cantidad: projectData?.budget || 1,
        cantidadSeleccionar: projectData?.maxProducers || "",
        agencia: projectData?.agencyName || "-",
        correoResponsable: projectData?.creator?.email || "",
        directorCreativo: projectData?.creator?.jobPosition || "",
        contactoFinanzas: projectData?.isFinancialInfoUnlocked ? "Sí" : "No",
        directorCuentas: `${projectData?.creator?.name} ${projectData?.creator?.lastname}` || "",
        productorAgencia: projectData?.creator?.name || "",
        numeroODT: projectData?.id || "",
        contactoCompras: projectData?.creator?.nationalIdentifierOrRFC || "",
        creado: moment(projectData?.createdAt).format('DD/MM/YYYY') || '',
        estado: ProjectMapper.mapProjectStatus(projectData?.status) || ''
      });
    }
  };


  const sendReminder = ()=>{
    console.log('sending reminder')
    sendReminderToProductionHouses(id as string).then((data)=>{
        toast.success('Recordatorio enviado')
    }).catch((error)=>{

      toast.error('Error al enviar recordatorio')
    })
  }

  const router=useRouter()
  const closeProject=()=>{
    console.log('closing project')

    updateProjectStatus(id as string,ProjectStatus.Closed).then((data)=>{
      toast.success('Convocatoria cerrada')
      router.push('/lista-de-proyectos-admin')
    })
  }

  const [projectDirectorInvited, setProjectDirectorInvited] = useState<ProjectDirectorInvited[]>()
  useEffect(() => {
    if (id) {
      fetchProject();

      getInvitedDirectors(id as string).then((data) => {
        setProjectDirectorInvited(data)
      })
    }
  }, [id]);

  const handleItemClick = () => {
    window.location.href = '/evaluacion-casa-productora';
  };
  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold">{formData?.nombreProyecto}</h1>
          <p className="text-sm text-gray-500">Anunciante:  {formData?.anunciante}</p>
          <p className="text-sm text-gray-500">Agencia: {formData?.agencia}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Creado: {formData?.creado}</p>
          <p className="text-sm text-gray-500">Estado: {formData?.estado}</p>
        </div>
      </div>

      {/* Casas Productoras Invitadas */}
      <div>
        <h2 className="text-lg font-medium mb-4">Casas Productoras invitadas</h2>
        <ul>
          {projectDirectorInvited?.map((casa, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow mt-4 ${casa.proposalUploaded ? 'cursor-pointer' : ''}`}
          onClick={casa.proposalUploaded ? handleItemClick : undefined}
        >
          <span className="text-gray-700"> {casa.productionHouse?.name}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(casa?.accepted)}`}>
            {getStatusName(casa?.accepted)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusProposalColor(casa?.proposalUploaded)}`}>
            {getStatusProposal(casa?.proposalUploaded)}
          </span>
          <button className="text-gray-400 hover:text-gray-600">&gt;</button>
        </div>
          ))}
        </ul>
      </div>

      {/* Notification Section */}
      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg flex justify-between items-center">
        <p className="text-sm">
          Se enviará un correo electrónico recordando a los participantes que no hayan aceptado aún su participación o
          los que no hayan completado la postulación.
        </p>
        <button className="text-red-500 hover:text-red-600 font-semibold" onClick={()=>sendReminder()}>Enviar recordatorio</button>
      </div>

      {/* Close Call Section */}
      <div className="flex justify-start">
        {formData?.estado!=='Cerrado' && <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white" onClick={()=>closeProject()}>
          Cerrar Convocatoria
        </button>}
      </div>
    </div>
  );
};

export default ProjectDetails;
