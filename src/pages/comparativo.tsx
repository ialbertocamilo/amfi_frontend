import { getEvaluationComparison } from "@/api/projectApi";
import Comparacion, {
  EvaluationScore,
} from "@/components/DetalleProyecto/Comparacion";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProjectBreadcrumb from "@/components/Proyecto/ProjectBreadcrumb";
import { ICompany } from "@/interfaces/company.interface";
import { calculateBudgetScore, calculateEvaluationScore } from "@/lib/utils";
import { useProjectContext } from "@/providers/project.context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ComparativoPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState<
    EvaluationScore[] | null
  >(null);
  const router = useRouter();
  const { projectId } = router.query;
  const setProject = useProjectContext()?.setProject;
  const project = useProjectContext()?.project;
  const [selectedProductionHouse, setSelectedProductionHouse] = useState<ICompany>();
  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getEvaluationComparison(projectId as string)
        .then((data) => {
          console.log(data)
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
  }, [projectId]);

  return (
    <Layout>
      <Loader loading={loading}>
        <ProjectBreadcrumb />
        {evaluationScore && project  && <Comparacion data={evaluationScore} projectStatus={project.status} productionHouseWinner={selectedProductionHouse} />}
      </Loader>
    </Layout>
  );
};

export default ComparativoPage;