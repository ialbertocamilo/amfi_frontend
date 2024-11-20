import { storageConstants } from "@/constants";
import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

class ApiService {
    private static instance: AxiosInstance | null = null;

    private constructor() { }

    public static getInstance(): AxiosInstance {
        if (typeof window === 'undefined') {
            throw new Error("ApiService should only be used in the client-side");
        }

        if (!ApiService.instance) {
            const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;
            const token = localStorage.getItem(storageConstants.token) || '';

            ApiService.instance = axios.create({
                baseURL: url,
                timeout: 10000,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ApiService.instance.interceptors.response.use(
                (response) => response,
                (error) => {
                    if (error?.code === "ERR_NETWORK") {
                        toast.error('Ocurrió un error al establecer conexión con el servidor, intente nuevamente.');
                    } else if (error?.response?.status === 500) {
                        toast.error('Ocurrió un error no controlado, comuníquese con soporte.');
                    } else if (error?.response?.status === 401) {
                        toast.error('Sesión expirada, por favor inicie sesión nuevamente.');
                        location.href = "/login";
                    }
                    return Promise.reject(error);
                },
            );
        }

        return ApiService.instance;
    }

    public static updateToken(token: string) {
        if (ApiService.instance && token) {
            ApiService.instance.defaults.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    public static async get(url: string, config = {}) {
        const api = ApiService.getInstance();
        return api.get(url, config);
    }

    public static async post(url: string, data?: any, config = {}) {
        const api = ApiService.getInstance();
        return api.post(url, data, config);
    }

    public static async put(url: string, data: any, config = {}) {
        const api = ApiService.getInstance();
        return api.put(url, data, config);
    }

    public static async patch(url: string, data: any, config = {}) {
        const api = ApiService.getInstance();
        return api.patch(url, data, config);
    }

    public static async delete(url: string, config = {}) {
        const api = ApiService.getInstance();
        return api.delete(url, config);
    }
}

export default ApiService;
