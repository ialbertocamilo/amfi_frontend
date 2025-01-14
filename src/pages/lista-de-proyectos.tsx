import { getProductionHouseProjects } from "@/api/projectApi";
import DownloadIcon from "@/components/icons/DownloadIcon";
import NextIcon from "@/components/icons/NextIcon";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { CompanyType } from "@/constants";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { ProjectInvitationMapper } from "@/mappers/project-invitation.mapper";
import { EstadoProyecto, ProjectMapper } from "@/mappers/project.mapper";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import "./globals.css";

const ProjectStatus = ({ status }: { status: string }) => {
  if (!status) {
    return (
      <span className="project-status bg-red-100 text-red-500 text-sm px-4 py-2 rounded">
        No disponible
      </span>
    );
  }

  const mappedStatus = ProjectMapper.mapProjectStatus(status);
  let bgColor = "";
  let textColor = "";

  switch (mappedStatus) {
    case EstadoProyecto.EnProgreso:
      bgColor = "bg-blue-100";
      textColor = "text-blue-500";
      break;
    case EstadoProyecto.Terminado:
      bgColor = "bg-green-100";
      textColor = "text-green-500";
      break;
    case EstadoProyecto.Pausado:
      bgColor = "bg-red-100";
      textColor = "text-red-500";
      break;
    case EstadoProyecto.Cerrado:
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
      break;
    default:
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-500";
      break;
  }

  return (
    <span
      className={`project-status ${bgColor} ${textColor} text-sm px-4 py-2 rounded `}
    >
      {mappedStatus}
    </span>
  );
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
const NewBadge = ({ createdAt }: { createdAt: Date }) => {
  return (
    moment().isSame(createdAt, "day") && (
      <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">
        Nuevo
      </span>
    )
  );
};
const ProposalUploaded = ({
  isUploaded,
  onClick,
  className,
}: {
  isUploaded: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  className?: string;
}) => {
  if (isUploaded)
    return (
      <span
        className={`proposal-uploaded text-sm text-red-500 text-bold flex items-center cursor-pointer ${className}`}
        onClick={onClick}
      >
        <DownloadIcon />
        <b className="ml-2">Abrir propuesta enviada</b>
      </span>
    );
  return null;
};
const ListaDeProyectos = () => {
  const [projects, setProjects] = useState<IProjectInvitation[]>([]);
  const [filterText, setFilterText] = useState("");

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRedirect = (projectInvitation: IProjectInvitation) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.company?.type === CompanyType.ProductionStudio) {
      router.push(
        `/postulacion-proceso?projectInvitationId=${projectInvitation.id}`,
      );
    } else {
      router.push(`/proyecto?id=${projectInvitation.project?.id}`);
    }
  };

  const filteredProjects =
    projects?.filter((project) =>
      project.project.name.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];

  async function listarProyecto() {
    setLoading(true);
    try {
      const response = await getProductionHouseProjects();
      setProjects(response || []);
    } catch (error: any) {
      if (error.status === 400)
        error.response?.data?.message.forEach((value: any) =>
          toast.error(value),
        );
      if (error.status === 409)
        toast.error(error.response?.data?.clientMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    listarProyecto();
  }, []);

  return (
    <Layout>
      <Loader loading={loading}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Lista de Proyectos</h1>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Filtrar tabla..."
            className="p-2 border border-gray-300 rounded w-full"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredProjects.length === 0 && (
            <div className="text-center text-gray-500">
              No hay proyectos disponibles.
            </div>
          )}

          {filteredProjects.map((projectInvitation, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg space-y-4 hover:bg-gray-100 ttransition-transform duration-300 ease-in-out transform hover:scale-105
                    cursor-pointer"
              onClick={() => handleRedirect(projectInvitation)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">
                  {projectInvitation.project.name}
                </span>
                <NewBadge createdAt={projectInvitation.createdAt} />
              </div>
              <div className="flex items-center space-x-4">
                <ProposalUploaded
                  className="proposal-uploaded"
                  isUploaded={projectInvitation.proposalUploaded}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/propuesta?postulationId=${projectInvitation?.postulation?.id}`,
                    );
                  }}
                />
                <InvitationStatus status={projectInvitation.accepted} />
                <ProjectStatus status={projectInvitation.project.status} />
                <NextIcon />
              </div>
            </div>
          ))}
        </div>
      </Loader>
      <Tooltip anchorSelect=".proposal-uploaded" place={"bottom"}>
        Propuesta técnica está disponible.
      </Tooltip>
      <Tooltip anchorSelect=".invitation-status" place={"bottom"}>
        Estado de la invitación al proyecto.
      </Tooltip>
      <Tooltip anchorSelect=".project-status" place={"bottom"}>
        Estado del proyecto.
      </Tooltip>
    </Layout>
  );
};

export default ListaDeProyectos;