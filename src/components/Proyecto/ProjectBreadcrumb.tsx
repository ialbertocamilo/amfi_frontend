import React from "react";
import { useRouter } from "next/router";
import { useProjectContext } from "@/providers/project.context";

const ProjectBreadcrumb: React.FC = () => {
  const router = useRouter();
  const project = useProjectContext()?.project;
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <div className="text-sm text-gray-500 mb-8">
          <span>Proyecto</span> {">"} <span>{project?.name}</span>
        </div>
      </ol>
    </nav>
  );
};

export default ProjectBreadcrumb;
