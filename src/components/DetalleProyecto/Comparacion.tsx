import React, { useState } from 'react';

// Define the type for the comparison data
type GroupData = {
  name: string;
  creativeProposal: number;
  experience: number;
  budget: number;
  finalScore: number;
  status: 'Evaluado' | 'Completado' | 'Rechazado';
  action: string;
  highlighted?: boolean;
};

const groups: GroupData[] = [
  {
    name: 'Grupo Triaxende',
    creativeProposal: 88.59,
    experience: 68.33,
    budget: 66.35,
    finalScore: 66.24,
    status: 'Evaluado',
    action: 'Ver Bid letter',
    highlighted: true,
  },
  {
    name: 'Ikarus',
    creativeProposal: 50.23,
    experience: 45.55,
    budget: 87.32,
    finalScore: 66.66,
    status: 'Completado',
    action: 'Ver Bid letter',
  },
  {
    name: 'Filmmaking',
    creativeProposal: 23.24,
    experience: 34.63,
    budget: 84.22,
    finalScore: 45.56,
    status: 'Rechazado',
    action: 'Ver Bid letter',
  },
  {
    name: 'Dr. Comunication',
    creativeProposal: 45.65,
    experience: 34.45,
    budget: 56.25,
    finalScore: 45.24,
    status: 'Completado',
    action: 'Ver Bid letter',
  },
  {
    name: 'Grupo de León',
    creativeProposal: 35.67,
    experience: 34.65,
    budget: 76.23,
    finalScore: 56.33,
    status: 'Evaluado',
    action: 'Ver Bid letter',
    highlighted: true,
  },
];

const Comparacion: React.FC<{ setShowEvaluacion: (show: boolean) => void }> = ({ setShowEvaluacion }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleCheckboxChange = (name: string) => {
    setSelectedGroup(name);
  };

  return (
    <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Comparativo</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Grupo</th>
                <th className="text-center p-4">Propuesta creativa</th>
                <th className="text-center p-4">Experiencia</th>
                <th className="text-center p-4">Presupuesto</th>
                <th className="text-center p-4">Puntaje final</th>
                <th className="text-center p-4">Estado</th>
                <th className="text-center p-4">Acción</th>
                <th className="text-center p-4">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                                <tr
                  key={index}
                  className={`border-b ${group.highlighted
                    ? 'bg-[#D7F4F0]'
                    : index % 2 === 0
                      ? 'bg-gray-50'
                      : ''
                    }`}
                >
                  <td className="p-4 text-left font-semibold">{group.name}</td>
                  <td className="p-4 text-center">{group.creativeProposal.toFixed(2)}</td>
                  <td className="p-4 text-center">{group.experience.toFixed(2)}</td>
                  <td className="p-4 text-center">{group.budget.toFixed(2)}</td>
                  <td className={`p-4 text-center font-bold ${group.finalScore >= 60 ? 'text-blue-600' : 'text-red-600'}`}>
                    {group.finalScore.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`py-1 px-2 rounded-full text-xs font-semibold ${group.status === 'Completado'
                          ? 'bg-green-100 text-green-600'
                          : group.status === 'Rechazado'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-blue-500 hover:underline cursor-pointer">
                    {group.action}
                  </td>
                  <td className="p-4 text-center">
                                       <input
                      type="checkbox"
                      checked={selectedGroup === group.name}
                      onChange={() => handleCheckboxChange(group.name)}
                      className="w-6 h-6 rounded-full border-2 border-blue-600 text-blue-600 focus:ring-blue-500 appearance-none checked:bg-blue-600 checked:border-transparent"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          <p>
            Si has completado la evaluación de todos tus candidatos, puedes elegir la Casa productora a la que deseas asignar el proyecto.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button type="submit" className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded " onClick={() => setShowEvaluacion(true)}>Atras</button>
          <button type="submit" className="w-1/4 bg-red-500 text-white py-2 rounded" >Asignar proyecto</button>

        </div>
      </div>
    </div>
  );
};

export default Comparacion;