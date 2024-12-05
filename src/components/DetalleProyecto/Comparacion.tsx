import React, { useState } from "react";
import StackedBarChar from "./StackedBarChar";
import { useRouter } from "next/router";

export interface EvaluationScore {
  name: string;
  evaluationScore: {
    creativeProposal: number;
    experience: number;
    budget: number;
  };
  status: "Evaluado" | "Completado" | "Rechazado";
}

interface ComparisonProps {
  data: EvaluationScore[];
}

const Comparacion: React.FC<ComparisonProps> = ({ data }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const StackedBarCharData = data.map((group) => ({
    name: group.name,
    score: {
      creativeProposal: group.evaluationScore.creativeProposal,
      experience: group.evaluationScore.experience,
      budget: group.evaluationScore.budget,
    },
  }));

  const headers = [
    "",
    "Grupo",
    "Propuesta creativa",
    "Experiencia",
    "Presupuesto",
    "Puntaje final",
    "Acción",
    "Estado",
  ];

  const action = "Ver Bid letter";

  const handleCheckboxChange = (name: string) => {
    setSelectedGroup(name);
  };

  const router=useRouter()

  const backToList = () => {
    router.back()
  };
  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Comparativo</h2>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `1fr repeat(${
                headers.length - 1
              }, minmax(0, 1.5fr)) 1fr`,
            }}
            className="text-sm font-semibold text-gray-700"
          >
            {headers.map((header, index) => (
              <span
                className="h-20 flex items-center justify-center"
                key={index}
              >
                {header}
              </span>
            ))}
            <span className="h-20 flex items-center justify-center">
              <div className="h-4 w-4 bg-green-200 border rounded-sm mr-1"></div>
              <span className="text-xs font-semibold text-green-400">
                Evaluado
              </span>
            </span>
          </div>
          {data.map((group, index) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `1fr repeat(${
                  headers.length - 1
                }, minmax(0, 1.5fr)) 1fr`,
              }}
              className="h-20  border rounded-lg border-gray-300 mb-4"
            >
              <span className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedGroup === group.name}
                  onChange={() => handleCheckboxChange(group.name)}
                  className="w-6 h-6 rounded-full border-2 border-blue-600 text-blue-600 focus:ring-blue-500 appearance-none checked:bg-blue-600 checked:border-transparent"
                />
              </span>
              <span
                className="flex flex-wrap items-center text-base font-semibold text-gray-700"
                key={index}
              >
                {group.name}
              </span>

              <span
                className="flex items-center justify-center font-semibold text-gray-700"
                key={index}
              >
                {group.evaluationScore.creativeProposal}
              </span>
              <span
                className="flex items-center justify-center font-semibold text-gray-700"
                key={index}
              >
                {group.evaluationScore.experience}
              </span>
              <span
                className="flex items-center justify-center font-semibold text-gray-700 p"
                key={index}
              >
                {group.evaluationScore.budget}
              </span>

              <span
                className="flex items-center justify-center font-bold text-blue-700"
                key={index}
              >
                {group.evaluationScore.creativeProposal +
                  group.evaluationScore.experience +
                  group.evaluationScore.budget}
              </span>

              <span
                className="flex items-center justify-center text-xs font-bold text-red-500"
                key={index}
              >
                {action}
              </span>

              <div className="flex items-center justify-center " key={index}>
                <span
                  className={`h-7 w-24 flex items-center justify-center text-xs font-bold border  rounded-md ${
                    group.status === "Completado"
                      ? "bg-green-100 text-green-500"
                      : group.status === "Rechazado"
                      ? "bg-red-100 text-red-500"
                      : "bg-blue-100 text-blue-500"
                  }`}
                >
                  {group.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          <p>
            Si has completado la evaluación de todos tus candidatos, puedes
            elegir la Casa productora a la que deseas asignar el proyecto.
          </p>
        </div>
        <StackedBarChar data={StackedBarCharData}></StackedBarChar>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded "
            onClick={backToList}
          >
            Atras
          </button>
          <button
            type="submit"
            className="w-1/4 bg-red-500 text-white py-2 rounded"
          >
            Asignar proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparacion;
