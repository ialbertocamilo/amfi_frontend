import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { storage } from '@/lib/storage';
import { storageConstants } from '@/constants';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const user = storage(storageConstants.user).get();
        if (!user) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
};

export default AuthGuard;