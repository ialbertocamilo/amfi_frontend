import { IProjectInvitation } from '@/interfaces/project-director.interface';
import React from 'react';
import { ProposalUploaded } from "@/components/buttons/ProposalUploadedButton";
import { FileText } from 'lucide-react';

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
          className={`proposal-uploaded flex justify-between items-center p-4 shadow-md rounded-lg w-48 h-14 hover:bg-green-600 text-white transition-transform duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer bg-green-500 font-medium`}
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/consulta-brief?projectInvitationId=${invitation?.id}`, '_blank');
          }}>
          <FileText className="w-5 h-5 text-white" />
          <span>Consultar Brief</span>
        </button>
        {invitation && (
          <ProposalUploaded
            className={"proposal-uploaded"}
            isUploaded={invitation?.proposalUploaded}
            invitation={invitation}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
};

export default GanadorDetalles;