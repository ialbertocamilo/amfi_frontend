import React from 'react';
import { FaHome, FaCube, FaClock, FaUsers } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 h-full bg-white shadow-md">
      <div className="flex items-center justify-center h-16 text-white">
        <img src="amfi.png" alt="Description" className="w-2/3 h-2/3 object-contain" />
      </div>
      <div className="flex-1 px-4 py-8 space-y-4">
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
        <img src="IconHome.png" alt="Description" className="object-contain mr-2 " />
          <span>Inicio</span>
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
        <img src="IconUsuarios.png" alt="Description" className="object-contain mr-2 " />
          <span>Usuarios</span>
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
        <img src="IconProyectos.png" alt="Description" className="object-contain mr-2 " />
          <span>Proyectos</span>
        </a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
        <img src="IconProductoras.png" alt="Description" className="object-contain mr-2 " />
          <span>Productoras</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;