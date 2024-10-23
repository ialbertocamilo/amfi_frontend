import axios from "axios";
import { storage } from "@/lib/storage";
import { storageConstants } from "@/constants";
import toast from "react-hot-toast";
import Router from 'next/router';

export function ApiInstance() {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;
    const user = storage(storageConstants.user);
    const instance = axios.create({
        baseURL: url,
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${user.get()?.access_token}`,
        },
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                Router.push('/login');
            } else if (error?.code === "ERR_NETWORK") {
                toast.error('Ocurrió un error al establecer conexión con el servidor, intente nuevamente.');
            }
            return Promise.reject(error);
        },
    );

    return instance;
}

export const api = ApiInstance();