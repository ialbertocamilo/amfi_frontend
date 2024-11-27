import { acceptDirectInvitation, checkInvitationStatusDirect, IPostulationData } from "@/api/postulationApi";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProjectInfo from "@/components/Postulacion/ProjectInfo";
import { manageLogicError } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./globals.css";

const PostulacionDirecta: React.FC = () => {

    const router = useRouter();
    const { projectInvitationId } = router.query;
    const [postulationData, setPostulationData] = useState<IPostulationData>();

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (projectInvitationId) {
            setLoading(true)
            checkInvitationStatusDirect(projectInvitationId as string).then((res) => {
                if (res?.result)
                    setPostulationData(res.result);
            }).catch((err) => {
                toast.error('Error al cargar la información del proyecto')
            }).finally(() => {

                setLoading(false)
            })
        }
    }, [projectInvitationId]);

    const onConfirm = async () => {
        // postulacion directa
        try {
            await acceptDirectInvitation(projectInvitationId as string)
        } catch (e) {
            manageLogicError(e)
        }
        console.log("on confirm")
    }

    const startPostulation = async () => {
        router.push(`/postulacion-proceso?projectInvitationId=${projectInvitationId}`);
    }
    return (<Layout>
        <Loader loading={loading}>
            <ProjectInfo data={postulationData} onConfirm={onConfirm} startPostulation={startPostulation} />
        </Loader>
    </Layout>)
};

export default PostulacionDirecta;
