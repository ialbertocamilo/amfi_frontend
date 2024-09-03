import axios from "axios";
import { storage } from "@/lib/storage";
import {storageConstants} from "@/constants";

export function ApiInstance() {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;
  const token = storage(storageConstants.token);
  console.log(url)
  const instance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token.get()}`,
    },
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
}

export const api = ApiInstance();