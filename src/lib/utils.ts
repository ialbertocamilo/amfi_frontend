import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const validateFormData = (formData: Record<string, any>, inputNames: string[]): boolean => {
    for (const name of inputNames) {
        if (!formData[name]) {
            console.warn(`Missing field: ${name}`);
            return false;
        }
    }
    return true;
};


export const formatToLocalTime = (isoDate: string): string => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const utcOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - utcOffset);
    return localDate.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};


export const manageLogicError = (err: any) => {
    if (err?.status === 400) err?.response?.data?.message?.forEach((value: any) => toast.error(value));
    if (err?.status === 409) toast.error(err?.response?.data?.clientMessage);
}