import { api } from "@/lib/api";
import toast from "react-hot-toast";

export const verifyPayment = async (orderId: string) => {
    if (!orderId) return
    try {
        const response = await api.post('/payment/verify-payment', { orderId });
        return response.data;
    } catch (error) {
        console.error(error)
        toast.error('Error verificando el pago, consulte con soporte.')
        return null

    }
};