import {useEffect, useState} from "react";
import "./globals.css";
import {useRouter} from "next/router";
import PostulacionSteep1 from "@/components/Postulacion/PostulacionSteep1";
import PostulacionSteep2 from "@/components/Postulacion/PostulacionSteep2";
import PostulacionSteep3 from "@/components/Postulacion/PostulacionSteep3";
import PostulacionSteep4 from "@/components/Postulacion/PostulacionSteep4";
import PostulacionConfirmacionFinal from "@/components/Postulacion/PostulacionConfirmacionFinal";
import Layout from "@/components/Layout";
import {checkInvitationStatus, submitPostulation} from "@/api/postulationApi";

const PostulacionProceso: React.FC = () => {
    const [formData, setFormData] = useState({
        "talento": {
            "principal": {"numero": "", "texto": ""},
            "secundario": {"numero": "", "texto": ""},
            "adicional": {"numero": "", "texto": ""},
            "extras": {"numero": "", "texto": ""},
            "total": {"numero": "", "texto": ""}
        },
        "vestuario": {
            "descripcion": ""
        },
        "arte": {
            "sets": "",
            "props": "",
            "descripcion": ""
        },
        "locaciones": {
            "interior": "",
            "exterior": "",
            "cantidad": "",
            "descripcion": ""
        },
        "transporte": {
            "cliente": "",
            "produccion": "",
            "vuelos": "",
            "foraneo": "",
            "descripcion": ""
        },
        "postProduccion": {
            "edicion": {"numero": "", "cc": ""},
            "audio": {"numero": "", "cc": ""},
            "online": {"numero": "", "cc": ""},
            "masterizacion": {"numero": "", "cc": ""}
        },
        "animacion": {
            "twoD": "",
            "threeD": "",
            "vfx": "",
            "descripcion": ""
        },
        "musica": {
            "original": "",
            "soundALike": "",
            "stock": "",
            "licencia": "",
            "otro": "",
            "descripcion": ""
        },
        "locutor": {
            "institucional": "",
            "principal": "",
            "secundario": "",
            "voces": "",
            "descripcion": ""
        },
        "entregables": {
            "titulo": "",
            "duracion": "",
            "formato": "",
            "lift": "",
            "descripcion": "",
            "notas": ""
        },
        "presupuesto": {
            "total": "",
            "personal": "",
            "preYPro": "",
            "talento": "",
            "equipo": "",
            "setLocacion": "",
            "viajes": "",
            "digital": "",
            "fotoFija": "",
            "postProduccion": "",
            "markUp": ""
        },
        "bidLetter": {
            "descripcion": "",
            "fecha": "",
            "cliente": "",
            "proyecto": "",
            "version": "",
            "duracion": "",
            "notas": ""
        },
        "crew": {
            "direccion": "",
            "direccionFotografia": "",
            "produccionEjecutiva": "",
            "descripcionOpcional": "",
            "cantidadTotal": ""
        },
        "equipo": {
            "camara": "",
            "optica": "",
            "general": "",
            "especializado": "",
            "descripcionAdicional": ""
        }
    });
    const router = useRouter();
    const {projectId} = router.query;

    const [projectName, setProjectName] = useState('')
    useEffect(() => {
        if (projectId)
            checkInvitationStatus(projectId as string).then((response) => {
                if (!response) {
                    router.push('/404');
                } else {
                    setProjectName(response?.result?.project?.name)
                }
            })
    }, [projectId]);
    const [activeTab, setActiveTab] = useState<string>('1');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const [section, field] = name.split('.');
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };
    const handleSubmit = async (page: string) => {
        //e.preventDefault();
        setActiveTab(page)

        if (page == '5') {
            // enviar propuesta
            submitPostulation({projectId: projectId as string, metadata: formData}).then((response) => {
                console.log(response)
            })
        }

    };

    return (
        <Layout>
            <div className="">
                <h1 className="text-2xl font-bold mb-6 ">Proyecto</h1>
                <div className="text-sm text-gray-500 mb-8">
                    <span>Lista de Proyectos</span> {">"} <span>{projectName}</span> {">"} <span>Postular</span>
                </div>


                {activeTab === '1' && (
                    <PostulacionSteep1 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                                       activeTab={activeTab} setactiveTab={setActiveTab}/>
                )}
                {activeTab === '2' && (
                    <PostulacionSteep2 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                                       activeTab={activeTab} setactiveTab={setActiveTab}/>
                )}
                {activeTab === '3' && (
                    <PostulacionSteep3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                                       activeTab={activeTab} setactiveTab={setActiveTab}/>
                )}
                {activeTab === '4' && (
                    <PostulacionSteep4 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                                       activeTab={activeTab} setactiveTab={setActiveTab}/>
                )}

                {activeTab === '5' && (
                    <PostulacionConfirmacionFinal/>
                )}


            </div>
        </Layout>
    )
};

export default PostulacionProceso;
