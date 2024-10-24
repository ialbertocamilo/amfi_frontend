import React, {useEffect, useState} from 'react';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import {FaBars} from 'react-icons/fa';
import AddDirectorModal from '@/components/AddDirectorModal ';
import {Director} from '@/entities/Director';
import {getAllDirectors} from "@/api/directorApi";
import PaginatedComponent from "@/components/PaginationComponent";
import moment from "moment";

const Directores = () => {
    const [indexId, setIndexId] = useState('');
    const [directors, setDirectors] = useState<Director[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDirector, setCurrentDirector] = useState<Director | null>(null);


    const headers = [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Nombre director'},
        {key: 'nationality', label: 'Nacionalidad'},
        {key: 'isMexicanResident', label: 'Residente'},
        {key: 'createdAt', label: 'Fecha Registro'},
        {key: 'representation', label: 'Representación'}
    ]


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


useEffect(() => {
    const fetchDirectors = async () => {
        try {
            const directorsData = await getAllDirectors();
            const transformedData = directorsData.map((director: Director) => ({
                ...director,
                representation: director.representation === 'freelance' ? 'Freelance' :
                    director.representation === 'co-represented' ? 'Co-representado' :
                        director.representation === 'represented' ? 'Representado' : director.representation,
                isMexicanResident: director.isMexicanResident ? 'Sí' : 'No',
                createdAt: moment(director.createdAt).format('DD/MM/YYYY'),
            }));
            setDirectors(transformedData);
        } catch (error) {
            console.error('Error fetching directors:', error);
        }
    };

    fetchDirectors();
}, []);
    const handleUpdateDirector = (updatedDirector: Director) => {

        setDirectors(directors.map((director, index) => index.toString() == indexId ? updatedDirector : director));
        setIsModalOpen(false);
    };


    return (
        <div className="flex  bg-gray-100">
            <div
                className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
                <Sidebar/>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button
                        className="p-2 focus:outline-none focus:bg-gray-200 z-40"
                        onClick={toggleSidebar}
                    >
                        <FaBars className="w-6 h-6"/>
                    </button>
                    <Navbar/>
                </div>
                <main className="flex-1 p-6">
                    <div className="p-8 bg-gray-50 min-h-screen">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Directores</h1>
                            <button className="bg-red-500 text-white py-2 px-4 rounded"
                                    onClick={() => setIsModalOpen(true)}>+
                                Nuevo director
                            </button>
                        </div>

                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Filtrar tabla..."
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded">Ver</button>
                        </div>

                        <div className="bg-white shadow-md rounded">
                            <PaginatedComponent headers={headers} items={directors} itemsPerPage={10}/>
                        </div>
                    </div>
                </main>
            </div>

            {isModalOpen && (
                <AddDirectorModal
                    onAdd={null}
                    director={currentDirector}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateDirector}
                />
            )}

        </div>


    );
};

export default Directores;
