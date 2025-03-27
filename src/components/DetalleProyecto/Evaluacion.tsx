import { Budget, Evaluation } from "@/api/interface/api.interface";
import { getBidEvaluation, updateBidEvaluation } from "@/api/projectApi";
import { calculateBudgetScore, calculateEvaluationScore } from "@/lib/utils";
import { useProjectContext } from "@/providers/project.context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import BinaryChoice from "../Commons/BinaryChoice/BinaryChoice";
import InfoLink from "../Commons/InfoLink/InfoLink";
import PercentageSelector from "../Commons/PercentageSelector/PercentageSelector";
import ScoreModal from "../Commons/ScoreModal/ScoreModal";
import StarRating from "../Commons/StarRating/StarRating";
import BudgetBarChart from "./BudgetBarChart";

interface ProposalItem {
  key: string;
  label: string;
  value: number;
}

interface QuestionItem {
  key: string;
  label: string;
  value: boolean | null;
}

interface EvaluacionProps {
  projectInvitationId: string;
  projectId:string;
  creativeProposalPercentage: number;
  setCreativeProposalPercentage: React.Dispatch<React.SetStateAction<number>>;
}

const Evaluacion: React.FC<EvaluacionProps> = ({
  projectInvitationId,projectId,
  creativeProposalPercentage,
  setCreativeProposalPercentage,
}) => {
  const [evaluation, setEvaluation] = useState<
    Evaluation & { creativeProposalWeight?: number }
  >({
    creativeProposal: {
      uniquenessLevel: 0,
      productionQuality: 0,
      originality: 0,
      messageClarity: 0,
      relevance: 0,
      structureType: 0,
      creativity: 0,
      visualImpact: 0,
      innovation: 0,
      technicalExecution: 0,
    },
    experience: {
      company: {
        hasPreviousExperienceWithProductionCompany: null,
        companyLegallyEstablished: null,
        companyHasRelevantProjects: null,
        companyTaxCompliance: null,
      },
      support: {
        companyAffiliatedWithAssociation: null,
        negativeReportsExist: null,
        companyHasMoreThanXYearsInMarket: null,
        goodSocialMediaReputation: null,
      },
      director: {
        hasPreviousExperienceWithDirector: null,
        isYoungTalent: null,
        reelContainsRelevantPieces: null,
      },
    },
    creativeProposalWeight: 0.4,
  });
  const [budget, setBudget] = useState<Budget>({
    crew: 0,
    preAndPro: 0,
    talent: 0,
    equipment: 0,
    location: 0,
    travel: 0,
    stillPhotography: 0,
    postProduction: 0,
    financing: 0,
    insurance: 0,
    overhead: 0,
    markUp: 0,
  });

  const [budgetBaseline, setBudgetBaseline] = useState<number>(0);

  const [creativeProposal, setCreativeProposal] = useState<ProposalItem[]>([
    { key: "uniquenessLevel", label: "Nivel de singularidad", value: 0 },
    { key: "structureType", label: "Tipo de estructura", value: 0 },
    { key: "productionQuality", label: "Calidad de producción", value: 0 },
    { key: "creativity", label: "Creatividad", value: 0 },
    { key: "originality", label: "Originalidad", value: 0 },
    { key: "visualImpact", label: "Impacto visual", value: 0 },
    { key: "messageClarity", label: "Claridad del mensaje", value: 0 },
    { key: "innovation", label: "Innovación", value: 0 },
    { key: "relevance", label: "Relevancia", value: 0 },
    { key: "technicalExecution", label: "Ejecución técnica", value: 0 },
  ]);

  const [questionsEmpresa, setQuestionsEmpresa] = useState<QuestionItem[]>([
    {
      key: "hasPreviousExperienceWithProductionCompany",
      label: "¿Se tiene experiencia previa con la productora?",
      value: null,
    },
    {
      key: "companyLegallyEstablished",
      label: "¿La empresa está constituida legalmente?",
      value: null,
    },
    {
      key: "companyHasRelevantProjects",
      label: "¿La empresa tiene proyectos relevantes para la licitación?",
      value: null,
    },
    {
      key: "companyTaxCompliance",
      label: "¿La empresa está ordenada en materia fiscal?",
      value: null,
    },
  ]);

  const [questionsRespaldo, setQuestionsRespaldo] = useState<QuestionItem[]>([
    {
      key: "companyAffiliatedWithAssociation",
      label: "¿La empresa está afiliada a alguna asociación?",
      value: null,
    },
    // TODO : completa companyYearsInMarket debe traerse de la company 
    // {
    //   key: "companyYearsInMarket",
    //   label: "¿Cuántos años en el mercado tiene la empresa?",
    //   value: null,
    // },
    {
      key: "negativeReportsExist",
      label: "¿Se tienen algún reporte negativo de la empresa?",
      value: null,
    },
    {
      key: "goodSocialMediaReputation",
      label: "¿La empresa cuenta con buena reputación en RRSS?",
      value: null,
    },
  ]);

  const [questionsDirector, setQuestionsDirector] = useState<QuestionItem[]>([
    {
      key: "hasPreviousExperienceWithDirector",
      label: "¿Se tiene experiencia previa con el director?",
      value: null,
    },
    {
      key: "isYoungTalent",
      label: "¿Es talento joven? (menos 2 años en el mercado)",
      value: null,
    },
    {
      key: "reelContainsRelevantPieces",
      label: "¿El reel contiene piezas relevantes para el proyecto?",
      value: null,
    },
  ]);

  const [evaluationScore, setEvaluationScore] = useState<{
    creativeProposal: number;
    experience: number;
    budget: number;
  }>({
    creativeProposal: 0,
    experience: 0,
    budget: 0,
  });

  const [hideSection, setHideSection] = useState(true);
const [allBudgetsSubmitted, setAllBudgetsSubmitted] = useState(false);

  const updateEvaluation = (
    proposal: ProposalItem[] | QuestionItem[],
    evaluation: object,
  ) => {
    return proposal.map((item) => ({
      ...item,
      value:
        evaluation[item.key] !== undefined ? evaluation[item.key] : item.value,
    }));
  };

  const setProject = useProjectContext()?.setProject;
  const onInit = async () => {
    const data=await getBidEvaluation(projectInvitationId)
    if (!data) {
      router.back();
      return;
    }
    const result = data?.result;
    console.log("data", data)
    if (setProject && result?.project) {
      setProject(result?.project);
    }
    const evaluation = result?.evaluation;
    const budget = result?.budget;

    setCreativeProposalPercentage(result!.creativeProposalWeight * 100);
    setBudgetBaseline(result!.baselineBudget);
    const calculatedEvaluationScore = {
      creativeProposal: 0,
      experience: 0,
      budget: 0,
    };

    if (evaluation) {
      setEvaluation(evaluation);

      setCreativeProposal(
        updateEvaluation(creativeProposal, evaluation.creativeProposal),
      );
      setQuestionsEmpresa(
        updateEvaluation(questionsEmpresa, evaluation.experience.company),
      );
      setQuestionsRespaldo(
        updateEvaluation(questionsRespaldo, evaluation.experience.support),
      );
      setQuestionsDirector(
        updateEvaluation(questionsDirector, evaluation.experience.director),
      );
      const { creativeProposal: creativeScore, experience } =
        calculateEvaluationScore(evaluation, result!.creativeProposalWeight);
      console.log("creativeScore", creativeScore);
      calculatedEvaluationScore.creativeProposal = creativeScore;
      calculatedEvaluationScore.experience = experience;
    }

    if (budget) {
      console.log("budget", budget);  
      setBudget(budget);
      const totalBudget = Object.values(budget).reduce(
        (acc, value) => acc + value,
        0,
      );
      // Check if all production houses have submitted budgets
      setAllBudgetsSubmitted(true); // TODO: Replace with actual API check

      calculatedEvaluationScore.budget = calculateBudgetScore(
        totalBudget,
        result!.baselineBudget,
        result!.creativeProposalWeight,
      ).budget;
    }

    setEvaluationScore(calculatedEvaluationScore);
  };

  useEffect(() => {
    if (projectInvitationId) onInit();
  }, [projectInvitationId]);

  const handleAnswerChange = (key: string, answer: boolean) => {
    console.log("handleAnswerChange", key);

    const newQuestionEmpresa = questionsEmpresa.map((item) => {
      if (item.key === key) {
        item.value = answer;
      }
      return item;
    });
    const newQuestionRespaldo = questionsRespaldo.map((item) => {
      if (item.key === key) {
        item.value = answer;
      }
      return item;
    });
    const newQuestionDirector = questionsDirector.map((item) => {
      if (item.key === key) {
        item.value = answer;
      }
      return item;
    });

    setQuestionsEmpresa(newQuestionEmpresa);
    setQuestionsRespaldo(newQuestionRespaldo);
    setQuestionsDirector(newQuestionDirector);

    setEvaluation(updateBidEvaluationData());

    setEvaluationScore({
      ...evaluationScore,
      ...calculateEvaluationScore(evaluation, creativeProposalPercentage / 100),
    });
  };

  const handleRatingChange = (index: number, value: number) => {
    const newCreativeProposal = creativeProposal;
    newCreativeProposal[index].value = value;
    setCreativeProposal(newCreativeProposal);

    setEvaluation(updateBidEvaluationData());

    setEvaluationScore({
      ...evaluationScore,
      ...calculateEvaluationScore(evaluation, creativeProposalPercentage / 100),
    });
  };

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCreativeProposalPercentage(Number(e.target.value));
  };

  const updateBidEvaluationData = (): Evaluation & {
    creativeProposalWeight: number;
  } => {
    const newEvaluation = {
      creativeProposal: {
        uniquenessLevel: 0,
        productionQuality: 0,
        originality: 0,
        messageClarity: 0,
        relevance: 0,
        structureType: 0,
        creativity: 0,
        visualImpact: 0,
        innovation: 0,
        technicalExecution: 0,
      },
      experience: {
        company: {
          hasPreviousExperienceWithProductionCompany: null,
          companyLegallyEstablished: null,
          companyHasRelevantProjects: null,
          companyTaxCompliance: null,
        },
        support: {
          companyAffiliatedWithAssociation: null,
          negativeReportsExist: null,
          companyHasMoreThanXYearsInMarket: null,
          goodSocialMediaReputation: null,
        },
        director: {
          hasPreviousExperienceWithDirector: null,
          isYoungTalent: null,
          reelContainsRelevantPieces: null,
        },
      },
      creativeProposalWeight: creativeProposalPercentage / 100,
    };

    creativeProposal.map(
      (item) => (newEvaluation.creativeProposal[item.key] = item.value),
    );

    questionsEmpresa.map(
      (item) => (newEvaluation.experience.company[item.key] = item.value),
    );
    questionsRespaldo.map(
      (item) => (newEvaluation.experience.support[item.key] = item.value),
    );
    questionsDirector.map(
      (item) => (newEvaluation.experience.director[item.key] = item.value),
    );

    return newEvaluation;
  };

  const synchronizeBidEvaluationData = () => {
    updateBidEvaluation(projectInvitationId, updateBidEvaluationData());
  };

  const router = useRouter();
  const goToComparative = () => {
    synchronizeBidEvaluationData();
    router.push(`/comparativo?projectId=${projectId}`);
  };

  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
      {/* Evaluación */}
      <section className="mb-8">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-xl font-semibold">Evaluación</h3>
        </div>

        {/* Propuesta creativa */}
        <div className="pb-6 mb-6">
          <div className="border-b flex justify-between items-center pb-3">
            <PercentageSelector
              label="Propuesta creativa"
              value={creativeProposalPercentage}
              startRange={30}
              onChange={handlePercentageChange}
            ></PercentageSelector>
            <ScoreModal score={evaluationScore.creativeProposal}>
              <InfoLink label="Ver puntaje de sección"></InfoLink>
            </ScoreModal>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            {creativeProposal.map((question, index) => (
              <div key={index}>
                <StarRating
                  label={question.label}
                  initialValue={question.value}
                  max={5}
                  onChange={(value: number) => handleRatingChange(index, value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Experiencia */}
        <div className="pb-6 mb-6">
          <div className="border-b flex justify-between items-center pb-3">
            <PercentageSelector
              label="Experiencia"
              blocked={true}
              value={20}
              onChange={handlePercentageChange}
            ></PercentageSelector>
            <ScoreModal score={evaluationScore.experience}>
              <InfoLink label="Ver puntaje de sección"></InfoLink>
            </ScoreModal>
          </div>
          {/* Preguntas empresa */}
          <div className="pt-4">
            <h3 className="text-xl font">Empresa</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {questionsEmpresa.map((question) => (
                <div key={question.key}>
                  <BinaryChoice
                    label={question.label}
                    keyName={question.key}
                    answer={question.value}
                    handleAnswerChange={handleAnswerChange}
                  ></BinaryChoice>
                </div>
              ))}
            </div>
          </div>
          <br />
          {/* Preguntas empresa */}
          <div>
            <h3 className="text-xl font">Respaldo</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {questionsRespaldo.map((question, _) => (
                <div key={question.key}>
                  <BinaryChoice
                    label={question.label}
                    keyName={question.key}
                    answer={question.value}
                    handleAnswerChange={handleAnswerChange}
                  ></BinaryChoice>
                </div>
              ))}
            </div>
          </div>

          <br />
          {/* Preguntas director */}
          <div>
            <h3 className="text-xl font">Director</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {questionsDirector.map((question, _) => (
                <div key={question.key}>
                  <BinaryChoice
                    label={question.label}
                    keyName={question.key}
                    answer={question.value}
                    handleAnswerChange={handleAnswerChange}
                  ></BinaryChoice>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Presupuesto */}
        <div>
          <div className="border-b flex justify-between items-center pb-3">
            <div className="flex items-center">
              <PercentageSelector
                label="Presupuesto"
                blocked={true}
                hide={hideSection}
                value={80 - creativeProposalPercentage}
                onChange={handlePercentageChange}
              ></PercentageSelector>
              <div className="pl-5  flex justify-between items-center">
                {hideSection ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>}
                <div
                  className="pl-2 text-base font-semibold hover:underline"
                  onClick={() => setHideSection(!hideSection)}
                >
                  {hideSection ? "Desbloquear sección" : "Ocultar sección"}
                </div>
              </div>
            </div>
            <ScoreModal score={evaluationScore.budget}>
              <InfoLink label="Ver puntaje de sección"></InfoLink>
            </ScoreModal>
          </div>
          {!allBudgetsSubmitted || hideSection ? (
            <div className="mt-4">
              <div className="flex justify-center">
                <img
                  src="presupuestoBloqueado.png"
                  alt="Presupuesto"
                  className="max-w-full h-auto"
                />
              </div>
              <p className="mt-4 text-center">
                Una vez que todas las casas productoras hayan subido su
                presupuesto,
                <br />
                podrás desbloquear esta sección.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <BudgetBarChart budget={budget}></BudgetBarChart>
            </div>
          )}
        </div>
        <div></div>
      </section>

      {/* Puntaje final */}
      <footer className="mt-6">
        <div className="mt-6 flex justify-end">
          <div className="text-6xl font-text-black font-extrabold bg-blue-50 p-2 rounded-md shadow-md">
            <p className="font-bold text-lg">Puntaje Final</p>
            <div className="flex justify-center text-4xl font-text-black font-extrabold">
              {evaluationScore.creativeProposal +
                evaluationScore.experience +
                evaluationScore.budget}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            onClick={() => {
              synchronizeBidEvaluationData();
              window.history.back();
            }}
            className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
          >
            Atras
          </button>
          <button
            type="submit"
            className="w-1/4 bg-red-500 text-white py-2 rounded"
            onClick={goToComparative}
          >
            Comparativo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Evaluacion;
