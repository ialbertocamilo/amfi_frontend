import { getInvitedDirectors } from "@/api/directorApi";
import { addDirectorsToProject } from "@/api/projectApi";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { checkProjectReadonly } from "@/lib/utils";
import { ProjectStatus } from "@/mappers/project.mapper";
import { useProjectContext } from "@/providers/project.context";
import { casasProductorasSelected, selectedCasasProductorasState } from "@/state/producerState";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import ListaCasasProductoras from "../ListaCasasProductoras";
import CasasProductorasModal from "./CasasProductorasModal";

interface registroEntity {
    formData: any;
    handleChange: any;
    handleSubmit: any;
    setactiveTab: any
}
const ListaCasasProductorasWrapper = ({ searchTerm }: { searchTerm: string }) => {

    const router = useRouter()
    const { id } = router.query
    const projectContext = useProjectContext();

    const [invitedDirectors, setInvitedDirectors] = useState<IProjectInvitation[]>([]);
    useEffect(() => {

        if (id) {
            getInvitedDirectors(id as string).then((res) => {
                const result = res.filter(value => value.accepted)
                setInvitedDirectors(result)
            })
        }
    }, [id])

    if (!checkProjectReadonly(projectContext?.project?.status as ProjectStatus)) {
        return <ListaCasasProductoras buscar={searchTerm.toLowerCase()} projectId={id as string} />;
    }

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-gray-600">
                ℹ️ El proyecto está en proceso. No se pueden realizar cambios.
            </p>
            <div className="mt-4">
                {invitedDirectors.map((director) => (
                    <div key={director.id} className="mb-2 border border-gray-200 rounded-md p-3">
                        <p className="flex items-center">
                           
                            <span className="text-green-500 mr-2">✔</span>
                            {director.productionHouse.name} 
                        </p>
                        <p className="ml-6">
                            Director: {director.director?.name} {director.director?.lastname}
                        </p>
                    </div>
                ))}
                {invitedDirectors.length === 0 && (
                    <p>Aún no hay casas productoras invitadas.</p>
                )}
            </div>
        </div>
    );
};
const ProyectoSteep5 = ({
    formData,
    handleSubmit,
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

                const selectedDirectors = casa.directors.filter((director) => director.selected == true)
                for (const selectedDirector of selectedDirectors) {
                    if (selectedDirector?.id && id) {
                        arrInvitedProductors.push({
                            projectId: id as string,
                            directorId: selectedDirector.id,
                            productionHouseId: casa.id
                        })
                    }
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
    // const [revisarPropuesta, setRevisarPropuesta] = useState(false);

    const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] =
        useState(false);


    const projectContext = useProjectContext();
    return (
        <div className="space-y-8 p-4">
            <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
                <div className="space-y-8 p-4">

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
                    <ListaCasasProductorasWrapper searchTerm={buscar} />

                    {/* Mensaje informativo */}
                    <div
                        className="mt-6 p-4 text-black-700 rounded-lg"
                        style={{ backgroundColor: "#DFF9FF" }}
                    >
                        La lista muestra casas productoras que tienen al menos un director.
                    </div>
                    <div
                        className="mt-6 p-4 text-black-700 rounded-lg"
                        style={{ backgroundColor: "#DFF9FF" }}
                    >
                        Te recomendamos que solo invites a 5 Casas Productoras como máximo.
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
                        {!checkProjectReadonly(projectContext?.project?.status as ProjectStatus) && <button
                            className="w-1/4 bg-red-500 text-white py-2 rounded"
                            onClick={handleSave}

                        >
                            Guardar proyecto
                        </button>}

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