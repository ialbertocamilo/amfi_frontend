import { ICompany } from "@/interfaces/company.interface";
import { IDirector } from "@/interfaces/director.interface";
import { IProject } from "@/interfaces/project.interface";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  CheckProjectInvitationStatusResponse,
  IProjectInvitation,
} from "@/interfaces/project-director.interface";
import ApiService from "@/lib/api";
import { manageLogicError } from "@/lib/utils";
import { IInvitationResponse } from "@/interfaces/invitation.interface";
import { Budget, Evaluation } from "./interface/api.interface";
import { IPostulation } from "@/interfaces/postulation.interface";

export interface IPostulationData {
  id?: string;
  project: IProject;
  director: IDirector;
  productionHouse: ICompany;
  accepted?: boolean;
}
export class CreatePostulationDto {
  projectId: string;
  metadata: Record<string, any>;
}

export const decodeInvitationToken = async (token: string) => {
  try {
    const response = await api.get(
      `/project-director/decode-token?token=${token}`,
    );
    return {
      message: "Token decoded successfully",
      result: response.data?.result as IPostulationData,
    };
  } catch (error: any) {
    if (error.response?.status === 400) {
      toast.error(
        error?.response?.data?.message || "Token inválido o expirado",
      );
    } else {
      toast.error("Token inválido o expirado");
    }

    return null;
  }
};

export const getInvitationById = async (projectInvitationId: string) => {
  try {
    const response = await api.get(
      `/project-director/invitation/${projectInvitationId}`,
    );
    return response.data as CheckProjectInvitationStatusResponse;
  } catch (error: any) {
    manageLogicError(error);
    return null;
  }
};

export const checkInvitationStatus = async (projectId: string) => {
  const response = await api.get(
    `/project-director/check-invitation-status/${projectId}`,
  );
  return response.data as CheckProjectInvitationStatusResponse;
};
export const checkInvitationStatusDirect = async (
  projectInvitationId: string,
) => {
  const response = await api.get(
    `/project-director/check-invitation-status-direct/${projectInvitationId}`,
  );
  return response.data as CheckProjectInvitationStatusResponse;
};

export const submitPostulation = async (postulation: CreatePostulationDto) => {
  const response = await ApiService.post("/postulation/submit", postulation);
  return response.data;
};

export const acceptDirectInvitation = async (projectInvitationId: string) => {
  const response = await api.post(
    `/project-director/accept-invitation-direct`,
    { projectInvitationId },
  );
  return response.data as IInvitationResponse;
};

export const acceptInvitation = async (token: string) => {
  try {
    const response = await ApiService.post(
      `/project-director/accept-invitation`,
      { token },
    );
    return response.data as IInvitationResponse;
  } catch (error: any) {
    console.warn("Error confirming invitation:", error);
    return null;
  }
};
export const getPostulationById = async (postulationId: string) => {
  const response = await api.get(`/postulation/${postulationId}`);
  return response.data as IPostulation;
};

export const declineInvitation = async (tokenOrInvitationId: string) => {
  try {
    const response = await ApiService.post(
      `/project-director/decline-invitation`,
      { tokenOrInvitationId },
    );
    return {
      message: "Invitation declined successfully",
      result: response.data,
    };
  } catch (error: any) {
    console.warn("Error declining invitation:", error);
    return null;
  }
};
export const updateProjectInvitation = async (
  id: string,
  dto: { budget?: Budget; evaluation?: Evaluation },
) => {
  try {
    const response = await ApiService.patch(
      `/project-director/update-project-invitation/${id}`,
      dto,
    );
    return response.data;
  } catch (error: any) {
    console.warn("Error updating project invitation:", error);
    return null;
  }
};
