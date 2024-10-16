import {api} from "@/lib/api";

export const getProductoras = async () => {
    try {
        const response = await api.get('/company/type/production-studio');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching directors data');
    }
};