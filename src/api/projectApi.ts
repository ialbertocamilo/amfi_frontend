import { EvaluationScore } from "@/components/DetalleProyecto/Comparacion";
import { IProjectInvitation } from "@/interfaces/project-director.interface";
import { IProject } from "@/interfaces/project.interface";
import ApiService from "@/lib/api";
import moment from "moment";
import toast from "react-hot-toast";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import {
  Budget,
  Evaluation,
  InvitedDirectorsResponse,
} from "./interface/api.interface";

export const getProjects = async () => {
  try {
    const response = await ApiService.get(`/project`);
    return response.data;
  } catch (error: any) {
    console.warn("Error fetching projects :", error);
    return null;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await ApiService.get(`/project/${id}`);
    return response.data as IProject;
  } catch (error: any) {
    console.warn("Error fetching project by id:", error);
    return null;
  }
};

export const updateProjectById = async (
  id: string,
  projectData: UpdateProjectDto,
) => {
  try {
    const response = await ApiService.patch(`/project/${id}`, projectData);
    return response.data;
  } catch (error: any) {
    console.warn("Error updating project by id:", error);
    return null;
  }
};

export const createProject = async (projectData: CreateProjectDto) => {
  try {
    const response = await ApiService.post(`/project`, projectData);
    return response.data;
  } catch (error: any) {
    console.warn(
      "Error creating project:",
      error?.response?.data?.message || "Error al crear el proyecto",
    );

    throw error;
  }
};

export const getProjectBids = async () => {
  try {
    const response = await ApiService.get("/project/bids");
    return response.data.map((row: any) => ({
      ...row,
      bidDate: row.bidDate
        ? moment(row.bidDate).format("DD/MM/YYYY")
        : "N/A",
    })) as any[];
  } catch (err: any) {
    console.warn(
      "Error fetching project bids:",
      err.message || "Unknown error",
    );
    return null;
  }
};

export const addDirectorsToProject = async (
  data: { projectId: string; directorId: string; productionHouseId: string }[],
) => {
  console.log("Adding directors to project:", data);
  try {
    const response = await ApiService.post(`/project-director/add`, data);
    return [false, response.data];
  } catch (error: any) {
    console.warn("Error adding directors to project:", error);
    return [
      true,
      error.response?.data.message || "Error adding directors to project",
    ];
  }
};

export const updateProjectStatus = async (
  projectId: string,
  status: string,
) => {
  try {
    const response = await ApiService.patch(`/project/${projectId}/status`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    console.warn("Error updating project status:", error);
    return null;
  }
};

export const getInvitationsByProjectId = async (
  projectId: string,
): Promise<InvitedDirectorsResponse | null> => {
  console.log("getInvitationsByProjectId");
  try {
    const response = await ApiService.post(
      `/project-director/get-invited/${projectId}`,
    );
    return response.data;
  } catch (error: any) {
    console.warn("Error updating project status:", error);
    return null;
  }
};

export const getBidEvaluation = async (
  projectInvitationId: string,
): Promise<{
  message: string;
  result: {
    evaluation: Evaluation;
    budget: Budget;
    creativeProposalWeight: number;
    baselineBudget: number;
    project: IProject;
  };
} | null> => {
  console.log("getBidEvaluation");
  try {
    const response = await ApiService.get(
      `/project-director/get-evaluation/${projectInvitationId}`,
    );
    console.log('response.data', response.data)
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 409) {
      toast.error(error.response?.data?.clientMessage || 'Error conflicto encontrado');
    } else {
      toast.error('No puedes acceder a la evaluación');
    }
    console.warn("Error obtaining project status:", error);
    return null;
  }
};

export const updateBidEvaluation = async (
  bidId: string,
  evaluation: Evaluation & {
    creativeProposalWeight?: number;
  },
): Promise<{ message: string } | null> => {
  console.log("updateBidEvaluation");
  try {
    const response = await ApiService.patch(
      `/project-director/update-evaluation/${bidId}`,
      evaluation,
    );
    return response.data;
  } catch (error: any) {
    console.warn("Error updating project status:", error);
    return null;
  }
};

export const getProductionHouseProjects = async () => {
  const response = await ApiService.get(`/project`);
  return response?.data as IProjectInvitation[];
};

export const getEvaluationScore = async (projectInvitationId: string) => {
  console.log("getEvaluationScore", projectInvitationId);
  const response = await ApiService.get(
    `/get-evaluation/${projectInvitationId}`,
  );
  return response.data as EvaluationScore[];
};

export const getEvaluationComparison = async (projectId: string) => {
  console.log("getEvaluationComparison", projectId);
  const response = await ApiService.get(
    `/project-director/get-comparison/${projectId}`,
  );
  return response.data.result as {
    comparison: IProjectInvitation[];
    project: IProject;
  };
};
export const assignProductionHouse = async (
  projectId: string,
  productionHouseId: string,
) => {
  try {
    const response = await ApiService.post(
      `/project/${projectId}/assign-production-house`,
      {
        productionHouseId,
      },
    );
    return response.data as { comparison: any[], project: IProject };
  } catch (error: any) {
    console.warn("Error assigning production house:", error);
    return null;
  }
};