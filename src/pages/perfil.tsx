'use client'
import React, { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import Layout from "@/components/Layout";
import { UserMapper } from "@/mappers/user.mapper";
import "./globals.css";

const Perfil: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = storage('user').get();
        if (userData) {
            setUser(userData);
        } else {
            console.error("No se pudieron obtener los datos del usuario");
        }
    }, []);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6 text-center">Perfil</h1>
            <div className="mb-4">
                <p className="text-lg"><strong>Nombre:</strong> {user.name} {user.lastname}</p>
            </div>
            <div className="mb-4">
                <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="mb-4">
                <p className="text-lg"><strong>Tipo de Empresa:</strong> {UserMapper.mapCompanyType(user.company?.type)}</p>
            </div>
            <div className="mb-4">
                <p className="text-lg"><strong>Rol:</strong> {UserMapper.mapRole(user.role)}</p>
            </div>
        </Layout>
    );
};

export default Perfil;