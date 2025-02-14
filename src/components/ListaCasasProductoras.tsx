import { getProductorasWithDirectorsAndInvited } from "@/api/productoraApi";
import { CasaProductora, casasProductorasState } from "@/state/producerState";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import CasaDetails from "./CasaDetails";

interface ListaCasasProductorasProps {
  buscar: string;
  projectId: string;
}

const ListaCasasProductoras: React.FC<ListaCasasProductorasProps> = ({ buscar, projectId }) => {
  const [casasProductoras, setCasasProductoras] = useRecoilState(casasProductorasState);

  useEffect(() => {
    const fetchCasasProductoras = async () => {
      try {
        const response = await getProductorasWithDirectorsAndInvited(projectId); // Reemplaza con la URL de tu API
        const data: CasaProductora[] = response;
        const formattedData = data.map(casa => ({
          ...casa,
          selected: false,
          details: false,
          directors: casa.directors.map(director => ({
            ...director,
            selected: false,
          })),
        }));
        setCasasProductoras(formattedData);
      } catch (error) {
        console.error("Error fetching casas productoras:", error);
      }
    };

    fetchCasasProductoras();
  }, [setCasasProductoras]);

  const toggleSeleccion = (index: number) => {
    setCasasProductoras(prevState => {
      const newState = prevState.map((casa, i) => {
        if (i === index) {
          // Toggle selection for clicked casa
          return {
            ...casa,
            selected: !casa.selected,
            details: true, // Automatically show details when selected
          };
        }
        // Deselect other casas
        return {
          ...casa,
          selected: false,
        };
      });
      return newState;
    });
  };

  const toggleDetalles = (index: number) => {
    setCasasProductoras(prevState => {
      const newState = prevState.map((casa, i) => {
        if (i === index) {
          return {
            ...casa,
            details: !casa.details,
          };
        }
        return casa;
      });
      return newState;
    });
  };

  return (
    <div className="space-y-4">
      {casasProductoras
        .filter((casa) =>
          casa.name.toLowerCase().includes(buscar.toLowerCase())
        )
        .map((casa, index) => (
          <div key={index} className={`border rounded-lg p-4 cursor-pointer ${casa.isInvited ? 'bg-blue-50 border-blue-200' : 'border-gray-300'}`} onClick={() => toggleDetalles(index)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={casa.selected}
                  onChange={(e) => {
                    e.stopPropagation();
                    !casa.isInvited && toggleSeleccion(index);
                  }}
                  disabled={casa.isInvited}
                  className={`form-checkbox h-5 w-5 ${casa.isInvited ? 'text-blue-400 cursor-not-allowed opacity-50' : 'text-red-500'}`}
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{casa.name}</span>
                  {casa.isInvited && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Invitada
                    </span>
                  )}
                </div>
              </div>
              <button
                className={`font-semibold ${casa.isInvited ? 'text-blue-500' : 'text-red-500'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetalles(index);
                }}
              >
                {casa.details ? "Ocultar directores" : "Ver directores"}
              </button>
            </div>
            {casa.details && (
              <CasaDetails
                casa={casa}
                index={index}
                toggleDetalles={toggleDetalles}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default ListaCasasProductoras;