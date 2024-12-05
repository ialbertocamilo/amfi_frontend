import useUser from '@/hooks/user.hook';
import { IUser } from '@/interfaces/user.interface';
import React, { createContext, useContext, useEffect } from 'react';

interface UserContextProps {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    fetchUser: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { fetchUser, user, loading, error } = useUser()
    const excludedPaths = ['/login', '/register', '/planes', '/confirmacion'];

    useEffect(() => {
        if (!excludedPaths.includes(window.location.pathname)) {
            fetchUser();
        }
    }, [fetchUser]);


    return (
        <UserContext.Provider value={{ user, loading, error, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUserContext = () => useContext(UserContext);