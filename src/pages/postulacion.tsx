import {decodeInvitationToken, IPostulationData} from "@/api/postulationApi";
import ProjectInfo from "@/components/Postulacion/ProjectInfo";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import "./globals.css";

const Postulacion: React.FC = () => {
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
    const {token} = router.query;
    const [postulationData, setPostulationData] = useState<IPostulationData>();
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
        if (token) {
            decodeInvitationToken(token as string).then((response) => {
                if (response) {
                    setPostulationData(response.result);
                }
            })
        }
    }, [token]);


    return (
        <div>
            {message && <p>{message}</p>}
            {!postulationData ? (
                <div className="flex items-center justify-center h-full">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                         role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> No se puede postular a este proyecto.</span>
                    </div>
                </div>

            ) : (
                <ProjectInfo data={postulationData}/>
            )}


        </div>
    )
};

export default Postulacion;
