import {
  InvitedDirectorsResponse
} from "@/api/interface/api.interface";
import { sendReminderToProductionHouses } from "@/api/productoraApi";
import {
  getInvitationsByProjectId,
  getProjectById,
  updateProjectStatus,
} from "@/api/projectApi";
import Loader from "@/components/Loader";
import useLoader from "@/hooks/loader.hook";
import { calculateBudgetScore, calculateEvaluationScore, formatToLocalTime, formatUtcToLocalDate } from '@/lib/utils';
import { ProjectMapper, ProjectStatus } from "@/mappers/project.mapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EvaluationScore } from "./Comparacion";
import ListadoInvitaciones from "./ListadoInvitaciones";
import { Tooltip } from "react-tooltip";
import moment from "moment";

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [creativeProposalPercentage, setCreativeProposalPercentage] =useState(40);
  const [evaluationScore, setEvaluationScore] = useState<EvaluationScore[]>([]);

  const [invitationData, setInvitationData] =
    useState<InvitedDirectorsResponse>({
      result: [],
      message: "",
    });
  const [bidId, setBidId] = useState<string>("");

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
    entregaBidLetter:""
  });
  const calculateRemainingDays = (deadline: string) => {
    const now = moment();
    const end = moment(deadline);
    return end.diff(now, 'days');
  };

  const [remainingDays,setRemainingDays]=useState(0)
  const onInit = async () => {
    setLoading(true);
    const projectData = await getProjectById(id);
    const invitationData = await getInvitationsByProjectId(id);

    if (projectData) {
      setFormData({
        anunciante: projectData?.brand || "",
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
        creado: formatUtcToLocalDate(projectData?.createdAt)  || "",
        estado: ProjectMapper.mapProjectStatus(projectData?.status) || "",
        entregaBidLetter: formatUtcToLocalDate(projectData?.bidDeadline) || "",
      });
    }
    setRemainingDays(calculateRemainingDays(projectData?.bidDeadline as string)); 
    if (invitationData) {
      setInvitationData(invitationData);
      updateScoreEvaluation(invitationData);
    }
    setLoading(false);
  };

  const updateScoreEvaluation = (invitationData: InvitedDirectorsResponse) => {
    const evaluationScoreList: EvaluationScore[] = [];

    invitationData.result.map((invitedDirector) => {
      const evaluation: EvaluationScore = {
        name: invitedDirector.productionHouse.name,
        evaluationScore: {
          creativeProposal: 0,
          experience: 0,
          budget: 0,
        },
        status: "Completado",
      };

      if (invitedDirector.evaluation) {
        evaluation.evaluationScore = {
          ...evaluation.evaluationScore,
          ...calculateEvaluationScore(
            invitedDirector.evaluation,
            creativeProposalPercentage / 100
          ),
        };
      }
      if (invitedDirector.budget) {
        const totalBudget = Object.values(invitedDirector.budget).reduce(
          (acc, value) => acc + value,
          0
        );
        console.log("totalBudget", totalBudget);
        evaluation.evaluationScore = {
          ...evaluation.evaluationScore,
          budget: calculateBudgetScore(
            totalBudget,
            120000,
            creativeProposalPercentage / 100
          ).budget,
        };
      }
      evaluationScoreList.push(evaluation);
      console.log("evaluation", evaluation);
    });
    console.log("evaluationScoreList", evaluationScoreList);
    setEvaluationScore(evaluationScoreList);
  };

  const sendReminder = () => {
    sendReminderToProductionHouses(id as string)
      .then((data) => {
        toast.success("Recordatorio enviado");
      })
      .catch((error) => {
        toast.error("Error al enviar recordatorio");
      });
  };

  const router = useRouter();
  const closeProject = () => {
    console.log("closing project");
    updateProjectStatus(id as string, ProjectStatus.Closed).then((data) => {
      toast.success("Convocatoria cerrada");
      router.push("/lista-de-proyectos-admin");
    });
  };

  useEffect(() => {
    if (id) {
      onInit();
    }
  }, [id]);

  useEffect(() => {
    updateScoreEvaluation(invitationData);
  }, [creativeProposalPercentage]);

  const handleItemClick = () => {
    router.push(`/evaluacion?projectInvitationId=${bidId}`);
  };


  const { loading, setLoading } = useLoader(false);
  return <Loader loading={loading}>
      <div className="mt-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl space-y-6 ">
        <div className="flex flex-col border-b">
          <h1 className="text-xl font-semibold pb-4">
            {formData?.nombreProyecto}
          </h1>
          <div className="flex justify-between pb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Creador: {formData?.anunciante}
              </p>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Agencia: {formData?.agencia}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Creado: {formData?.creado}
              </p>
              <p className="text-sm font-medium text-gray-600 pb-2">
                Estado: {formData?.estado}
              </p>
            </div>
            <div>
              <p className=" text-sm font-medium text-gray-600 pb-2">
                Fecha limite de entrega de ofertas: {formData?.entregaBidLetter}
                
              <span className="invitation-bid-deadline text-sm font-medium text-red-600 pb-2 cursor-pointer">
                ℹ️
              </span>
              </p>
            </div>
            <div className="flex items-end min-w-[10%]">
              <p
                onClick={() => setIsVisible(!isVisible)}
                className="text-sm text-orange-500 font-medium hover:underline"
              >
                {isVisible ? "Ocultar detalle" : "Ver detalle"}
              </p>
            </div>
          </div>
        </div>
        <Tooltip anchorSelect=".invitation-bid-deadline" place={"bottom"}>Restan {remainingDays} dias para finalizar con la entrega.</Tooltip>
        <div className={isVisible ? "" : "hidden"}>
      
            <ListadoInvitaciones
              invitationData={invitationData}
              setBidId={setBidId}
              formData={formData}
              handleItemClick={handleItemClick}
              closeProject={closeProject}
              sendReminder={sendReminder}
            ></ListadoInvitaciones>

        </div>
      </div>
    </Loader>
  ;
};

export default ProjectDetails;