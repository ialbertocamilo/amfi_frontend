

import {api} from "@/lib/api";


export const checkToken = async (token:string) => {
    console.log("Checking token")
    if (!token) {
        throw new Error('Token is required')}
    try {
        const response = await api.get(`/auth/check-token`,{
            params: {token}
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error when checking token');
    }
};