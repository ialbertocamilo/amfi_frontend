import React, {useEffect, useState} from 'react';
import "./globals.css";
import {useRouter} from 'next/router';
import {toast} from "react-hot-toast";
import {checkToken, createNewPassword} from "@/api/authenticationApi";

const NewUserPage = () => {
    const [status, setStatus] = useState(0);
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {token} = router.query;
    useEffect(() => {
        if (token) {
        }
    }, [token]);

    const [show, setShow] = useState(true)

    const redirect = () => router.push('/');
    const handleChangePassword = async () => {
        if (!token) {
            setShow(false)
            setStatus(2)
            toast.error('Token inválido');
        }
        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            checkToken(token as string).then((data: { content: { token: string, status: boolean } }) => {
                if (data?.content?.status){
                    toast.success('Contraseña cambiada exitosamente');
                    setShow(false)
                    setStatus(1)
                    createNewPassword(token as string, newPassword).then((data) => {
                        console.log(data)
                    })
                }else{
                    setShow(false)
                    setStatus(2)
                }
            })
        } catch (error: any) {
            toast.error(error?.response?.data?.clientMessage ?? 'Error al cambiar la contraseña');
        }
    };

    const CheckTokenMessage = () => {
        switch (status) {
            case 0:
                break;
            case 1:
                return (
                    <div className="flex flex-col items-center justify-center mt-6">
                        <img src="/IconSuccess.png" alt="Success" className="w-16 h-16 mb-4"/>
                        <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 text-center">Usuario creado
                            correctamente</h1>
                        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={redirect}>
                            Ir a inicio
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col items-center justify-center mt-6">
                        <img src="/error.png" alt="Error" className="w-16 h-16 mb-4"/>
                        <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 text-center">Token inválido</h1>
                        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={redirect}>
                            Ir a inicio
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

                {show && <div><h1 className="text-3xl font-bold mb-6 text-center">Crear Contraseña</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nueva Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-red-500 text-white py-2 rounded"
                        onClick={handleChangePassword}
                    >
                        Cambiar Contraseña
                    </button>
                </div>}

                <CheckTokenMessage/>
            </div>
        </div>
    );
};

export default NewUserPage;