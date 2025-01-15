import { decodeInvitationToken, IPostulationData } from "@/api/postulationApi";
import Loader from "@/components/Loader";
import ProjectPostulationInvitationDetails from "@/components/Postulacion/ProjectPostulationInvitationDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "./globals.css";

const Postulacion: React.FC = () => {
    const router = useRouter();
    const { token } = router.query;
    const [postulationData, setPostulationData] = useState<IPostulationData|null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (token) {
            setLoading(true)
            decodeInvitationToken(token as string).then((response) => {
                if (response) {
                    setPostulationData(response?.result);
                }
            })
            setLoading(false)
            
        }
    }, [token]);

    return (
        <Loader loading={loading}>
        <div>
            {!postulationData ? (
                <div className="flex items-center justify-center h-full">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> No se puede postular a este proyecto.</span>
                    </div>
                </div>

            ) : (
                <ProjectPostulationInvitationDetails
                    data={postulationData}
                    token={token as string}
                />
            )}


        </div></Loader>
    )
};

export default Postulacion;
