import Evaluacion from "@/components/DetalleProyecto/Evaluacion";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import Breadcrumb from "@/components/Proyecto/ProjectBreadcrumb";

const EvaluacionPage = () => {
  const [creativeProposalPercentage, setCreativeProposalPercentage] =
    useState(0);

  const router = useRouter();
  const projectInvitationId = router.query?.projectInvitationId as string;

  return (
    <Layout>
      <Breadcrumb />
      <Evaluacion
        projectInvitationId={projectInvitationId}
        creativeProposalPercentage={creativeProposalPercentage}
        setCreativeProposalPercentage={setCreativeProposalPercentage}
      ></Evaluacion>
    </Layout>
  );
};

export default EvaluacionPage;
