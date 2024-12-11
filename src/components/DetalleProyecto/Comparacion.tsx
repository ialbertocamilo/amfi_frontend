import { assignProductionHouse } from "@/api/projectApi";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DefaultButton from "../buttons/DefaultButton";
import StackedBarChar from "./StackedBarChar";

export interface EvaluationScore {
  name: string;
  evaluationScore: {
    creativeProposal: number;
    experience: number;
    budget: number;
  };
  id: string;
  projectId: string;
  status: "Pendiente" | "Completado" | "Rechazado";
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

  const handleCheckboxChange = (id: string) => {
    setSelectedGroup(id);
  };
  const [projectAssigned, setProjectAssigned] = useState(false);
  
  const router = useRouter()

  const backToList = () => {
    router.back()
  };


  const { projectInvitationId } = router.query;
  const assignProject = () => {
    const e = window.event;
    e?.preventDefault();
    if (selectedGroup) {
      assignProductionHouse(projectInvitationId as string, selectedGroup)
        .then((response) => {
          console.log("Project assigned successfully:", response);
          toast.success('Se ha enviado un correo a la Casa productora informándole que ha sido asignada al proyecto. Además avisaremos a los demás postulantes que no fueron elegidos.');
          setProjectAssigned(true);
          // router.push("/lista-de-proyectos-admin");
        })
        .catch((error) => {
          console.error("Error assigning project:", error);
        });
    } else {
      console.warn("No group selected");
    }
  };
  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">Comparativo</h2>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `1fr repeat(${headers.length - 1}, minmax(0, 1.5fr)) 1fr`,
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
          </div>
          {data.map((group, index) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `1fr repeat(${headers.length - 1}, minmax(0, 1.5fr)) 1fr`,
              }}
              className="h-20 border rounded-lg border-gray-300 mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              key={`group-${index}`}
              onClick={() => handleCheckboxChange(group.id)}
            >
              <span className="flex items-center justify-center">
                {projectAssigned && selectedGroup === group.id ? (
                  <span role="img" aria-label="assigned">
                    ✅
                  </span>
                ) : (
                  <input
                    type="checkbox"
                    checked={selectedGroup === group.id}
                    onChange={() => handleCheckboxChange(group.id)}
                    className="w-6 h-6 rounded-full border-2 border-blue-600 text-blue-600 focus:ring-blue-500 appearance-none checked:bg-blue-600 checked:border-transparent"
                  />
                )}
              </span>
              <span className="flex flex-wrap items-center text-base font-semibold text-gray-700">
                {group.name}
              </span>
              <span className="flex items-center justify-center font-semibold text-gray-700">
                {group.evaluationScore.creativeProposal}
              </span>
              <span className="flex items-center justify-center font-semibold text-gray-700">
                {group.evaluationScore.experience}
              </span>
              <span className="flex items-center justify-center font-semibold text-gray-700">
                {group.evaluationScore.budget}
              </span>
              <span className="flex items-center justify-center font-bold text-blue-700">
                {group.evaluationScore.creativeProposal +
                  group.evaluationScore.experience +
                  group.evaluationScore.budget}
              </span>
              <span className="flex items-center justify-center text-xs font-bold text-red-500">
                {action}
              </span>
              <div className="flex items-center justify-center">
                <span
                  className={`h-7 w-24 flex items-center justify-center text-xs font-bold border rounded-md ${
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
          {projectAssigned ? (
            <DefaultButton onClick={() => router.push("/lista-de-proyectos-admin")} label={"Ir a proyectos"} />
          ) : (
            <>
              <DefaultButton onClick={backToList} outlined label={"Atras"} />
              <DefaultButton onClick={assignProject} label={"Asignar proyecto"} disabled={!selectedGroup} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comparacion;