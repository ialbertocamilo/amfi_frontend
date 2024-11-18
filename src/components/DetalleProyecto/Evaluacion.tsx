import React, { useState } from "react";
import StarRating from "../Commons/StarRating/StarRating";
import BinaryChoice from "../Commons/BinaryChoice/BinaryChoice";
import PercentageSelector from "../Commons/PercentageSelector/PercentageSelector";
import InfoLink from "../Commons/InfoLink/InfoLink";

const creativeProposal = [
  "Nivel de singularidad",
  "Tipo de estructura",
  "Calidad de producción",
  "Creatividad",
  "Originalidad",
  "Impacto visual",
  "Claridad del mensaje",
  "Innovación",
  "Relevancia",
  "Ejecución técnica",
];

const questionsEmpresa = [
  "¿Se tiene experiencia previa con la productora?",
  "¿La empresa está constituida legalmente?",
  "¿La empresa tiene proyectos relevantes para la licitación?",
  "¿La empresa está ordenada en materia fiscal?",
];
const questionsEmpresaStartIndex = creativeProposal.length;

const questionsRespaldo = [
  "¿La empresa está afiliada a alguna asociación?",
  "¿Cuántos años en el mercado tiene la empresa?",
  "¿Se tienen algún reporte negativo de la empresa?",
  "¿La empresa cuenta con buena reputación en RRSS?",
];
const questionsRespaldoStartIndex =
  creativeProposal.length + questionsEmpresa.length;

const questionsDirector = [
  "¿Se tiene experiencia previa con el director?",
  "¿Es talento joven? (menos 2 años en el mercado)",
  "¿El reel contiene piezas relevantes para el proyecto?",
];
const questionsDirectorStartIndex =
  creativeProposal.length + questionsEmpresa.length + questionsRespaldo.length;




const Evaluacion: React.FC<{ invitationId:string | null, showComponent: (componentName: "list" | "evaluation" | "comparison") => void; }> = ({
  showComponent,
}) => {
  const [ratings, setRatings] = useState(
    Array(creativeProposal.length).fill(0)
  );
  const [porcentajeProduestaCreativa, setPorcentajeProduestaCreativa] =
    useState(0);
  const [porcentajeExpereiencia, setPorcentajeExpereiencia] = useState(0);
  const [answers, setAnswers] = useState(
    Array(creativeProposal.length).fill("")
  );

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPorcentajeProduestaCreativa(Number(e.target.value));
  };

  const handlePercentageChangeExperiencia = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPorcentajeExpereiencia(Number(e.target.value));
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
              onChange={handlePercentageChange}
            ></PercentageSelector>
            <InfoLink label="Ver puntaje de sección"></InfoLink>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            {creativeProposal.map((question, index) => (
              <div key={index}>
                <StarRating
                  label={question}
                  value={ratings[index]}
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
              value={porcentajeProduestaCreativa}
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
                    label={question}
                    index={index + questionsEmpresaStartIndex}
                    answer={answers[index + questionsEmpresaStartIndex]}
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
                    label={question}
                    index={index + questionsRespaldoStartIndex}
                    answer={answers[index + questionsRespaldoStartIndex]}
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
                    label={question}
                    index={index + questionsDirectorStartIndex}
                    answer={answers[index + questionsDirectorStartIndex]}
                    handleAnswerChange={handleAnswerChange}
                  ></BinaryChoice>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Presupuesto */}
        <div>
          <h4 className="border-b font-bold pb-3">Presupuesto</h4>
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
            onClick={() => showComponent("list")}
            className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
          >
            Atras
          </button>
          <button
            type="submit"
            className="w-1/4 bg-red-500 text-white py-2 rounded"
            onClick={() => showComponent("comparison")}
          >
            Comparativo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Evaluacion;
