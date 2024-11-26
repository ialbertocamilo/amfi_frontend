import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import StarRating from "../Commons/StarRating/StarRating";
import BinaryChoice from "../Commons/BinaryChoice/BinaryChoice";
import PercentageSelector from "../Commons/PercentageSelector/PercentageSelector";
import InfoLink from "../Commons/InfoLink/InfoLink";
import { Evaluation } from "@/api/interface/api.interface";
import { getBidEvaluation, updateBidEvaluation } from "@/api/projectApi";

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
  bidId: string;
  showComponent: (componentName: "list" | "evaluation" | "comparison") => void;
}

const Evaluacion: React.FC<EvaluacionProps> = ({ bidId, showComponent }) => {
  const [evaluation, setEvaluation] = useState<Evaluation>({
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
    hasPreviousExperienceWithProductionCompany: null,
    companyLegallyEstablished: null,
    companyHasRelevantProjects: null,
    companyTaxCompliance: null,
    companyAffiliatedWithAssociation: null,
    negativeReportsExist: null,
    companyHasMoreThanXYearsInMarket: null,
    goodSocialMediaReputation: null,
    hasPreviousExperienceWithDirector: null,
    isYoungTalent: null,
    reelContainsRelevantPieces: null,
  });

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
    {
      key: "companyYearsInMarket",
      label: "¿Cuántos años en el mercado tiene la empresa?",
      value: null,
    },
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

  const questionsEmpresaStartIndex = creativeProposal.length;
  const questionsRespaldoStartIndex =
    creativeProposal.length + questionsEmpresa.length;
  const questionsDirectorStartIndex =
    creativeProposal.length +
    questionsEmpresa.length +
    questionsRespaldo.length;

  const [hideSection, setHideSection] = useState(true);

  const [porcentajeProduestaCreativa, setPorcentajeProduestaCreativa] =
    useState(40);
  const [answers, setAnswers] = useState(
    Array(creativeProposal.length).fill("")
  );

  const updateEvaluation = (
    proposal: ProposalItem[] | QuestionItem[],
    evaluation: Evaluation
  ) => {
    return proposal.map((item) => ({
      ...item,
      value:
        evaluation[item.key] !== undefined ? evaluation[item.key] : item.value,
    }));
  };

  const onInit = async () => {
    const evaluation = (await getBidEvaluation(bidId))?.result;

    if (evaluation) {
      setEvaluation(evaluation);
      setCreativeProposal(updateEvaluation(creativeProposal, evaluation));
      setQuestionsEmpresa(updateEvaluation(questionsEmpresa, evaluation));
      setQuestionsRespaldo(updateEvaluation(questionsRespaldo, evaluation));
      setQuestionsDirector(updateEvaluation(questionsDirector, evaluation));
    }
  };

  useEffect(() => {
    onInit();
  }, [bidId]);

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleRatingChange = (index: number, value: number) => {
    const newCreativeProposal = creativeProposal;
    newCreativeProposal[index].value = value;

    setCreativeProposal(newCreativeProposal);
    console.log("creativeProposal", creativeProposal);
  };

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPorcentajeProduestaCreativa(Number(e.target.value));
  };

  const updateBidEvaluationData = () => {
    creativeProposal.forEach((proposal) => {
      evaluation[proposal.key] = proposal.value;
    });

    updateBidEvaluation(bidId, evaluation);
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
              value={porcentajeProduestaCreativa}
              startRange={30}
              onChange={handlePercentageChange}
            ></PercentageSelector>
            <InfoLink label="Ver puntaje de sección"></InfoLink>
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
            <InfoLink label="Ver puntaje de sección"></InfoLink>
          </div>
          {/* Preguntas empresa */}
          <div className="pt-4">
            <h3 className="text-xl font">Empresa</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {questionsEmpresa.map((question, index) => (
                <div key={index + questionsEmpresaStartIndex}>
                  <BinaryChoice
                    label={question.label}
                    index={index + questionsEmpresaStartIndex}
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
              {questionsRespaldo.map((question, index) => (
                <div key={index + questionsRespaldoStartIndex}>
                  <BinaryChoice
                    label={question.label}
                    index={index + questionsRespaldoStartIndex}
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
              {questionsDirector.map((question, index) => (
                <div key={index + questionsDirectorStartIndex}>
                  <BinaryChoice
                    label={question.label}
                    index={index + questionsDirectorStartIndex}
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
                value={80 - porcentajeProduestaCreativa}
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
            <InfoLink label="Ver puntaje de sección"></InfoLink>
          </div>
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
        </div>
      </section>

      {/* Puntaje final */}
      <footer className="mt-6">
        <div className="mt-6 flex justify-end">
          <div className="text-6xl font-text-black font-extrabold bg-blue-50 p-2 rounded-md shadow-md">
            <p className="font-bold text-lg">Puntaje Final</p>
            <div className="text-4xl font-text-black font-extrabold">85.70</div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            onClick={() => {
              showComponent("list"), updateBidEvaluationData();
            }}
            className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
          >
            Atras
          </button>
          <button
            type="submit"
            className="w-1/4 bg-red-500 text-white py-2 rounded"
            onClick={() => {
              showComponent("comparison"), updateBidEvaluationData();
            }}
          >
            Comparativo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Evaluacion;
