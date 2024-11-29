import {getInvitationsByProjectId, getProjectById, updateProjectStatus,} from "@/api/projectApi";
import {ProjectMapper, ProjectStatus} from "@/mappers/project.mapper";
import React, {useEffect, useState} from "react";
import {sendReminderToProductionHouses} from "@/api/productoraApi";
import moment from "moment";
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import Evaluacion from "./Evaluacion";
import ListadoInvitaciones from "./ListadoInvitaciones";
import Comparacion from "./Comparacion";
import {Evaluation, InvitedDirectorsResponse} from "@/api/interface/api.interface";
import Loader from "@/components/Loader";
import useLoader from "@/hooks/loader.hook";

interface ProjectDetailsProps {
    id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({id}) => {
    const [showListadoInvitaciones, setShowListadoInvitaciones] = useState(true);
    const [showEvaluacion, setShowEvaluacion] = useState(false);
    const [showComparacion, setShowComparacion] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const [invitationData, setInvitationData] = useState<InvitedDirectorsResponse>({
        result: [],
        message: "",
    });
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const [bidId, setBidId] = useState<string>("");

    const [formData, setFormData] = useState({
        anunciante: "",
        marca: "",
        producto: "",
        categoria: "",
        nombreProyecto: "",
        versiones: "",
        cantidad: 1,
        cantidadSeleccionar: "",
        agencia: "",
        correoResponsable: "",
        directorCreativo: "",
        contactoFinanzas: "",
        directorCuentas: "",
        productorAgencia: "",
        numeroODT: "",
        contactoCompras: "",
        creado: "",
        estado: "",
    });

    const onInit = async () => {
        setLoading(true)
        const projectData = await getProjectById(id);
        const invitationData = await getInvitationsByProjectId(id);

        if (projectData) {
            setFormData({
                anunciante: projectData?.brand || "",
                marca: projectData?.brand || "",
                producto: projectData?.product || "",
                categoria: projectData?.category || "",
                nombreProyecto: projectData?.name || "",
                versiones: projectData?.versions?.name || "",
                cantidad: projectData?.budget || 1,
                cantidadSeleccionar: projectData?.maxProducers || "",
                agencia: projectData?.agencyName || "-",
                correoResponsable: projectData?.creator?.email || "",
                directorCreativo: projectData?.creator?.jobPosition || "",
                contactoFinanzas: projectData?.isFinancialInfoUnlocked ? "Sí" : "No",
                directorCuentas:
                    `${projectData?.creator?.name} ${projectData?.creator?.lastname}` ||
                    "",
                productorAgencia: projectData?.creator?.name || "",
                numeroODT: projectData?.id || "",
                contactoCompras: projectData?.creator?.nationalIdentifierOrRFC || "",
                creado: moment(projectData?.createdAt).format("DD/MM/YYYY") || "",
                estado: ProjectMapper.mapProjectStatus(projectData?.status) || "",
            });
        }

        if (invitationData) {
            console.log("invitationDataResult", invitationData);
            setInvitationData(invitationData);
        }
        setLoading(false)
    };

    const sendReminder = () => {
        sendReminderToProductionHouses(id as string)
            .then((data) => {
                toast.success("Recordatorio enviado");
            })
            .catch((error) => {
                toast.error("Error al enviar recordatorio");
            });
    };

    const router = useRouter();
    const closeProject = () => {
        console.log("closing project");

        updateProjectStatus(id as string, ProjectStatus.Closed).then((data) => {
            toast.success("Convocatoria cerrada");
            router.push("/lista-de-proyectos-admin");
        });
    };

    useEffect(() => {
        if (id) {
            onInit();

        }
    }, [id]);

    const handleItemClick = () => {
        setShowListadoInvitaciones(false);
        setShowEvaluacion(true);
    };

    const showComponent = (
        componentName: "list" | "evaluation" | "comparison"
    ) => {
        switch (componentName) {
            case "list":
                setShowListadoInvitaciones(true);
                setShowEvaluacion(false);
                setShowComparacion(false);
                break;
            case "evaluation":
                setShowListadoInvitaciones(false);
                setShowEvaluacion(true);
                setShowComparacion(false);
                break;
            case "comparison":
                setShowListadoInvitaciones(false);
                setShowEvaluacion(false);
                setShowComparacion(true);
                break;
            default:
                setShowListadoInvitaciones(true);
        }
    };

    const {loading,setLoading}=useLoader(false)
    return (
        <Loader loading={loading}>
        <div className="mt-6 px-4 w-full max-w-screen-xxl mx-auto bg-white rounded-xl space-y-6 lg:px-8">
            <div className="flex flex-col border-b">
                <h1 className="text-xl font-semibold pb-4">
                    {formData?.nombreProyecto}
                </h1>
                <div className="flex justify-between pb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600 pb-2">
                            Creador: {formData?.anunciante}
                        </p>
                        <p className="text-sm font-medium text-gray-600 pb-2">
                            Agencia: {formData?.agencia}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 pb-2">
                            Creado: {formData?.creado}
                        </p>
                        <p className="text-sm font-medium text-gray-600 pb-2">
                            Estado: {formData?.estado}
                        </p>
                    </div>
                    <div className="flex items-end min-w-[10%]">
                        <p
                            onClick={() => setIsVisible(!isVisible)}
                            className="text-sm text-orange-500 font-medium hover:underline"
                        >
                            {isVisible ? "Ocultar detalle" : "Ver detalle"}
                        </p>
                    </div>
                </div>
            </div>
            <div className={isVisible ? "" : "hidden"}>
                {showListadoInvitaciones ? (
                    <ListadoInvitaciones
                        invitationData={invitationData}
                        setEvaluation={setEvaluation}
                        setBidId={setBidId}
                        showComponent={showComponent}
                        formData={formData}
                        handleItemClick={handleItemClick}
                        closeProject={closeProject}
                        sendReminder={sendReminder}
                    ></ListadoInvitaciones>
                    
                ) : (
                    <></>
                )}
                {showEvaluacion ? (
                    <Evaluacion
                        bidId={bidId}
                        showComponent={showComponent}
                    ></Evaluacion>
                ) : (
                    <></>
                )}
                {showComparacion ? (
                    <Comparacion showComponent={showComponent}></Comparacion>
                ) : (
                    <></>
                )}
            </div>
        </div>
        </Loader>
    );
};

export default ProjectDetails;
