import { signOut } from "@/api/authenticationApi";
import { storage } from "@/lib/storage";
import { UserMapper } from "@/mappers/user.mapper";
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import toast from "react-hot-toast";


const Navbar: React.FC = () => {

    const [user, setUser] = useState({name: '', lastname: '', company: {type: '', name: ''}, role: ''})
    const [type, setType] = useState('')

    const [company, setCompany] = useState('')
    useEffect(() => {
        const user = storage('user').get()
        if (user) setUser(user)
        const companyType = UserMapper.mapCompanyType(user?.company?.type)
        const role = UserMapper.mapRole(user?.role)
        setType('Rol: '+ role )
        setCompany(companyType)
    }, []);
    const logout = async () => {
        await signOut()
        toast.success('Sesión cerrada exitosamente')
        location.href = '/login'
    }

    return (
        <div className="flex items-center justify-between px-6 py-4">
            <Menu as="div" className="relative inline-block text-left z-50">
                <div className="flex items-center space-x-2">
                    <span className="h2">🧑‍💻</span>
                    <div className="flex flex-col">
                        <Menu.Button className="inline-flex justify-center rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-g text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 whitespace-nowrap">
                            <div className="flex flex-col items-start">
                                <span className="font-semibold">{user?.name} {user?.lastname}</span>
                                <span className="text-xs text-gray-500">{company} {user?.company?.name} • {type}</span>
                            </div>
                        </Menu.Button>
                    </div>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 ">
                 
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="/perfil"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } block px-4 py-2 text-sm`}
                                    >
                                        Ver perfil
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="/cambiar-password"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } block px-4 py-2 text-sm`}
                                    >
                                        Cambiar contraseña
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        onClick={() => logout()}
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } block px-4 py-2 text-sm cursor-pointer`}
                                    >
                                        Cerrar sesión
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default Navbar;
