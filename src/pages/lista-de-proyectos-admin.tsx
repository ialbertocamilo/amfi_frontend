import React, {useEffect, useState} from 'react';
import "./globals.css";
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import {FaBars} from 'react-icons/fa';
import {useRouter} from 'next/router';
import toast from "react-hot-toast";
import PaginatedComponent from "@/components/PaginationComponent";
import {getProjects} from "@/api/projectApi";
import moment from "moment";

interface User {
    id: string;
    proyecto: string;
    agencia: string;
    fechaRegistro: string;
    estado: string;
    creador: string;
    correlativo: number;
}
const ProjectStatusMap: { [key: string]: string } = {
    draft: 'Borrador',
    inprogress: 'En progreso',
    revision: 'En revisión',
    finished: 'Finalizado',
    closed: 'Cerrado'
};
const ListaProyectosAdmin = () => {
    const headers = [
        {label: 'Correlativo', key: 'correlativo'},
        {label: 'ID', key: 'id'}, {label: 'Empresa', key: 'proyecto'}, {
        label: 'Nombre',
        key: 'agencia'
    }, {label: 'Fecha registro', key: 'fechaRegistro'}, {label: 'Creador', key: 'creador'}, {
        label: 'Estado',
        key: 'estado'
    },]


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = (id: string) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const router = useRouter();

    const handleEdit = (projectId: string) => {
        router.push(`/nuevo-proyecto?id=${projectId}`);
    };

    const verDetalle = () => {
        router.push('/detalle-proyecto');
    };
    const crearProyecto = () => {
        router.push('/nuevo-proyecto');
    };
    const [filter, setFilter] = useState('');


    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects()
                const projectsData = response.map((proyecto: any, index: number) => ({
                    correlativo: index + 1,
                    id: proyecto.id,
                    proyecto: proyecto.name,
                    agencia: proyecto.agency?.name,
                    fechaRegistro: moment(proyecto.creator?.createdAt).format('DD/MM/YYYY'),
                    estado: ProjectStatusMap[proyecto.status] || proyecto.status,
                    creador: proyecto.creator?.name
                }));
                setData(projectsData);
                setFilteredData(projectsData);
            } catch (error: any) {
                console.error("Error fetching projects:", error);
                if (error.status === 400) error.response?.data?.message.forEach((value: any) => toast.error(value));
                if (error.status === 409) toast.error(error.response?.data?.clientMessage);
            }
        };

        fetchProjects();
    }, []);
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        setFilteredData(
            data.filter(value =>
                value.proyecto.toLowerCase().includes(filter.toLowerCase()) ||
                value.creador.toLowerCase().includes(filter.toLowerCase()) ||
                value.agencia.toLowerCase().includes(filter.toLowerCase()) ||
                value.estado.toLowerCase().includes(filter.toLowerCase()) 
            )
        );
    }, [filter, data]);

    return (<div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
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
                            <h1 className="text-2xl font-semibold">Lista de proyectos</h1>
                        </div>

                        <div className="flex mb-4 ">
                            <input
                                type="text"
                                placeholder="Filtrar por empresa, nombre, Creador"
                                className="p-2 mr-2 border border-gray-300 rounded w-full"
                                value={filter}
                                onChange={handleFilterChange}
                            />            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={crearProyecto}>Nuevo
                            proyecto
                        </button>
                        </div>

                        <div className="bg-white shadow-md rounded">
                            <PaginatedComponent headers={headers} items={filteredData} itemsPerPage={10}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>);
};

export default ListaProyectosAdmin;