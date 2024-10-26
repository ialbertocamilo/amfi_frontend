import moment from 'moment';
import api from '@/lib/api';
import { UserMapper } from '@/mappers/user.mapper';

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
    } catch (error) {
        console.error("Error fetching user info:", error);
        return error
    }
};