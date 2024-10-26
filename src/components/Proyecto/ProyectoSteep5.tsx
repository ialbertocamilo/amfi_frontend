import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import { useEffect } from "react";
import { getProductoras } from "@/api/productoraApi";
import { ProjectMapper } from "@/mappers/project.mapper";
import CasaDetails from "../CasaDetails";

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
}
interface CasaProductora {
  additionalInfo: string | null;
  amfiId: string | null;
  certificationId: string;
  createdAt: string;
  facebook_url: string;
  foundingYear: number;
  id: string;
  instagram_url: string;
  legalName: string;
  linkedin_url: string;
  name: string;
  nationalIdentifierOrRFC: string;
  slug: string;
  type: string;
  web_url: string;
  selected: boolean;
  details: boolean;
  directors: any[];
}

const ProyectoSteep5 = ({
  formData,
  handleChange,
  handleSubmit,
  activeTab,
  setactiveTab,
}: registroEntity) => {
  const fetchCasasProductoras = async () => {
    try {
      const data: CasaProductora[] = await getProductoras();
      console.log(data);
      const filtered = data.map((casa) => ({
        ...casa,
        selected: false,
        details: false,
        detailsEnabled: false,
      }));
      setCasasProductoras(filtered);
    } catch (error) {
      console.error("Error fetching casas productoras:", error);
    }
  };

  useEffect(() => {
    fetchCasasProductoras();
  }, []);
  const [casasProductoras, setCasasProductoras] = useState<CasaProductora[]>(
    []
  );

  const [buscar, setBuscar] = useState("");
  const [revisarPropuesta, setRevisarPropuesta] = useState(false);

  const toggleSeleccion = (index: number) => {
    const updatedCasas = [...casasProductoras];
    updatedCasas[index].selected = !updatedCasas[index].selected;
    setCasasProductoras(updatedCasas);
  };

  const toggleDetalles = (index: number) => {
    const updatedCasas = [...casasProductoras];
    updatedCasas[index].details = !updatedCasas[index].details;
    setCasasProductoras(updatedCasas);
  };

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>

      <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
        <div className="space-y-8 p-4">
          {/* Navegación de pestañas */}
          <div className="tabs flex justify-center space-x-10 mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setactiveTab(step.toString())}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  Number(activeTab) >= step
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {Number(activeTab) >= step ? <FaCheck /> : step}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4">Invitar Casas Productoras</h2>

          {/* Buscar productora */}
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Buscar productora"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>

          {/* Lista de casas productoras */}
          <div className="space-y-4">
            {casasProductoras
              .filter((casa) =>
                casa.name.toLowerCase().includes(buscar.toLowerCase())
              )
              .map((casa, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-4"
                >
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
                      {casa?.details ? "Ocultar detalle" : "Ver detalle"}
                    </button>
                  </div>
                  
                  <CasaDetails casa={casa} index={index} toggleDetalles={toggleDetalles} />
                </div>
              ))}
          </div>

          {/* Mensaje informativo */}
          <div
            className="mt-6 p-4 text-black-700 rounded-lg"
            style={{ backgroundColor: "#DFF9FF" }}
          >
            Te recomendamos que solo invites a 5 Casas Productoras como máximo.
          </div>

          {/* Revisar propuesta creativa */}
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-medium">
              Revisión de propuesta creativa
            </span>
            <input
              type="checkbox"
              checked={revisarPropuesta}
              onChange={() => setRevisarPropuesta(!revisarPropuesta)}
              className="form-checkbox h-5 w-5 text-red-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            De activar esta opción la evaluación de propuesta creativa será
            incluida en este proyecto.
          </p>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
              onClick={() => handleSubmit("5")}
            >
              Atras
            </button>
            <button
              className="w-1/4 bg-red-500 text-white py-2 rounded"
              onClick={() => handleSubmit("6")}
            >
              Guardar proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoSteep5;
