import {useEffect, useState} from "react";
import "./globals.css";
import {useRouter} from "next/router";
import PostulacionSteep1 from "@/components/Postulacion/PostulacionSteep1";
import PostulacionSteep2 from "@/components/Postulacion/PostulacionSteep2";
import PostulacionSteep3 from "@/components/Postulacion/PostulacionSteep3";
import PostulacionSteep4 from "@/components/Postulacion/PostulacionSteep4";
import PostulacionConfirmacionFinal from "@/components/Postulacion/PostulacionConfirmacionFinal";
import Layout from "@/components/Layout";
import {checkInvitationStatus, getInvitationById, submitPostulation} from "@/api/postulationApi";
import {manageLogicError} from "@/lib/utils";
import Loader from "@/components/Loader";
import {IProject} from "@/interfaces/project.interface";

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
    const {projectInvitationId} = router.query;

    const [loading, setLoading] = useState(false)
    const [projectName, setProjectName] = useState('')

    const [project, setProject] = useState<IProject>()
    const processCheckInvitation = async () => {
        setLoading(true)
        const data = await getInvitationById(projectInvitationId as string)
        const projectId=data?.result.project?.id as string
        setProject(data?.result.project)
        checkInvitationStatus(projectId).then((response) => {
            if (response) {
                setProjectName(response?.result?.project?.name)
            }
        }).catch((error) => {
            // Si la invitacion no fue aceptada
            if (error?.response?.data?.serverCodeError === 20) {
                router.push('/postulacion-directa?projectId=' + projectId)
            }
            manageLogicError(error);
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        if (projectInvitationId)
            processCheckInvitation()
    }, [projectInvitationId]);
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
        setActiveTab(page)

        if (page == '5') {
            submitPostulation({projectId: project?.id  as string, metadata: formData}).then((response) => {
                console.log(response)
            })
        }

    };

    return (
        <Layout>
            <Loader loading={loading}>
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


            </Loader>
        </Layout>
    )
};

export default PostulacionProceso;
