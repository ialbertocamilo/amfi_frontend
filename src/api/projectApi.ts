import { api } from "@/lib/api";
import { CreateProjectDto } from "../../dto/create-project.dto";
import { UpdateProjectDto } from "../../dto/update-project.dto";

export const getProjects = async () => {
    try {
        const response = await api.get(`/project`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching projects data');
    }
};

export const getProjectById = async (id: string) => {
    try {
        const response = await api.get(`/project/${id}`);
        return response.data;
    } catch (error) {
        console.warn('Error fetching project by id:', error);
        return null;
    }
};

export const updateProjectById = async (id: string, projectData: UpdateProjectDto) => {
    try {
        const response = await api.patch(`/project/${id}`, projectData);
        return response.data;
    } catch (error) {
        console.warn('Error updating project by id:', error);
        return null;
    }
};

export const createProject = async (projectData: CreateProjectDto) => {
    try {
        const response = await api.post(`/project`, projectData);
        return response.data;
    } catch (error) {
        console.warn('Error creating project:', error);
        return null;
    }
};