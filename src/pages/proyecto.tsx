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
import { ProjectStatus } from "@/mappers/project.mapper";
import {toast} from "react-hot-toast";
import {validateFormData} from "@/lib/utils";

export const inputProjectNames = [
    'brand',
    'product',
    'category',
    'projectName',
    'versionName',
    'quantity',
    'agencyName',
    'agencyEmail',
    'agencyCreativeDirector',
    'contactoFinanzas',
    'agencyAccountDirector',
    'productorAgencia',
    'odtNumber',
    'buyerContact',
    'medios',
    'temporalidad',
    'desglose',
    'territorio',
    'derechos',
    'formaCotizacion',
    'entregaBrief',
    'entregaPresupuesto',
    'visualizacion',
    'entregaProyecto',
    'presupuesto',
    'moneda',
    'objetivoComunicacion',
    'target',
    'lineamientosMarca',
    'link1',
    'link2',
    'responsablePago',
    'momentoFacturacionAgencia',
    'politicaPago',
    'contratoProyecto',
    'tipoProyecto',
    'momentoFacturacion',
    'rondaCotizacion',
    'visualizacion',
    'politicaAltaProveedor',
    'porcentajeTasaAnticipo',
    'porcentajeTasaFiniquito',
    'porcentajeTasaTotal',
    'informacionAdicional',
    'talento',
    'vestuario',
    'locacion',
    'casting',
    'compensacion',
    'maquillajepeinado',
    'online',
    'musica',
    'locucion',
    'animacion',
    'audio',
    'entrega',
    'cantidadAsistentes',
    'puestoAsistentes',
    'comentarioEntregables',
    'comentarios',
    'titularResponsable'
];
const Proyecto: React.FC = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const router = useRouter();
    const { id } = router.query;


    const [readonly, setReadonly] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const { projectJson, loading, fetchProject, saveOrUpdateProject } = useProject(id as string);
    const handleSubmit = async (page: string) => {
        if (page==='6') {
            if (!validateFormData(formData, inputProjectNames)) {
                toast.error("Por favor, llena todos los campos para crear el proyecto");
                return;
            }
        }
        const data: CreateProjectDto | UpdateProjectDto = {
            id: id as string ?? undefined,
            brand: formData?.brand,
            product: formData?.product,
            projectName: formData?.projectName,
            extra: formData,
            status: page === '6' ? ProjectStatus.InProgress : ProjectStatus.Draft // Cuando termina de crear el proyecto, se cambia el estado a En Progreso
        };
            const createdProject = await saveOrUpdateProject(data);
            if (createdProject?.id) {
                await router.replace(`/proyecto?id=${createdProject.id}`);
            }
            if (createdProject)
                setActiveTab(page);
    };

    useEffect(() => {
        if (id) {
            setReadonly(false);
            fetchProject();
        }
    }, [id]);

    useEffect(() => {
        if (projectJson) {
            setFormData((prevFormData) => ({
                ...prevFormData, ...projectJson
            }));
        }
    }, [projectJson]);

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

    return (
        <Layout>
            <ReadonlyBadge readonly={readonly} />
            <div>
                {activeTab === "1" && (
                    <ProyectoSteep1
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        activeTab={activeTab}
                        setactiveTab={setActiveTab}
                        isEditing={readonly}
                        readonly={readonly}
                    />
                )}
                {activeTab === "2" && (
                    <ProyectoSteep2
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        activeTab={activeTab}
                        setactiveTab={setActiveTab}
                    />
                )}
                {activeTab === "3" && (
                    <ProyectoSteep3
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        activeTab={activeTab}
                        setactiveTab={setActiveTab}
                    />
                )}
                {activeTab === "4" && (
                    <ProyectoSteep4
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        activeTab={activeTab}
                        setactiveTab={setActiveTab}
                        entregables={entregables}
                        setEntregables={setEntregables}
                    />
                )}
                {activeTab === "5" && (
                    <ProyectoSteep5
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        activeTab={activeTab}
                        setactiveTab={setActiveTab}
                    />
                )}
                {activeTab === "6" && <ProyectCreated />}
            </div>
        </Layout>
    );
};

export default Proyecto;