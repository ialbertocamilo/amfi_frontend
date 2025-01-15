'use client'
import Layout from "@/components/Layout";
import { storage } from '@/lib/storage';
import { UserMapper } from "@/mappers/user.mapper";
import React, { useEffect, useState } from 'react';
import "./globals.css";
import { IUser } from "@/interfaces/user.interface";

const Perfil: React.FC = () => {
    const [user, setUser] = useState<IUser>();

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
        <div className="grid md:grid-cols-2 gap-8">
            {/* Datos Personales */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Datos Personales</h2>
                <div className="space-y-4">
                    <p className="text-md"><strong>Nombre:</strong> {user.name} {user.lastname}</p>
                    <p className="text-md"><strong>Email:</strong> {user.email}</p>
                    <p className="text-md"><strong>Rol:</strong> {UserMapper.mapRole(user.role)}</p>
                </div>
            </div>

            {/* Datos de la Empresa */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Datos de la Empresa</h3>
                <div className="space-y-4">
                    <p className="text-md"><strong>Nombre de la Empresa:</strong> {user.company?.name || 'No especificado'}</p>
                    <p className="text-md"><strong>Nombre Legal:</strong> {user.company?.legalName || 'No especificado'}</p>
                    <p className="text-md"><strong>Tipo de Empresa:</strong> {UserMapper.mapCompanyType(user.company?.type as string)}</p>
                    <p className="text-md"><strong>RFC:</strong> {user.company?.nationalIdentifierOrRFC || 'No especificado'}</p>
    
                </div>
            </div>
        </div>
    </Layout>
    );
};

export default Perfil;