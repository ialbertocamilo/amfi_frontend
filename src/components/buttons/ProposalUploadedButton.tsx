import DownloadIcon from "@/components/icons/DownloadIcon";
import { useRouter } from "next/router";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { Tooltip } from "react-tooltip";

export const ProposalUploaded = ({
  isUploaded,
  className,
  invitation,
}: {
  isUploaded: boolean;
  className?: string;
  invitation: IProjectInvitation;
}) => {
  const router = useRouter();
  if (isUploaded)
    return (
      <>
        <span
          className={`proposal-uploaded text-sm text-red-500 text-bold flex items-center cursor-pointer ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              `/propuesta?postulationId=${invitation?.postulation?.id}`,
            );
          }}
        >
          <DownloadIcon />
          <b className="ml-2">Abrir propuesta </b>
        </span>
        <Tooltip anchorSelect=".proposal-uploaded" place={"bottom"}>
          Click aquí, para consultar la propuesta en caso este disponible
        </Tooltip>
      </>
    );
  return (
    <span className={`text-sm text-red-300 font-semibold ${className}`}>
      Esperando propuesta
    </span>
  );
};
