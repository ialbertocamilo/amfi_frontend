import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Comparacion, { EvaluationScore } from "@/components/DetalleProyecto/Comparacion";
import { getEvaluationScore } from "@/api/projectApi";

const ComparativoPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [evaluationScore, setEvaluationScore] = useState<EvaluationScore[] | null>(null);
    const router = useRouter();
    const { projectInvitationId } = router.query;

    useEffect(() => {
        if (projectInvitationId) {
            setLoading(true);
            getEvaluationScore(projectInvitationId as string).then(data=>setEvaluationScore(data)).finally(() => {setLoading(false)});
        }
    }, [projectInvitationId]);


    return (
        <Layout>
            <Loader loading={loading}>
                {evaluationScore && (
                    <Comparacion
                        data={evaluationScore}
                    />
                )}
            </Loader>
        </Layout>
    );
};

export default ComparativoPage;