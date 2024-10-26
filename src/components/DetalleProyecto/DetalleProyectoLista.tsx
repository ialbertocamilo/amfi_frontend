import { getProjectById } from '@/api/projectApi';
import { ProjectMapper } from '@/mappers/project.mapper';
import React, { useEffect, useState } from 'react';

import moment from 'moment';

interface CasaProductora {
  name: string;
  status: 'Completado' | 'Pendiente' | 'Rechazado' | 'Aceptado';
}

const casasProductoras: CasaProductora[] = [
  { name: 'Grupo Traziende', status: 'Completado' },
  { name: 'Ikarus', status: 'Pendiente' },
  { name: 'Grupo de León', status: 'Rechazado' },
  { name: 'Grupo de León', status: 'Aceptado' },
];

const getStatusColor = (status: CasaProductora['status']) => {
  switch (status) {
    case 'Completado':
      return 'bg-teal-200 text-teal-800';
    case 'Pendiente':
      return 'bg-yellow-200 text-yellow-800';
    case 'Rechazado':
      return 'bg-red-200 text-red-800';
    case 'Aceptado':
      return 'bg-purple-200 text-purple-800';
    default:
      return '';
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
    creado:'',
    estado:''
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
        directorCuentas: `${projectData?.creator?.name} ${projectData?.creator.lastname}` || "",
        productorAgencia: projectData?.creator?.name || "",
        numeroODT: projectData?.id || "",
        contactoCompras: projectData?.creator?.nationalIdentifierOrRFC || "",
        creado: moment(projectData?.createdAt).format('DD/MM/YYYY') || '',
        estado: ProjectMapper.mapProjectStatus(projectData?.status) || ''
      });
    }
  };

  useEffect(() => {
    if (id) fetchProject();
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
      {casasProductoras.map((casa, index) => (
        <li
          key={index}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow cursor-pointer mt-4"
          onClick={handleItemClick}
        >
          <span className="text-gray-700">{casa?.name}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(casa?.status)}`}>
            {casa?.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">&gt;</button>
        </li>
      ))}
    </ul>
      </div>

      {/* Notification Section */}
      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg flex justify-between items-center">
        <p className="text-sm">
          Se enviará un correo electrónico recordando a los participantes que no hayan aceptado aún su participación o
          los que no hayan completado la postulación.
        </p>
        <button className="text-red-500 hover:text-red-600 font-semibold">Enviar recordatorio</button>
      </div>
    </div>
  );
};

export default ProjectDetails;
