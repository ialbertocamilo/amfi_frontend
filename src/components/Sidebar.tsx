import React, { useEffect, useState } from 'react';
import { FaHome, FaCube, FaClock, FaUsers, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);


  const toggleProjectsMenu = () => {
    setIsProjectsMenuOpen(!isProjectsMenuOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setType(user?.user?.company?.type)
    setUserRole(user?.user?.role);
  }, []);
  return (
    <div className="flex flex-col w-64 h-full bg-white shadow-md">
      <div className="flex items-center justify-center h-16 text-white">
        <img src="amfi.png" alt="Description" className="w-2/3 h-2/3 object-contain" />
      </div>
      <div className="flex-1 px-4 py-8 space-y-4">
        <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconHome.png" alt="Description" className="object-contain mr-2 " />
          <span>Inicio</span>
        </a>
        <a href="/usuarios" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconUsuarios.png" alt="Description" className="object-contain mr-2 " />
          <span>Usuarios</span>
        </a>
        <a href="/directores" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconUsuarios.png" alt="Description" className="object-contain mr-2 " />
          <span>Directores</span>
        </a>

        {(userRole == 'owner' && type === 'production-studio') && (
        <a href="/lista-de-proyectos" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconProyectos.png" alt="Description" className="object-contain mr-2 " />
          <span>Proyectos</span>
        </a>
        )}
        {(userRole == 'super-admin' || type !== 'production-studio') && (
        <a href="/lista-de-proyectos-admin" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconProyectos.png" alt="Description" className="object-contain mr-2 " />
          <span>Proyectos</span>
        </a>

        )}


        <a href="/productoras" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="IconProductoras.png" alt="Description" className="object-contain mr-2 " />
          <span>Productoras</span>
        </a>
      </div>
      {/* Sección inferior */}
      <div className="px-4 pb-8 space-y-6">
        <div>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <img src="miniaturas/preguntas_frecuentes.png" alt="Description" className="w-6 h6  mr-3 " />
            <span>Preguntas frecuentes</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <img src="miniaturas/soporte.png" alt="Description" className="w-6 h6  mr-3 " />
            <span>Soporte</span>
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <img src="miniaturas/facebook.png" alt="Description" className="w-6 h6 " />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <img src="miniaturas/linkedin.png" alt="Description" className="w-6 h6 " />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <img src="miniaturas/instagram.png" alt="Description" className="w-6 h6 " />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <img src="miniaturas/youtube.png" alt="Description" className="w-6 h6 " />
          </a>
        </div>

        {/* Texto en la parte inferior */}
        <p className="text-center text-sm text-red-600">amfi.mx</p>
      </div>
    </div>

  );
};

export default Sidebar;