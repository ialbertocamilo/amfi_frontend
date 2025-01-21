import api from "@/lib/api";
import toast from "react-hot-toast";


export const checkPermission = async (skill: string) => {
    console.log("checkPermission")
    try {
        const response = await api.post(`/authorization/check-permission`, {
            skill
        });
        return response.data;
    } catch (error:any) {
        toast.error(error?.response?.data?.message || 'Error when check permissions')
        return 
    }
};