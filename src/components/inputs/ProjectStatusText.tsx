import React from "react";
import { FileText, Play, Pause, Square, CheckCircle } from "lucide-react";
import { ProjectMapper, ProjectStatus } from "@/mappers/project.mapper";

interface ProjectStatusTextProps {
  status?: ProjectStatus;
  className?: string;
}

export const ProjectStatusText: React.FC<ProjectStatusTextProps> = ({
  status = ProjectStatus.Draft,
  className = "",
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case ProjectStatus.Draft:
        return <FileText className="h-4 w-4 text-gray-500" />;
      case ProjectStatus.InProgress:
        return <Play className="h-4 w-4 text-green-500" />;
      case ProjectStatus.Paused:
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case ProjectStatus.Closed:
        return <Square className="h-4 w-4 text-red-500" />;
      case ProjectStatus.Finished:
        return <CheckCircle className="h-4 w-4 text-teal-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span>{ProjectMapper.mapProjectStatus(status)}</span>
      {getStatusIcon()}
    </div>
  );
};

export default ProjectStatusText;
