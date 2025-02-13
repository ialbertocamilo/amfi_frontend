import { getEvaluationComparison } from "@/api/projectApi";
import Comparacion, {
  EvaluationScore,
} from "@/components/DetalleProyecto/Comparacion";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { calculateBudgetScore, calculateEvaluationScore } from "@/lib/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProjectBreadcrumb from "@/components/Proyecto/ProjectBreadcrumb";
import { useProjectContext } from "@/providers/project.context";
import { ProductionStudioCompany } from "@/components/interfaces/interfaces";
import { ICompany } from "@/interfaces/company.interface";

const ComparativoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState<
    EvaluationScore[] | null
  >(null);
  const router = useRouter();
  const { projectInvitationId } = router.query;
  const setProject = useProjectContext()?.setProject;
  const project = useProjectContext()?.project;
  const [selectedProductionHouse, setSelectedProductionHouse] = useState<ICompany>();
  useEffect(() => {
    if (projectInvitationId) {
      setLoading(true);
      getEvaluationComparison(projectInvitationId as string)
        .then((data) => {
          setSelectedProductionHouse(data.project.assignedTo as ICompany);
          const evaluationData = data.comparison!.map((item) => {
            let creativeProposal = 0;
            let experience = 0;
            let budget = 0;

            if (item.evaluation) {
              const evaluationScore = calculateEvaluationScore(
                item.evaluation,
                item.project.creativeProposalWeight,
              );
              creativeProposal = evaluationScore.creativeProposal;
              experience = evaluationScore.experience;
            }
            if (item.budget) {
              const totalBudget = Object.values(item.budget).reduce(
                (acc, value) => acc + value,
                0,
              );

              const budgetScore = calculateBudgetScore(
                totalBudget,
                item.project.budget,
                item.project.creativeProposalWeight,
              );
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
          });

          setEvaluationScore(evaluationData);
          if (setProject) {
            setProject(data.project);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [projectInvitationId]);

  return (
    <Layout>
      <Loader loading={loading}>
        <ProjectBreadcrumb />
        {evaluationScore && project && selectedProductionHouse && <Comparacion data={evaluationScore} projectStatus={project.status} productionHouseWinner={selectedProductionHouse} />}
      </Loader>
    </Layout>
  );
};

export default ComparativoPage;
