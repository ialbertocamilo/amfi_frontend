import api from "@/lib/api";
import toast from "react-hot-toast";
import {storage} from "@/lib/storage";
import { storageConstants } from "@/constants";


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
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Error when logging out');
    }
};