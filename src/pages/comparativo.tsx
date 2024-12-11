import { getEvaluationComparison } from "@/api/projectApi";
import Comparacion, {
  EvaluationScore,
} from "@/components/DetalleProyecto/Comparacion";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { calculateBudgetScore, calculateEvaluationScore } from "@/lib/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ComparativoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState<
    EvaluationScore[] | null
  >(null);
  const router = useRouter();
  const { projectInvitationId } = router.query;

  useEffect(() => {
    if (projectInvitationId) {
      setLoading(true);
      getEvaluationComparison(projectInvitationId as string)
        .then((data) =>
          setEvaluationScore(
            data!.map((item) => {
              let creativeProposal = 0;
              let experience = 0;
              let budget = 0;

              if (item.evaluation) {
                const evaluationScore = calculateEvaluationScore(
                  item.evaluation,
                  item.project.creativeProposalWeight
                );
                creativeProposal = evaluationScore.creativeProposal;
                experience = evaluationScore.experience;
              }
              if (item.budget) {
                const totalBudget = Object.values(item.budget).reduce(
                  (acc, value) => acc + value,
                  0
                );

                const budgetScore = calculateBudgetScore(
                  totalBudget,
                  item.project.budget,
                  item.project.creativeProposalWeight
                );
                console.log("budgetScore", budgetScore);
                budget = budgetScore.budget;
              }

              const status =
                item.accepted === false
                  ? "Rechazado"
                  : item.proposalUploaded === true
                    ? "Completado"
                    : "Pendiente";

              return {
                id: item.productionHouse.id,
                name: item.productionHouse.name,
                evaluationScore: {
                  creativeProposal,
                  experience,
                  budget,
                },
                projectId: item.project.id,
                status,
              };
            })
          )
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [projectInvitationId]);

  return (
    <Layout>
      <Loader loading={loading}>
        {evaluationScore && <Comparacion data={evaluationScore} />}
      </Loader>
    </Layout>
  );
};

export default ComparativoPage;
