import React, { useEffect, useState } from 'react';
import "./globals.css";
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';
import toast from "react-hot-toast";
import PaginatedComponent from "@/components/PaginationComponent";
import { getProductoras } from "@/api/productoraApi";
import moment from "moment";

const Productoras = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [productoras, setProductoras] = useState<any[]>([]);

    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Slug', key: 'slug' },
        { label: 'Nombre', key: 'name' },
        { label: 'Nombre Legal', key: 'legalName' },
        { label: 'RFC', key: 'nationalIdentifierOrRFC' },
        { label: 'Año de Fundación', key: 'foundingYear' },
        { label: 'Fecha de Creación', key: 'createdAt' },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchProductoras = async () => {
            try {
                const response = await getProductoras();

                const productorasData = response.map((productora: any) => ({
                    id: productora.id,
                    slug: productora.slug,
                    name: productora.name,
                    legalName: productora.legalName,
                    nationalIdentifierOrRFC: productora.nationalIdentifierOrRFC,
                    foundingYear: productora.foundingYear,
                    createdAt: moment(productora.createdAt).format('DD/MM/YYYY'),
                }));
                setProductoras(productorasData);
            } catch (error: any) {
                console.error("Error fetching productoras:", error);
                toast.error("Error fetching productoras");
            }
        };

        fetchProductoras();
    }, []);
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button className="p-2 focus:outline-none focus:bg-gray-200 z-40" onClick={toggleSidebar}>
                        <FaBars className="w-6 h-6" />
                    </button>
                    <Navbar />
                </div>
                <main className="flex-1 p-6">
                    <div className="p-8 bg-gray-50 min-h-screen">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Productoras</h1>
                        </div>
                        <div className="flex mb-4">
                            <input type="text" placeholder="Filtrar tabla..." className="p-2 border border-gray-300 rounded w-full" />
                            <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded">Ver</button>
                        </div>
                        <div className="bg-white shadow-md rounded">
                            <PaginatedComponent headers={headers} items={productoras} itemsPerPage={10} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Productoras;