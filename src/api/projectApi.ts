import { api } from "@/lib/api";

export const getProjects = async () => {
    try {
        const response = await api.get(`/project`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching projects data');
    }
};