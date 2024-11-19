import moment from 'moment';
import api from '@/lib/api';
import {UserMapper} from '@/mappers/user.mapper';

export interface User {
    id: string;
    company: string;
    name: string;
    registrationDate: string;
    type: string;
  }
  

export const fetchUserInfo = async () => {
    try {
        const response = await api.get("/user/info");
        const transformedData = response.data.map((user: User) => ({
            ...user,
            registrationDate: moment(user.registrationDate).format('DD/MM/YYYY HH:mm'),
            type: UserMapper.mapRole(user.type),
        }));
        return transformedData;
    } catch (error:any) {
        console.error("Error fetching user info:", error);
        return error
    }
};



export const getSecondaryUsers = async () => {
    try {
        const response = await api.get(`/company/logged/secondary-users`);
        return response.data.map((user: User) => ({
            ...user,
            registrationDate: moment(user.registrationDate).format('DD/MM/YYYY HH:mm'),
            type: UserMapper.mapRole(user.type),
        }));
    } catch (error: any) {
        console.error("Error fetching secondary users:", error);
        return null;
    }
};


export const getOwnerByCompany = async () => {
    try {
        const response = await api.get(`/company/logged/owner`);
        return {
            ...response.data,
            registrationDate: moment(response.data.registrationDate).format('DD/MM/YYYY HH:mm'),
            type: UserMapper.mapRole(response.data.type),
        };
    } catch (error: any) {
        console.error("Error fetching company owner:", error);
        return null;
    }
};