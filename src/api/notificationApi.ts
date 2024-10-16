import {api} from "@/lib/api";
import {toast} from "react-hot-toast";

export const sendInvitationEmail = async (object: { email: string, name: string }) => {
    try {
        const response = await api.post('/notification/invite-user', object);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.clientMessage || 'Error sending invitation email');
        return null
    }
};