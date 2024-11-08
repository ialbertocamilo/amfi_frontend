import { storageConstants } from "@/constants";
import api from "@/lib/api";
import { storage } from "@/lib/storage";
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
    } catch (error:any) {
        toast.error(error?.response?.data?.message || 'Error when checking token')
        return 
    }
};


export const getCurrentUser = async () => {
    console.log("Getting user")
    try {
        const response = await api.get(`/auth/profile`);
        return response.data;
    } catch (error:any) {
        toast.error(error?.response?.data?.message || 'Error when getting user')
        location.href='/login'
        return false
    }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    return await api.post(`/auth/update-password`, {
            currentPassword,
            newPassword,
        });
};

export const signOut = async () => {
    try {
        await api.post(`/auth/logout`);
        storage(storageConstants.user).removeItem();
        storage(storageConstants.token).removeItem();
    } catch (error:any) {
        toast.error(error?.response?.data?.message || 'Error when logging out');
    }
};