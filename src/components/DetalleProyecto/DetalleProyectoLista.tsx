import React from 'react';

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

const ProjectDetails: React.FC = () => {
  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">   
     <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold">Proyecto León</h1>
          <p className="text-sm text-gray-500">Creador: Luna Rangiflo</p>
          <p className="text-sm text-gray-500">Agencia: New Scottishborg</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Creado: 08 de junio 2026</p>
          <p className="text-sm text-gray-500">Estado: En Proceso</p>
        </div>
      </div>

      {/* Casas Productoras Invitadas */}
      <div>
        <h2 className="text-lg font-medium mb-4">Casas Productoras invitadas</h2>
        <ul className="space-y-4">
          {casasProductoras.map((casa, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
              <span className="text-gray-700">{casa.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(casa.status)}`}>
                {casa.status}
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
