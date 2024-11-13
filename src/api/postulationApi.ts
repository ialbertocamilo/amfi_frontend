import { ICompany } from "@/interfaces/company.interface";
import { IDirector } from "@/interfaces/director.interface";
import { IProject } from "@/interfaces/project.interface";
import api from "@/lib/api";
import toast from "react-hot-toast";

export interface IPostulationData{
    project: IProject;
    director: IDirector;
    productionHouse: ICompany;
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