import { CompanyType } from '@/constants';
import React, { useEffect, useState } from 'react';

const Sidebar: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [companyType, setCompanyType] = useState<CompanyType | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user?.role);
    setCompanyType(user?.company?.type);
  }, []);

  const links: any = {
    common: [
      { href: '/dashboard', icon: 'IconHome.png', label: 'Inicio' },
      { href: '/usuarios', icon: 'IconUsuarios.png', label: 'Usuarios' },
    ],
    user: [
      { href: '/lista-de-proyectos-admin', icon: 'IconProyectos.png', label: 'Proyectos' },
      { href: '/productoras', icon: 'IconProductoras.png', label: 'Productoras' },
    ],
    owner: [
      { href: '/lista-de-proyectos-admin', icon: 'IconProyectos.png', label: 'Proyectos' },
      { href: '/productoras', icon: 'IconProductoras.png', label: 'Productoras' },
    ],
    support: [
      { href: '/lista-de-proyectos-admin', icon: 'IconProyectos.png', label: 'Proyectos' },
      { href: '/productoras', icon: 'IconProductoras.png', label: 'Productoras' },
      { href: '/directores', icon: 'IconDirectores.png', label: 'Directores' },
    ],
    'super-admin': [
      { href: '/lista-de-proyectos-admin', icon: 'IconProyectos.png', label: 'Proyectos' },
      { href: '/productoras', icon: 'IconProductoras.png', label: 'Productoras' },
      { href: '/directores', icon: 'IconDirectores.png', label: 'Directores' },
      { href: '/editar-planes', icon: 'IconPlan.png', label: 'Planes' },
    ],
  };

  const getLinksForRole = (role: string | null, companyType: CompanyType | null) => {
    if (!role) return [];
    let roleLinks = [...links.common, ...links[role]];

    if (companyType === CompanyType.ProductionStudio) {
      if (role === 'user' || role === 'owner') {
        roleLinks = [
          { href: '/dashboard', icon: 'IconHome.png', label: 'Inicio' },
          { href: '/usuarios', icon: 'IconUsuarios.png', label: 'Usuarios' },
          { href: '/lista-de-proyectos', icon: 'IconProyectos.png', label: 'Proyectos' },
          { href: '/directores', icon: 'IconDirectores.png', label: 'Directores' },
        ];
      }
    }

    return roleLinks;
  };

  return (
      <div className="flex flex-col w-64 h-screen bg-white shadow-md">
        <div className="flex items-center justify-center h-28 text-white">
          <img src="logo.png" alt="Description" className="w-3/3 h-2/3 object-contain" />
        </div>
        <div className="flex-1 px-4 py-8 space-y-4 overflow-y-auto">
          {getLinksForRole(userRole, companyType).map((link, index) => (
              <a key={index} href={link?.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <img src={`${link?.icon}`} alt={link?.label} className="w-6 h-6 object-contain mr-2" />
                <span>{link?.label}</span>
              </a>
          ))}
        </div>
        <div className="px-4 pb-8 space-y-6">
          <div>
            <a href="/preguntas-frecuentes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <img src="miniaturas/preguntas_frecuentes.png" alt="Description" className="w-6 h-6 mr-3" />
              <span>Preguntas frecuentes</span>
            </a>
            <a href="/soporte" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <img src="miniaturas/soporte.png" alt="Description" className="w-6 h-6 mr-3" />
              <span>Soporte</span>
            </a>
          </div>
          <div className="flex justify-center space-x-4 bottom-0">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src="miniaturas/facebook.png" alt="Description" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src="miniaturas/linkedin.png" alt="Description" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src="miniaturas/instagram.png" alt="Description" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src="miniaturas/youtube.png" alt="Description" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;