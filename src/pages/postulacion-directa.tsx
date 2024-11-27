import {checkInvitationStatusDirect, IPostulationData} from "@/api/postulationApi";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import "./globals.css";
import ProjectInfo from "@/components/Postulacion/ProjectInfo";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import {toast} from "react-hot-toast";
import {CheckProjectInvitationStatusResponse} from "@/interfaces/project-director.interface";

const PostulacionDirecta: React.FC = () => {
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
        contactoCompras: ""
    });
    const router = useRouter();
    const {projectId} = router.query;
    const [postulationData, setPostulationData] = useState<IPostulationData>();
    const [message, setMessage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (projectId) {
            setLoading(true)
            checkInvitationStatusDirect(projectId as string).then((res) => {
                if (res?.result)
                    setPostulationData(res.result);
            }).catch((err) => {
                toast.error('Error al cargar la información del proyecto')
            }).finally(() => {

                setLoading(false)
            })
        }
    }, [projectId]);

    const onConfirm=()=>{
        console.log("on confirm")
    }
    return (<Layout>
        <Loader loading={loading}>
            <ProjectInfo data={postulationData} onConfirm={onConfirm}/>
        </Loader>
    </Layout>)
};

export default PostulacionDirecta;
