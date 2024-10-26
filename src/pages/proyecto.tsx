import React, {useEffect, useState} from "react";
import "./globals.css";
import ProyectoSteep1 from "@/components/Proyecto/ProyectoSteep1";
import ProyectoSteep2 from "@/components/Proyecto/ProyectoSteep2";
import ProyectoSteep4 from "@/components/Proyecto/ProyectoSteep4";
import ProyectoSteep3 from "@/components/Proyecto/ProyectoSteep3";
import ProyectoSteep5 from "@/components/Proyecto/ProyectoSteep5";
import CasasProductorasModal from "@/components/Proyecto/CasasProductorasModal";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import useProject from "@/hooks/project.hook";
import {CreateProjectDto} from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";

const NuevoProyecto: React.FC = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const router = useRouter();
    const {id} = router.query;

    const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] =
        useState(false);
    const [readonly, setReadonly] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const project = useProject(id as string);
    const {projectJson, loading, fetchProject} = useProject(id as string);
    const handleSubmit = async (page: string) => {
        
        if (page === "6") {
            setIsCasasProductorasModalOpen(true); 
        }
        const data: CreateProjectDto | UpdateProjectDto = {
            "id": id as string??undefined,
            "brand": formData?.brand,
            "product": formData?.product,
            "projectName": formData?.projectName,
            "extra": formData
        };
        const createdProject=await project.saveOrUpdateProject(data);
        if (createdProject?.id)
        router.replace(`/proyecto?id=${createdProject.id}`);
        setActiveTab(page);
    };


    useEffect(() => {
        if (id) {
            setReadonly(false);
            fetchProject();
        } else {
            setReadonly(false);
        }
    }, [id]);


    useEffect(() => {
        if (projectJson) {
            console.log('Cargando proyecto', projectJson);
            setFormData({
                ...formData,
                ...projectJson
            });
        }
    },[projectJson])


    const [activeTab, setActiveTab] = useState<string>("1");
    const [entregables, setEntregables] = useState<any[]>([]);

    const ReadonlyBadge = ({readonly}: { readonly: boolean }) => {
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

    if (loading) return <div>Cargando...</div>;
    return (
        <Layout>
            <ReadonlyBadge readonly={readonly}/>
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
            </div>
            <CasasProductorasModal
                isOpen={isCasasProductorasModalOpen}
                onClose={() => setIsCasasProductorasModalOpen(false)}
            />
        </Layout>
    );
};

export default NuevoProyecto;
