import { CreateDirectorDto } from "@/dto/create-director.dto";
import api from "@/lib/api";


export const getAllDirectors = async () => {
    try {
        const response = await api.get(`/director`);
        return response.data;
    } catch (error:any) {
        console.warn(error?.response?.data?.message || 'Error creating director');
        return []
    }
};

export const createDirector = async (dto:CreateDirectorDto) => {
        const response = await api.post(`/director`, dto);
        return response.data;
};