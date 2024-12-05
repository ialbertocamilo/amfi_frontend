import Evaluacion from "@/components/DetalleProyecto/Evaluacion";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";

const EvaluacionPage = () => {
   
    const [creativeProposalPercentage, setCreativeProposalPercentage] = useState(0);


    const router= useRouter()
    const projectInvitationId= router.query?.projectInvitationId as string


    return (
        <Layout>
                    <Evaluacion
                        projectInvitationId={projectInvitationId}
                        creativeProposalPercentage={creativeProposalPercentage}
                        setCreativeProposalPercentage={setCreativeProposalPercentage}
                    ></Evaluacion>
        </Layout>
    );
};

export default EvaluacionPage;