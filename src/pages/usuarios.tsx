import React, { useEffect, useState } from 'react';
import "./globals.css";
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';
import PaginatedComponent from '@/components/PaginationComponent';
import { api } from "@/lib/api";

interface User {
    id: string;
    company: string;
    name: string;
    registrationDate: string;
    type: string;
}

const Usuarios = () => {
    const headers = [
        { key: 'id', label: 'ID' },
        { key: 'company', label: 'Empresa' },
        { key: 'name', label: 'Nombre' },
        { key: 'registrationDate', label: 'Fecha Registro' },
        { key: 'type', label: 'Tipo' }
    ];

    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const [data, setData] = useState<User[]>([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const crearUsuario = () => {
        router.push('/nuevo-usuario');
    };

    useEffect(() => {
        api.get('/user/info').then(response => {
            const transformedData = response.data.map((user: User) => ({
                ...user,
                type: user.type === 'owner' ? 'Titular' : user.type === 'User' ? 'Usuario' : user.type,
            }));
            setData(transformedData);
            setFilteredData(transformedData);
        });
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter(user =>
                user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.company.toLowerCase().includes(filter.toLowerCase()) ||
                user.type.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, data]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return (
        <div className="flex bg-gray-100">
            <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button
                        className="p-2 focus:outline-none focus:bg-gray-200 z-40"
                        onClick={toggleSidebar}
                    >
                        <FaBars className="w-6 h-6" />
                    </button>
                    <Navbar />
                </div>
                <main className="flex-1 p-6">
                    <div className="p-8 bg-gray-50 min-h-screen">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Usuarios</h1>
                            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={crearUsuario}>+ Nuevo usuario</button>
                        </div>

                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Filtrar por nombre, compañia, tipo"
                                className="p-2 border border-gray-300 rounded w-full"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="bg-white shadow-md rounded">
                            <PaginatedComponent headers={headers} items={filteredData} itemsPerPage={10} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Usuarios;