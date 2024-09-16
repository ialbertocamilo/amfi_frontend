import React, { useMemo, useState } from 'react';
import { useTable, Column } from 'react-table';
import "./globals.css";
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';


interface User {
  id: string;
  proyecto: string;
  agencia: string;
  fechaRegistro: string;
  estado: string;
}

const ListaProyectosAdmin = () => {
  const data: User[] = useMemo(
    () => [
      { id: '00001', proyecto: 'Christine Brooks', agencia: '089 Kutch Green Apt. 448', fechaRegistro: '04 Sep 2024', estado: 'Anunciante' },
      { id: '00002', proyecto: 'Rosie Pearson', agencia: '979 Immanuel Ferry Suite 526', fechaRegistro: '28 May 2024', estado: 'Agencia' },
      { id: '00003', proyecto: 'Darrell Caldwell', agencia: '8587 Frida Ports', fechaRegistro: '23 Nov 2024', estado: 'Productora' },
      { id: '00004', proyecto: 'Gilbert Johnston', agencia: '768 Destiny Lake Suite 600', fechaRegistro: '05 Feb 2024', estado: 'Agencia' },
      { id: '00005', proyecto: 'Alan Cain', agencia: '042 Mylene Throughway', fechaRegistro: '29 Jul 2024', estado: 'Agencia' },
      { id: '00006', proyecto: 'Alfred Murray', agencia: '543 Weinmann Mountain', fechaRegistro: '15 Aug 2024', estado: 'Agencia' },
      { id: '00007', proyecto: 'Maggie Sullivan', agencia: 'New Scottieberg', fechaRegistro: '21 Dec 2024', estado: 'Anunciante' },
      { id: '00008', proyecto: 'Rosie Todd', agencia: 'New Jon', fechaRegistro: '30 Apr 2024', estado: 'Agencia' },
    ],
    []
  );

  const columns: Column<User>[] = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Empresa', accessor: 'proyecto' },
      { Header: 'Nombre', accessor: 'agencia' },
      { Header: 'Fecha registro', accessor: 'fechaRegistro' },
      { Header: 'Tipo', accessor: 'estado' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const router = useRouter();

  const handleEdit = () => {
    router.push('/detalle-proyecto');
  };

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
              <h1 className="text-2xl font-semibold">Lista de proyectos</h1>
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
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => toggleDropdown(row.original.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                            </svg>
                          </button>
                          {dropdownOpen === row.original.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={handleEdit}
                              >
                                Editar
                              </button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Eliminar</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListaProyectosAdmin;