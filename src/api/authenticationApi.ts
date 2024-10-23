

import { api } from "@/lib/api";
import toast from "react-hot-toast";


export const checkToken = async (token: string) => {
    console.log("Checking token")
    if (!token) {
        throw new Error('Token is required')
    }
    try {
        const response = await api.get(`/auth/check-token`, {
            params: { token }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error when checking token');
    }
};

export const getCurrentUser = async () => {
    console.log("Getting user")
    try {
        const response = await api.get(`/auth/profile`);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Error when getting user')
        return false
    }
};