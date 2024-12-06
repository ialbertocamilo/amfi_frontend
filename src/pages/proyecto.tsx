import React, { useEffect, useState } from "react";
import "./globals.css";
import ProyectoSteep1 from "@/components/Proyecto/ProyectoSteep1";
import ProyectoSteep2 from "@/components/Proyecto/ProyectoSteep2";
import ProyectoSteep4 from "@/components/Proyecto/ProyectoSteep4";
import ProyectoSteep3 from "@/components/Proyecto/ProyectoSteep3";
import ProyectoSteep5 from "@/components/Proyecto/ProyectoSteep5";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import useProject from "@/hooks/project.hook";
import { CreateProjectDto } from "@/dto/create-project.dto";
import { UpdateProjectDto } from "@/dto/update-project.dto";
import ProyectCreated from "@/components/Proyecto/ProjectCreated";
import { ProjectMapper, ProjectStatus } from "@/mappers/project.mapper";
import { toast } from "react-hot-toast";
import { formatToUtcBackend, validateFormData } from "@/lib/utils";
import Loader from '@/components/Loader';
import StepIndicator from '@/components/Proyecto/StepIndicator/StepIndicator';
import { CompanyType } from "@/constants";
import { useUserContext } from "@/providers/user.context";



const Proyecto: React.FC = () => {
    const [formData, setFormData] = useState({
        brand: '',
        product: '',
        projectName: '',
        versionName: '',
        agencyName: '',
        agencyEmail: '',
        agencyProductor: '',
        agencyCreativeDirector: '',
        contactoFinanzas: '',
        agencyAccountDirector: '',
        odtNumber: '',
        buyerContact: '',
        medios: '',
        temporalidad: '',
        desglose: '',
        territorio1: '',
        territorio2: '',
        territorio3: '',
        entregaBrief: '',
        productodummie: '',
        entregaPresupuesto: '',
        entregaProyecto: '',
        presupuesto: '',
        moneda: '',
        link1: '',
        link2: '',
        responsablePago: '',
        procesoFacturacion: '',
        politicaPago: '',
        contratoProyecto: '',
        tipoProduccion1: '',
        tipoProduccion2: '',
        tipoProduccion3: '',
        rondaCotizacion: '',
        visualizacion: '',
        politicaAltaProveedor: '',
        porcentajeTasaAnticipo: '',
        porcentajeTasaFiniquito: '',
        porcentajeTasaTotal: '',
        informacionAdicional: '',
        talento: '',
        vestuario: '',
        locacion: '',
        maquillajepeinado: '',
        musica: '',
        animacion: '',
        vfx: '',
        cantidadAsistentes: '',
        puestoAsistentes: '',
        comentarioEntregables: '',
        comentarios: '',
        titularResponsable: '',
        cantidadDiasProduccion: '',
        presupuestoAsignado: '',
        anticipo: '',
        antesDeFilmar: '',
        talentoExclusividad: '',
        talentoTipoCasting: '',
        talentoACargoDe: '',
        competencia: '',
        animales: '',
        menoresDeEdad: '',
        efectos: '',
        especieProtegida: '',
        locucionInstitucional: '',
        locucionAgencia: '',
        arteprops: '',
        aCargoDe: '',
        creatividadAprobada: '',
        tipoContratoProyecto: '',
        entregaBidLetter: '',
        entregables: [],
    });
    const router = useRouter();
    const { id } = router.query;


    const [readonly, setReadonly] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const { projectJson, fetchProject, saveOrUpdateProject, status, project } = useProject(id as string);
    const handleSubmit = async (page: string) => {
        if (page === '6') {
            if (!validateFormData(formData,['videos','photos','locutor'])) {
                toast.error("Por favor, llena todos los campos para crear el proyecto");
                return;
            }
        }
        const data: CreateProjectDto | UpdateProjectDto = {
            id: id as string ?? undefined,
            brand: formData?.brand,
            product: formData?.product,
            projectName: formData?.projectName,
            budget: Number(formData?.presupuesto),
            bidDeadline: formData?.entregaBidLetter ? formatToUtcBackend(formData.entregaBidLetter) : undefined,
            extra: formData,
            status: page === '6' ? ProjectStatus.InProgress : ProjectStatus.Draft // Cuando termina de crear el proyecto, se cambia el estado a En proceso
        };
        const createdProject = await saveOrUpdateProject(data);
        if (createdProject?.id) {
            await router.replace(`/proyecto?id=${createdProject.id}`);
        }
        if (createdProject)
            setActiveTab(page);
    };


    const [loader, setLoading] = useState(false);
    const userContext = useUserContext();
    const user = userContext?.user;

    useEffect(() => {
        let agencyEmail = ''
        let agencyName = ''
        // Sirve para el step1
        if (!id){
            if (user && user.company?.type === CompanyType.Agency && formData.agencyName === '' && formData.agencyEmail === '') {
                agencyEmail = user?.email;
                agencyName = user?.company?.legalName;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    agencyEmail,
                    agencyName
                }));
            }}
    }, [user])
    useEffect(() => {
        if (id) {
            setLoading(true)
            setReadonly(false);
            fetchProject().finally(() => {
                setLoading(false);
            });
        }
    }, [id]);

    useEffect(() => {
        if (projectJson) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...projectJson
            }));
            setEntregables(projectJson?.entregables||[]);
        }
    }, [projectJson, user]);

    const [activeTab, setActiveTab] = useState<string>("1");
    const [entregables, setEntregables] = useState<any[]>([]);

    const ReadonlyBadge = ({ readonly }: { readonly: boolean }) => {
        return (
            <div className="relative sm:container">
                {readonly && (
                    <span
                        className={`absolute top-0 right-0 m-2 py-1 px-2 rounded-md font-bold flex items-center justify-center bg-green-500 text-white text-xs`}
                    >
                        Solo lectura
                    </span>
                )}
            </div>
        );
    };

    const ProjectHeader = () => {
        if (status)
            return (
                <>
                    <h1 className="text-2xl font-bold mb-6 space-y-4">
                        Estado del proyecto: <span className="text-blue-500">{ProjectMapper.mapProjectStatus(status)}</span>
                    </h1>
                    <hr />
                    <br />
                    <div className="text-sm text-gray-500 mb-8">
                        <span>Proyectos</span> {'>'} <span>{project?.name}</span>
                    </div>
                </>
            );
        return <>      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
            <div className="text-sm text-gray-500 mb-8">
                <span>Proyectos</span> {'>'} <span>Nuevo proyecto</span>
            </div></>
    }

    useEffect(() => {
        if (entregables)
        setFormData((prevFormData) => ({
            ...prevFormData,
            entregables: entregables as never[]
        }));
    }, [entregables]);
    return (
        <Layout>
            <Loader loading={loader}>
                <ReadonlyBadge readonly={readonly} />
                <div>
                    <ProjectHeader />
                    <div className="tabs flex justify-center space-x-10">
                        <StepIndicator activeTab={activeTab} setactiveTab={setActiveTab} />
                    </div>
                    {activeTab === "1" && (
                        <ProyectoSteep1
                            formData={formData as any}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            isEditing={readonly}
                            readonly={readonly}
                        />
                    )}
                    {activeTab === "2" && (
                        <ProyectoSteep2
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {activeTab === "3" && (
                        <ProyectoSteep3
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {activeTab === "4" && (
                        <ProyectoSteep4
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            entregables={entregables}
                            setEntregables={setEntregables}
                        />
                    )}
                    {activeTab === "5" && (
                        <ProyectoSteep5
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setactiveTab={setActiveTab}
                        />
                    )}
                    {activeTab === "6" && <ProyectCreated />}
                </div>
            </Loader>
        </Layout>
    );
};

export default Proyecto;