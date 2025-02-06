import ApiService from "@/lib/api";
import toast from "react-hot-toast";
import { ICheckMaxUsersResponse} from "@/interfaces/company.interface";


const createCompanyUser = async (type: string, data: {
    companyName: string, legalName: string, name: string, lastName: string, jobTitle: string,
    email: string, password: string
}) => {

    try {
        const response = await ApiService.post(`/company/${type}`, {
            "comercialName": data.companyName,
            "legalName": data.legalName,
            "name": data.name,
            "lastname": data.lastName,
            "jobPosition": data.jobTitle,
            "email": 
      data.email,
            "password": data.password
        });
        return response.data;
    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.response) {
            if (error.response.status === 400) {
                error.response.data.message.forEach((value: any) => toast.error(value));
            } else if (error.response.status === 409) {
                toast.error(error.response.data.clientMessage);
            } else {
                toast.error('An unexpected error occurred');
            }
        } else {
            toast.error('Network error or server is not responding');
        }
        return null;
    }
}

export const checkMaxUsers = async () => {

    try {
        const response = await ApiService.get(`/company/logged/max-users`)
        return response.data as ICheckMaxUsersResponse
    } catch (error) {
        if (error?.response) {
            if (error.response.status === 400) {
                error.response.data.message.forEach((value: any) => toast.error(value));
            } else if (error.response.status === 409) {
                toast.error(error.response.data.clientMessage);
            } else {
                toast.error('An unexpected error occurred');
            }
        } else {
            toast.error('Network error or server is not responding');
        }
        return null;
    }
}
export const getInfoUsers = async () => {

    try {
        const response = await ApiService.get(`/company/logged/info-users`)
        return response.data as ICheckMaxUsersResponse
    } catch (error) {
        if (error?.response) {
            if (error.response.status === 400) {
                error.response.data.message.forEach((value: any) => toast.error(value));
            } else if (error.response.status === 409) {
                toast.error(error.response.data.clientMessage);
            } else {
                toast.error('An unexpected error occurred');
            }
        } else {
            toast.error('Network error or server is not responding');
        }
        return null;
    }
}

export const getAdvertisersWithOwners = async (search: string) => {
    try {
        const response = await ApiService.post(`/company/advertisers/search`, { search });
        return response.data;
    } catch (error) {
        if (error?.response) {
            if (error.response.status === 400) {
                error.response.data.message.forEach((value: any) => toast.error(value));
            } else if (error.response.status === 409) {
                toast.error(error.response.data.clientMessage);
            } else {
                toast.error('An unexpected error occurred');
            }
        } else {
            toast.error('Network error or server is not responding');
        }
        return null;
    }
}

export const getAgenciesWithOwners = async (search: string) => {
    try {
        const response = await ApiService.post(`/company/agencies/search`, { search });
        return response.data;
    } catch (error) {
        if (error?.response) {
            if (error.response.status === 400) {
                error.response.data.message.forEach((value: any) => toast.error(value));
            } else if (error.response.status === 409) {
                toast.error(error.response.data.clientMessage);
            } else {
                toast.error('An unexpected error occurred');
            }
        } else {
            toast.error('Network error or server is not responding');
        }
        return null;
    }
}
export default createCompanyUser;

