import api from "@/lib/api";

export const getProductoras = async () => {
    try {
        const response = await api.get('/company/type/production-studio');
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || 'Error fetching directors data');
    }
};

export const sendReminderToProductionHouses = async (projectId: string) => {
    try {
        const response = await api.post(`/project-director/send-reminder/${projectId}`);
        return response.data;
    } catch (error: any) {
        console.warn('sendReminderToProductionHouses error', error);
        return null
    }
};