import { useState } from "react";
import {getProductorasWithDirectors} from "@/api/productoraApi";
import { addDirectorsToProject } from "@/api/projectApi";
import { casasProductorasSelected, selectedCasasProductorasState } from "@/state/producerState";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import ListaCasasProductoras from "../ListaCasasProductoras";
import CasasProductorasModal from "./CasasProductorasModal";
import StepIndicator from "./StepIndicator/StepIndicator";

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
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { id } = router.query;
  const selectedCasas = useRecoilValue(selectedCasasProductorasState);
  const [casasProductorasNames, setCasasProductorasNames] = useRecoilState(casasProductorasSelected);
  const arrInvitedProductors: { projectId: string, directorId: string, productionHouseId: string }[] = []


  useEffect(() => {
    const names = selectedCasas.map(casa => casa.name);
    setCasasProductorasNames(names);
  }, [selectedCasas, setCasasProductorasNames]);

  const validateSelection = async () => {
    if (!selectedCasas.length) {
      toast.error("Debe seleccionar al menos una casa productora y un director.");
      return false;
    }
    try {

      for (const casa of selectedCasas) {
        const haveSelected = casa.directors.some((director) => director.selected == true)
        if (!haveSelected) {
          toast.error("Debe seleccionar un director.");
          return false
        }

        const selected = casa.directors.filter((director) => director.selected == true)
        if (selected.length > 1) {
          toast.error("Debe seleccionar solo un director.");
          return false
        }
        const selectedDirector = casa.directors.find((director) => director.selected == true)
        if (selectedDirector?.id && id) {
          arrInvitedProductors.push({ projectId: id as string, directorId: selectedDirector.id, productionHouseId: casa.id })
        }
      }
      const [error, response] = await addDirectorsToProject(arrInvitedProductors);
      if (error) {
        toast.error(response)
        return false
      }
      return true
    } catch (error) {
      console.warn(error)
      toast.error("Error al invitar a las casas productoras.")
    }

    return false;
  };
  const handleSave = async () => {

    setIsCasasProductorasModalOpen(true)
  };

  const onSave = async () => {

    const validate = await validateSelection()
    if (!validate) {
      return;
    }
    setError(null);
    setIsCasasProductorasModalOpen(false)
    handleSubmit("6")
  }


  const [buscar, setBuscar] = useState("");
  const [revisarPropuesta, setRevisarPropuesta] = useState(false);

  const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] =
    useState(false);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>

      <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
        <div className="space-y-8 p-4">
          {/* Navegación de pestañas */}
          <div className="tabs flex justify-center space-x-10">
            <StepIndicator activeTab={activeTab} setactiveTab={setactiveTab}/>
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

          <ListaCasasProductoras buscar={buscar.toLowerCase()}/>

          {/* Mensaje informativo */}
          <div
              className="mt-6 p-4 text-black-700 rounded-lg"
              style={{backgroundColor: "#DFF9FF"}}
          >
          La lista muestra casas productoras que tienen al menos un director.
          </div>
          <div
              className="mt-6 p-4 text-black-700 rounded-lg"
              style={{backgroundColor: "#DFF9FF"}}
          >
            Te recomendamos que solo invites a 5 Casas Productoras como máximo.
          </div>

          {/* Revisar propuesta creativa */}
          {/*<div className="mt-4 flex items-center space-x-2">*/}
          {/*  <span className="text-sm font-medium">*/}
          {/*    Revisión de propuesta creativa*/}
          {/*  </span>*/}
          {/*  <input*/}
          {/*      type="checkbox"*/}
          {/*      checked={revisarPropuesta}*/}
          {/*      onChange={() => setRevisarPropuesta(!revisarPropuesta)}*/}
          {/*      className="form-checkbox h-5 w-5 text-red-500"*/}
          {/*  />*/}
          {/*</div>*/}
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
                onClick={handleSave}
            >
              Guardar proyecto
            </button>
          </div>
        </div>
      </div>
      <CasasProductorasModal
          casas={casasProductorasNames}
          isOpen={isCasasProductorasModalOpen}
          onClose={() => setIsCasasProductorasModalOpen(false)}
          onSave={() => onSave()}
      />
    </div>
  );
};

export default ProyectoSteep5;
