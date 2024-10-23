import React, {useState} from 'react';
import Layout from '@/components/Layout';
import {toast} from 'react-hot-toast';
import {changePassword} from "@/api/authenticationApi";
import AuthGuard from "@/components/AuthGuard";

const CambiarPassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await changePassword(currentPassword, newPassword);
            if (response.status === 200) {
                toast.success('Contraseña cambiada exitosamente');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            toast.error(error?.response?.data?.clientMessage ?? 'Error al cambiar la contraseña');
        }
    };

    return (<AuthGuard>
            <Layout>
                <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow-md">
                    <h1 className="text-2xl font-semibold mb-6">Cambiar Contraseña</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña Actual</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
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
                </div>
            </Layout></AuthGuard>);
};

export default CambiarPassword;