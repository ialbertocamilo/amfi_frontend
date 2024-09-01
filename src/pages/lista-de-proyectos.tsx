import React, { useState } from 'react';
import "./globals.css";
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';
import Navbar from '@/components/NavBar';

const projects = [
  { name: 'Proyecto León', status: 'Nuevo', isNew: true },
  { name: 'Punto de Inflexión', status: 'Descargar propuesta enviada', isCompleted: true },
  { name: 'Visiones del Futuro', status: 'Completado', isCompleted: true },
  { name: 'Aventuras del Alma', status: 'Completado', isCompleted: true },
  { name: 'Caminos Cruzados', status: 'Completado', isCompleted: true },
];

const ListaDeProyectos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    
  const [filterText, setFilterText] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
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
        <h1 className="text-2xl font-semibold">Lista de Proyectos</h1>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Filtrar tabla..."
          className="p-2 border border-gray-300 rounded w-full"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="ml-2 bg-red-500 text-white py-2 px-4 rounded">Ver</button>
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">{project.name}</span>
              {project.isNew && (
                <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-full">Nuevo</span>
              )}
              {project.status === 'Descargar propuesta enviada' && (
                <span className="text-sm text-red-500">
                  <i className="mr-1">⬇️</i>
                  {project.status}
                </span>
              )}
            </div>
            {project.isCompleted && (
              <span className="bg-green-100 text-green-500 text-sm px-4 py-2 rounded-full">
                Completado
              </span>
            )}
            <button className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.293 12.707a1 1 0 011.414 0L16 9.414V6a1 1 0 10-2 0v2.586L10.707 7.293a1 1 0 00-1.414 0L5 11.586V8a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 100-2H6.414l3.293-3.293 4.293 4.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414l6-6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
        </main>
      </div>
    </div>

    
  );
};

export default ListaDeProyectos;
