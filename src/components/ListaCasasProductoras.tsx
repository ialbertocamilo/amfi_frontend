import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { casasProductorasState, selectedCasasProductorasState, CasaProductora } from "@/state/producerState";
import CasaDetails from "./CasaDetails";
import { getProductoras } from "@/api/productoraApi";

interface ListaCasasProductorasProps {
  buscar: string;
}

const ListaCasasProductoras: React.FC<ListaCasasProductorasProps> = ({ buscar }) => {
  const [casasProductoras, setCasasProductoras] = useRecoilState(casasProductorasState);
  const selectedCasasProductoras = useRecoilValue(selectedCasasProductorasState);

  useEffect(() => {
    const fetchCasasProductoras = async () => {
      try {
        const response = await getProductoras(); // Reemplaza con la URL de tu API
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
          return {
            ...casa,
            selected: !casa.selected,
          };
        }
        return casa;
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

  const toggleDirectorSeleccion = (casaIndex: number, directorId: number) => {
    setCasasProductoras(prevState => {
      const newState = prevState.map((casa, i) => {
        if (i === casaIndex) {
          const updatedDirectors = casa.directors.map(director => {
            if (director.id === directorId) {
              return {
                ...director,
                selected: !director.selected,
              };
            }
            return director;
          });
          return {
            ...casa,
            directors: updatedDirectors,
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
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={casa.selected}
                  onChange={() => toggleSeleccion(index)}
                  className="form-checkbox h-5 w-5 text-red-500"
                />
                <span className="text-lg font-medium">{casa.name}</span>
              </div>
              <button
                className="text-red-500 font-semibold"
                onClick={() => toggleDetalles(index)}
              >
                {casa.details ? "Ocultar detalle" : "Ver detalle"}
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