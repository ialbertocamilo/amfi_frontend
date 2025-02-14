import { InvitedDirectorsResponse } from "@/api/interface/api.interface";
import { ProposalUploaded } from "@/components/buttons/ProposalUploadedButton";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { ProjectInvitationMapper } from "@/mappers/project-invitation.mapper";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import NextIcon from "../icons/NextIcon";

interface ListadoInvitacionesProps {
  invitationData: InvitedDirectorsResponse;
  formData: any;
  handleItemClick: (e) => void;
  sendReminder: () => void;
  closeProject: () => void;
  disabled: boolean;
  projectId: string;
}

const ListadoInvitaciones = ({
  invitationData: invitation,
  formData,
  sendReminder,
  closeProject,
  disabled, projectId
}: ListadoInvitacionesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  const handleSendReminderClick = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    sendReminder();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const InvitationStatus = ({ status }: { status: boolean }) => {
    const mappedStatus = ProjectInvitationMapper.mapStatus(status);
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case true:
        bgColor = "bg-green-100";
        textColor = "text-green-500";
        break;
      case false:
        bgColor = "bg-red-100";
        textColor = "text-red-500";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-500";
        break;
    }

    return (
      <span
        className={`invitation-status ${bgColor} ${textColor} text-sm px-4 py-2 rounded`}
      >
        {mappedStatus}
      </span>
    );
  };

  const doClick = (
    e: React.MouseEvent<HTMLDivElement>,
    invitation: IProjectInvitation,
  ) => {
    if (!disabled && invitation.proposalUploaded) {
      router.push(`/evaluacion?projectInvitationId=${invitation.id}&projectId=${projectId}`);
    } else {
      e.preventDefault();
      toast.error(
        "La propuesta aún no ha sido subida o la acción está deshabilitada",
      );
    }
  };
  const goToComparative = ()=>{
    router.push(`/comparativo?projectId=${projectId}`);
  }

  return (
    <>
      <div className="pb-4">
        <h2 className="text-lg font-medium mb-4">
          Casas productoras invitadas
        </h2>
        <ul>
          <div className="space-y-4">
            {invitation.result?.map((invitation, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 bg-white shadow-md rounded-lg space-y-4 hover:bg-gray-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1
                    ${!disabled && invitation.proposalUploaded ? "cursor-pointer" : "cursor-not-allowed"}`}
                onClick={(e) => doClick(e, invitation)}
              >
                <span className="text-gray-800 font-medium">
                  {invitation.productionHouse?.name}
                </span>
                <div className="flex items-center space-x-20">
                  <ProposalUploaded
                    className="proposal-uploaded"
                    isUploaded={invitation.proposalUploaded}
                    invitation={invitation}
                  />
                  <InvitationStatus status={invitation?.accepted} />
                  <NextIcon />
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>

      {/* Notification Section */}
      <div className="bg-blue-100 text-blue-600 p-4 rounded-lg flex justify-between items-center">
        <p className="text-xs">
          Se enviará un correo electrónico recordando a los participantes que no
          hayan aceptado aún su participación o los que no hayan completado la
          postulación.
        </p>
        <button
          className={`text-xs ${disabled ? "text-gray-400" : "text-red-500 hover:text-red-600"} font-semibold`}
          onClick={handleSendReminderClick}
          disabled={disabled}
        >
          Enviar recordatorio
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">Confirmar</h2>
            <p className="mb-4">
              ¿Estás seguro de que deseas enviar el recordatorio?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <Tooltip anchorSelect=".invitation-status" place={"bottom"}>
        Estado de la invitación al proyecto.
      </Tooltip>
      {/* Close Call Section */}
      <div className="flex justify-start pt-4">
        {formData?.estado !== "Cerrado" && (
          <button
            className={`border ${disabled ? "border-gray-400 text-gray-400" : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"} px-4 py-2 rounded-lg`}
            onClick={() => !disabled && closeProject()}
            disabled={disabled}
          >
            Cerrar Convocatoria
          </button>
        )}
        
        <button
            type="submit"
            className="w-1/4 bg-blue-500 mx-2 text-white py-2 rounded-lg"
            onClick={goToComparative}
          >
            Comparativo
          </button>
      </div>
    </>
  );
};

export default ListadoInvitaciones;