import { checkInvitationStatusDirect, IPostulationData } from "@/api/postulationApi";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProjectPostulationInvitationDetails from "@/components/Postulacion/ProjectPostulationInvitationDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./globals.css";

const PostulacionDirecta: React.FC = () => {

    const router = useRouter();
    const { projectInvitationId } = router.query;

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IPostulationData>();
    useEffect(() => {
        if (projectInvitationId) {
            setLoading(true)
            checkInvitationStatusDirect(projectInvitationId as string).then((res) => {
                if (res?.result) {
                    setData(res.result);
                }
            }).catch((err) => {
                toast.error('Error al cargar la información del proyecto')
            }).finally(() => {

                setLoading(false)
            })
        }
    }, [projectInvitationId]);

    return (
        <Layout>

            <Loader loading={loading}>
                {data && <ProjectPostulationInvitationDetails data={data} projectInvitationId={projectInvitationId as string} />}
            </Loader>
        </Layout>)
};

export default PostulacionDirecta;
