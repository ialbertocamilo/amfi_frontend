import {api} from "@/lib/api";


export const getAllDirectors = async () => {
    try {
        const response = await api.get(`/director`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching directors data');
    }
};