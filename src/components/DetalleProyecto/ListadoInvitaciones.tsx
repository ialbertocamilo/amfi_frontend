import { InvitedDirectorsResponse } from "@/api/interface/api.interface";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { ProjectInvitationMapper } from "@/mappers/project-invitation.mapper";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import DownloadIcon from "../icons/DownloadIcon";
import NextIcon from "../icons/NextIcon";

interface ListadoInvitacionesProps {
  invitationData: InvitedDirectorsResponse;
  setBidId: React.Dispatch<React.SetStateAction<string | null>>;
  formData: any;
  handleItemClick: (e) => void;
  sendReminder: () => void;
  closeProject: () => void;
}

const ListadoInvitaciones = ({
  invitationData: invitation,
  formData,
  sendReminder,
  closeProject,
}: ListadoInvitacionesProps) => {

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
      <span className={`invitation-status ${bgColor} ${textColor} text-sm px-4 py-2 rounded`}>
        {mappedStatus}
      </span>
    );
  }

  const ProposalUploaded = ({ isUploaded, onClick, className }: { isUploaded: boolean, onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void, className?: string }) => {
    if (isUploaded)
      return <span className={`proposal-uploaded text-sm text-red-500 text-bold flex items-center cursor-pointer ${className}`} onClick={onClick}>
        <DownloadIcon />
        <b className="ml-2">Abrir propuesta enviada</b>
      </span>
    return null;
  }

  const router=useRouter();
  const doClick = (e: React.MouseEvent<HTMLDivElement>, invitation: IProjectInvitation) => {

    if (invitation.proposalUploaded) {
      router.push(`/evaluacion?projectInvitationId=${invitation.id}`);
    } else {
      e.preventDefault();
      toast.error("La propuesta aún no ha sido subida");
    }
  }

  return (
    <>
      <div className="pb-4">
        <h2 className="text-lg font-medium mb-4">
          Casas Productoras invitadas
        </h2>
        <ul>
          {invitation.result?.map((invitation, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 bg-white shadow-md rounded-lg space-y-4 hover:bg-gray-100 ttransition-transform duration-300 ease-in-out transform hover:scale-105
                    cursor-pointer ${invitation.proposalUploaded ? "cursor-pointer" : ""
                }`}
              onClick={(e) => doClick(e, invitation)}
            >
              <span className="text-gray-800 font-medium">
                {invitation.productionHouse?.name}
              </span>
              <div className="flex items-center space-x-20">
                <ProposalUploaded
                  className="proposal-uploaded"
                  isUploaded={invitation.proposalUploaded}
                  onClick={(e) => {
                    e.stopPropagation();
                  }} />
                <InvitationStatus status={invitation?.accepted} />
                <NextIcon />
              </div>
            </div>
          ))}
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
          className="text-xs text-red-500 hover:text-red-600 font-semibold"
          onClick={() => sendReminder()}
        >
          Enviar recordatorio
        </button>
      </div>

      <Tooltip anchorSelect=".invitation-status" place={"bottom"}>Estado de la invitación al proyecto.</Tooltip>
      {/* Close Call Section */}
      <div className="flex justify-start pt-4">
        {formData?.estado !== "Cerrado" && (
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
            onClick={() => closeProject()}
          >
            Cerrar Convocatoria
          </button>
        )}
      </div>
    </>
  );
};

export default ListadoInvitaciones;
