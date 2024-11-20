import {CreateDirectorDto} from "@/dto/create-director.dto";
import { ProjectDirectorInvited } from "@/interfaces/project-director.interface";
import api from "@/lib/api";


export const getAllDirectors = async () => {
    try {
        const response = await api.get(`/director`);
        return response.data;
    } catch (error: any) {
        console.warn(error?.response?.data?.message || 'Error creating director');
        return []
    }
};

export const createDirector = async (dto: CreateDirectorDto) => {
    const response = await api.post(`/director`, dto);
    return response.data;
};



export const getDirector = async (id: string) => {
    try {
        const response = await api.get(`/director/${id}`);
        return {...response?.data?.content?.director, representation: response?.data?.content?.representation};
    } catch
        (error: any) {
        console.warn(error?.response?.data?.message || 'Error fetching director');
        return null;
    }
}

export const deleteDirector = async (id: string) => {
    try {
        const response = await api.delete(`/director/${id}`);
        return response.data;
    } catch (error: any) {
        console.warn(error?.response?.data?.message || 'Error deleting director');
        return null;
    }
};

export const getInvitedDirectors = async (projectId: string) => {
    console.log('GetInvitedDirectors')
    try {
        const response = await api.post(`/project-director/get-invited/${projectId}`);
        console.log(response.data)
        return response.data?.result as ProjectDirectorInvited[];
    } catch (error: any) {
        console.warn(error?.response?.data?.message || 'Error fetching invited directors');
        return [];
    }
};