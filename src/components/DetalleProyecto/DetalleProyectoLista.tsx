import { InvitedDirectorsResponse } from "@/api/interface/api.interface";
import { sendReminderToProductionHouses } from "@/api/productoraApi";
import {
  getInvitationsByProjectId,
  getProjectById,
  updateProjectStatus,
} from "@/api/projectApi";
import Loader from "@/components/Loader";
import useLoader from "@/hooks/loader.hook";
import { formatUtcToLocalDate } from "@/lib/utils";
import { ProjectMapper, ProjectStatus } from "@/mappers/project.mapper";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import ProjectStatusText from "../inputs/ProjectStatusText";
import { EvaluationScore } from "./Comparacion";
import ListadoInvitaciones from "./ListadoInvitaciones";
import { useUserContext } from "@/providers/user.context";
import { CompanyType } from "@/constants";

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
  const [evaluationScore, setEvaluationScore] = useState<EvaluationScore[]>([]);

  const userContext = useUserContext();
  const user = userContext?.user;
  const [invitationData, setInvitationData] =
    useState<InvitedDirectorsResponse>({
      result: [],
      message: "",
    });
  const [bidId, setBidId] = useState<string>("");

  const [unlocked, setUnlocked] = useState(false);
  const [formData, setFormData] = useState({
    anunciante: "",
    marca: "",
    producto: "",
    nombreProyecto: "",
    versiones: "",
    agencia: "",
    correoResponsable: "",
    directorCreativo: "",
    contactoFinanzas: "",
    directorCuentas: "",
    productorAgencia: "",
    numeroODT: "",
    contactoCompras: "",
    creado: "",
    estado: "",
    entregaBidLetter: "",
    status: "",
    unlockedForAgency: false,
    creador: "",
  });
  const calculateRemainingDays = (deadline: string) => {
    const now = moment();
    const end = moment(deadline);
    return end.diff(now, "days");
  };

  const [remainingDays, setRemainingDays] = useState(0);
  const onInit = async () => {
    setLoading(true);
    const projectData = await getProjectById(id);
    const invitationData = await getInvitationsByProjectId(id);

    if (projectData) {
      console.log(projectData);
      setFormData({
        anunciante: projectData?.advertiser?.name || "",
        marca: projectData?.brand || "",
        producto: projectData?.product || "",
        nombreProyecto: projectData?.name || "",
        versiones: projectData?.versions?.name || "",
        agencia: projectData?.agency?.name || "-",
        correoResponsable: projectData?.creator?.email || "",
        directorCreativo: projectData?.creator?.jobPosition || "",
        contactoFinanzas: projectData?.isFinancialInfoUnlocked ? "Sí" : "No",
        directorCuentas:
          projectData?.creator?.name && projectData?.creator?.lastname
            ? `${projectData.creator.name} ${projectData.creator.lastname}`
            : "",
        productorAgencia: projectData?.creator?.name || "",
        numeroODT: projectData?.id || "",
        contactoCompras: projectData?.creator?.nationalIdentifierOrRFC || "",
        creado: formatUtcToLocalDate(projectData?.createdAt) || "",
        estado: ProjectMapper.mapProjectStatus(projectData?.status) || "",
        status: projectData?.status,
        entregaBidLetter: formatUtcToLocalDate(projectData?.bidDeadline) || "",
        unlockedForAgency: projectData?.unlockedForAgency || false,
        creador:
          projectData?.creator?.name + " " + projectData?.creator?.lastname ||
          "",
      });
    }
    console.log(!!projectData?.unlockedForAgency ||
      (CompanyType.Agency === user?.company?.type && !!projectData?.unlockedForAgency));
    setUnlocked(
      !!projectData?.unlockedForAgency ||
      (CompanyType.Agency === user?.company?.type && !!projectData?.unlockedForAgency)
    );
    setRemainingDays(
      calculateRemainingDays(projectData?.bidDeadline as string),
    );
    if (invitationData) {
      setInvitationData(invitationData);
      updateScoreEvaluation(invitationData);
    }
    setLoading(false);
  };

  const updateScoreEvaluation = (invitationData: InvitedDirectorsResponse) => {
    const evaluationScoreList: EvaluationScore[] = [];
    console.log("evaluationScoreList", evaluationScoreList);
    setEvaluationScore(evaluationScoreList);
  };

  const sendReminder = () => {
    sendReminderToProductionHouses(id as string)
      .then(() => {
        toast.success("Recordatorio enviado");
      })
      .catch(() => {
        toast.error("Error al enviar recordatorio");
      });
  };

  const router = useRouter();
  const closeProject = () => {
    updateProjectStatus(id as string, ProjectStatus.Closed).then(() => {
      toast.success("Convocatoria cerrada");
      router.push("/lista-de-proyectos-admin");
    });
  };

  useEffect(() => {
    if (id) {
      onInit();
    }
  }, [id]);

  const handleItemClick = () => {
    router.push(`/evaluacion?projectInvitationId=${bidId}`);
  };

  const { loading, setLoading } = useLoader(false);

  return (
    <Loader loading={loading}>
      <div className="mt-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl space-y-6 ">
        {user?.company?.type === CompanyType.Agency && !unlocked && (
          <span className="badge badge-warning text-white bg-red-500 px-2 py-1 rounded">
            Esperando desbloqueo por parte del anunciante
          </span>
        )}
        <div className="flex flex-col border-b">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-xl font-semibold">
              {formData?.nombreProyecto}
            </h1>
            <div className={"flex flex-col"}>
              <ProjectStatusText status={formData?.status as ProjectStatus} />
            </div>
          </div>
          <hr />
          <br />
          <div className="flex justify-between pb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Creador: {formData?.creador}
              </p>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Agencia: {formData?.agencia}
              </p>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Anunciante: {formData?.anunciante}
              </p>
            </div>
            <div>
              <p className=" text-sm font-medium text-gray-600 pb-2">
                Fecha limite de entrega de ofertas: {formData?.entregaBidLetter}
                <span className="invitation-bid-deadline text-sm font-medium text-red-600 pb-2 cursor-pointer">
                  ℹ️
                </span>
              </p>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Creado: {formData?.creado}
              </p>
            </div>
          </div>
        </div>
        <Tooltip anchorSelect=".invitation-bid-deadline" place={"bottom"}>
          Restan {remainingDays} días para finalizar con la entrega.
        </Tooltip>
        {'Is unlocked'+JSON.stringify(unlocked)}
        <ListadoInvitaciones
          invitationData={invitationData}
          setBidId={setBidId}
          formData={formData}
          handleItemClick={handleItemClick}
          closeProject={closeProject}
          sendReminder={sendReminder}
          disabled={!unlocked}
        ></ListadoInvitaciones>
      </div>
    </Loader>
  );
};

export default ProjectDetails;
