import { ICompany } from "@/interfaces/company.interface";
import { IDirector } from "@/interfaces/director.interface";
import { IProject } from "@/interfaces/project.interface";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {CheckProjectInvitationStatusResponse} from "@/interfaces/project-director.interface";
import ApiService from "@/lib/api";
import {manageLogicError} from "@/lib/utils";

export interface IPostulationData{
    project: IProject;
    director: IDirector;
    productionHouse: ICompany;
}
export class CreatePostulationDto {
    projectId: string;
    metadata: Record<string, any>;
}

export const decodeInvitationToken = async (token: string) => {
    try {
        const response = await api.get(`/project-director/decode-token?token=${token}`);
        return {
            message: 'Token decoded successfully',
            result: response.data?.result as IPostulationData,
        };
    } catch (error: any) {
        if (error.response?.status === 400) {
            toast.error(error?.response?.data?.message || 'Token inválido o expirado');
        }else{

            toast.error('Token inválido o expirado');
        }

        return null
    }
};

export const getInvitationById = async (projectInvitationId: string) => {
    try {
        const response = await api.get(`/project-director/invitation/${projectInvitationId}`);
        return response.data as CheckProjectInvitationStatusResponse;
    } catch (error: any) {
        manageLogicError(error);
        return null;
    }
}

export const checkInvitationStatus = async (projectId:string)=>{
        const response = await api.get(`/project-director/check-invitation-status/${projectId}`);
        return response.data as CheckProjectInvitationStatusResponse;
}
export const checkInvitationStatusDirect = async (projectId:string)=>{
        const response = await api.get(`/project-director/check-invitation-status-direct/${projectId}`);
        return response.data as CheckProjectInvitationStatusResponse;
}

export const submitPostulation = async (postulation: CreatePostulationDto) => {
  try {
    const response = await ApiService.post('/postulation/submit', postulation);
    toast.success('The postulation has been successfully submitted.');
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      toast.error('Bad Request');
    } else {
      toast.error('An error occurred while submitting the postulation.');
    }
    return null;
  }
};