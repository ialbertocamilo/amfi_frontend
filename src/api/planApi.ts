import api from "@/lib/api";
import toast from "react-hot-toast";

export const getAllPlans = async () => {
    try {
        const response = await api.get('/plans');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Error obteniendo los planes, consulte con soporte.');
        return null;
    }
};
export const getActivePlans = async () => {
    try {
        const response = await api.get('/plans/active');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Error obteniendo los planes, consulte con soporte.');
        return null;
    }
};

export const getPlanById = async (id: string) => {
    try {
        const response = await api.get(`/plans/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Error obteniendo el plan, consulte con soporte.');
        return null;
    }
};

export const createPlan = async (plan: { name: string; description: string; price: number }) => {
    try {
        const response = await api.post('/plans', plan);
        toast.success('Plan creado exitosamente.');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Error creando el plan, consulte con soporte.');
        return null;
    }
};

export const updatePlan = async (id: string, plan: { name?: string; description?: string; price?: number }) => {
    if (!id) toast.error('No se puede actualizar el plan')
    try {
        const response = await api.put(`/plans/${id}`, plan);
        toast.success('Plan actualizado exitosamente.');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Error actualizando el plan, consulte con soporte.');
        return null;
    }
};

export const deletePlan = async (id: string) => {
    try {
        await api.delete(`/plans/${id}`);
        toast.success('Plan eliminado exitosamente.');
    } catch (error) {
        console.error(error);
        toast.error('Error eliminando el plan, consulte con soporte.');
    }
};