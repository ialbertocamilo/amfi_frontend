import DownloadIcon from "@/components/icons/DownloadIcon";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { Tooltip } from "react-tooltip";

export const ProposalUploaded = ({
  isUploaded,
  className,
  invitation,
  disabled = false
}: {
  isUploaded: boolean;
  className?: string;
  invitation: IProjectInvitation;
  disabled:boolean
}) => {
  if (isUploaded)
    return (
      <>
      <span
        className={`proposal-uploaded flex justify-between items-center p-4 shadow-md rounded-lg w-48 h-14 ${!disabled && 'hover:bg-gray-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1'} ${
        !disabled ? "cursor-pointer bg-white " : "cursor-not-allowed bg-gray-100"
        } ${className}`}
        onClick={(e) => {
        if (!disabled) {
          e.stopPropagation();
          window.open(
          `/propuesta?postulationId=${invitation?.postulation?.id}`,
          '_blank'
          );
        }
        }}
      >
        <div className="flex items-center">
        <DownloadIcon />
        <b className="ml-2">Abrir propuesta</b>
        </div>
      </span>
      <Tooltip anchorSelect=".proposal-uploaded" place={"bottom"}>
        Click aquí, para consultar la propuesta en caso este disponible
      </Tooltip>
      </>
    );
    return (
    <span className={`text-sm text-red-300 font-semibold w-48 h-14 flex items-center justify-center ${className}`}>
      Esperando propuesta
    </span>
    );
};
