import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {api} from '@/lib/api';
import './globals.css';

const VerifyEmail: React.FC = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const {token} = router.query;

        if (token) {
            const verifyToken = async () => {
                try {
                    const response = await api.get('/auth/check-token', {
                        params: {token}
                    });
                    setIsValid(response.data?.content?.status);
                } catch (error: any) {
                    console.error('Token verification error:', error);
                    toast.error('Error verifying token');
                    setIsValid(false);
                }
            };

            verifyToken();
        } else {
            setIsValid(false);
        }
    }, [router.query]);

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {isValid === null ? (<p>Verifying token...</p>) : isValid ? (
                <div className="text-center"><img src="/check.png" alt="Check" className="mx-auto mb-4 w-16 h-16"/>

                    <p className=" font-bold text-xl mb-4">Registro completado exitosamente!</p>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={handleLoginRedirect}
                    >
                        Ir a inicio de sesión
                    </button>
                </div>) : (
                <div className="text-center"><img src="/error.png" alt="Error" className="mx-auto mb-4 w-16 h-16"/>
                    <p className=" font-bold text-xl mb-4">El enlace es inválido o ha expirado</p>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={handleLoginRedirect}
                    >
                        Ir a inicio de sesión
                    </button>
                </div>)}
        </div>);
};

export default VerifyEmail;