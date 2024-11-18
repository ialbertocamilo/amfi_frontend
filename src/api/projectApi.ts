import ApiService from "@/lib/api";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import moment from 'moment';
import { InvitedDirectorsResponse } from "./interface/api.interface";

export const getProjects = async () => {
    try {
        const response = await ApiService.get(`/project`);
        return response.data;
    } catch (error: any) {
        console.warn('Error fetching projects :', error);
        return null;
    }
};

export const getProjectById = async (id: string) => {
    try {
        const response = await ApiService.get(`/project/${id}`);
        return response.data;
    } catch (error: any) {
        console.warn('Error fetching project by id:', error);
        return null;
    }
};

export const updateProjectById = async (id: string, projectData: UpdateProjectDto) => {
    try {
        const response = await ApiService.patch(`/project/${id}`, projectData);
        return response.data;
    } catch (error: any) {
        console.warn('Error updating project by id:', error);
        return null;
    }
};

export const createProject = async (projectData: CreateProjectDto) => {
    try {
        const response = await ApiService.post(`/project`, projectData);
        return response.data;
    } catch (error: any) {
        console.warn('Error creating project:', error);
        return null;
    }
};

export const getProjectBids = async () => {
    try {
        const response = await ApiService.get('/project/bids');
        return response.data.map((row: any) => ({
            ...row,
            bidDate: row.bidDate ? moment(row.bidDate).format('DD/MM/YYYY, HH:mm') : 'N/A'
        })) as any[];
    } catch (err: any) {
        console.warn('Error fetching project bids:', err.message || 'Unknown error');
        return null;
    }
};


export const addDirectorsToProject = async (data: { projectId: string, directorId: string, productionHouseId: string }[]) => {
    console.log('Adding directors to project:', data);
    try {
        const response = await ApiService.post(`/project-director/add`, data);
        return [false, response.data];
    } catch (error: any) {
        console.warn('Error adding directors to project:', error);
        return [true, error.response?.data.message || 'Error adding directors to project']
    }
}


export const confirmInvitation = async (token: string) => {
    try {
        const response = await ApiService.post(`/project-director/accept-invitation`, { token });
        return response.data;
    } catch (error: any) {
        console.warn('Error confirming invitation:', error);
        return null;
    }
};


export const updateProjectStatus = async (projectId: string, status: string) => {
    try {
        const response = await ApiService.patch(`/project/${projectId}/status`, { status });
        return response.data;
    } catch (error: any) {
        console.warn('Error updating project status:', error);
        return null;
    }
};

export const getInvitationsByProjectId = async (
    projectId: string
  ): Promise<InvitedDirectorsResponse | null> => {
    try {
      const response = await ApiService.post(
        `/project-director/get-invited/${projectId}`,{}
      );
      return response.data;
    } catch (error: any) {
      console.warn("Error updating project status:", error);
      return null;
    }
  };

