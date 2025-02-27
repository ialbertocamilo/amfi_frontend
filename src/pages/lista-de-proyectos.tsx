import { getProductionHouseProjects } from "@/api/projectApi";
import { ProposalUploaded } from "@/components/buttons/ProposalUploadedButton";
import NextIcon from "@/components/icons/NextIcon";
import ProjectStatusText from "@/components/inputs/ProjectStatusText";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { CompanyType } from "@/constants";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { ProjectInvitationMapper } from "@/mappers/project-invitation.mapper";
import {
  EstadoProyecto,
  ProjectMapper,
  ProjectStatus,
} from "@/mappers/project.mapper";
import { RefreshCw } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import "./globals.css";

const ProjectStatusComponent = ({ status }: { status: string }) => {
  if (!status) {
    return (
      <span className="project-status bg-blue-100 text-blue-500 text-sm px-4 py-2 rounded">
        No disponible
      </span>
    );
  }

  const mappedStatus = ProjectMapper.mapProjectStatus(status);
  let bgColor = "";
  let textColor = "";

  switch (mappedStatus) {
    case EstadoProyecto.EnProgreso:
      bgColor = "bg-green-50";
      textColor = "text-green-700";
      break;
    case EstadoProyecto.Terminado:
      bgColor = "bg-teal-100";
      textColor = "text-teal-700";
      break;
    case EstadoProyecto.Pausado:
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-500";
      break;
    case EstadoProyecto.Cerrado:
      bgColor = "bg-red-100";
      textColor = "text-red-500";
      break;
    case EstadoProyecto.Borrador:
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
      break;
    default: // Borrador
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-500";
      break;
  }

  return (
    <span
      className={`project-status ${bgColor} ${textColor} text-sm w-40 h-8 flex items-center justify-center rounded `}
    >
      <ProjectStatusText status={status as ProjectStatus} />
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
      <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
        Nuevo
      </span>
    )
  );
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
      project.project?.name?.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];

  async function getAllProjects() {
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
    getAllProjects();
  }, []);

  return (
    <Layout>
      <Loader loading={loading}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Lista de Proyectos

          </h1>

        </div>

        <div className="flex flex-col md:flex-row mb-4 justify-between">
          <input
            type="text"
            placeholder="Filtrar tabla..."
            className="p-2 border border-gray-300 rounded w-full mb-2 md:mb-0 md:mr-2"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={() => getAllProjects()}
            className="refresh-button p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transform transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
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
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md rounded-lg space-y-4 md:space-y-0 hover:bg-gray-100 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleRedirect(projectInvitation)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">
                  {projectInvitation.project.name}
                </span>
                <NewBadge createdAt={projectInvitation.createdAt} />
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-3">
                <ProposalUploaded
                  className={"proposal-uploaded"}
                  isUploaded={projectInvitation.proposalUploaded}
                  invitation={projectInvitation}
                  disabled={false}
                />
                <InvitationStatus status={projectInvitation.accepted} />
                <ProjectStatusComponent
                  status={projectInvitation.project.status}
                />
                <NextIcon />
              </div>
            </div>
          ))}
        </div>
      </Loader>

      <Tooltip anchorSelect=".invitation-status" place={"bottom"}>
        Estado de la invitación al proyecto.
      </Tooltip>
      <Tooltip anchorSelect=".project-status" place={"bottom"}>
        Estado del proyecto.
      </Tooltip>
      <Tooltip anchorSelect=".refresh-button" place={"bottom"}>
        Refrescar lista de proyectos
      </Tooltip>
    </Layout>
  );
};

export default ListaDeProyectos;
