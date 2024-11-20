import api from "@/lib/api";
import toast from "react-hot-toast";

export const verifyPayment = async (orderId: string, email: string, planId: string,transactionId:string) => {
    if (!orderId) return
    try {
        const response = await api.post('/payment/verify-payment', { orderId, email, planId,transactionId });
        return response.data;
    } catch (error: any) {
        console.error(error)
        toast.error('Error verificando el pago, consulte con soporte.')
        return null

    }
};