import React, {useEffect, useState} from 'react';
import {storage} from '@/lib/storage';
import "./globals.css";
import Layout from "@/components/Layout";
import {UserMapper} from "@/mappers/user.mapper";

const Perfil: React.FC = () => {
    const [user, setUser] = useState({name: '', lastname: '', email: '', company: {type: ''},role:''});

    useEffect(() => {
        const userData = storage('user').get();
        if (userData) {
            setUser(userData.user);
        }
    }, []);

    return (<div>
            <Layout>

                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Perfil</h1>
                    <div className="bg-white shadow-md rounded p-4">
                        <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Tipo de Empresa:</strong> {UserMapper.mapCompanyType(user?.company?.type)}</p>
                        <p><strong>Rol:</strong> {UserMapper.mapRole(user?.role)}</p>
                    </div>
                </div>
            </Layout>
        </div>);
};

export default Perfil;