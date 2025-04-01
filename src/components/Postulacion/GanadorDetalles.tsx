import { IProjectInvitation } from '@/interfaces/project-director.interface';
import React from 'react';

interface GanadorDetallesProps {
  invitation?: IProjectInvitation;
}

const GanadorDetalles: React.FC<GanadorDetallesProps> = ({ invitation }) => {
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">¡Felicidades! Eres el ganador</h2>
      {invitation?.message && (
        <p className="mb-4">{invitation.message}</p>
      )}
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => window.open(`/consulta-brief?projectInvitationId=${invitation?.id}`, '_blank')}
        >
          Consultar Brief
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => window.open(`/propuesta/${invitation?.id}`, '_blank')}
        >
          Abrir Propuesta
        </button>
      </div>
    </div>
  );
};

export default GanadorDetalles;