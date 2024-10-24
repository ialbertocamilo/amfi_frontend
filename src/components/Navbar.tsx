import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {storage} from "@/lib/storage";
import {UserMapper} from "@/mappers/user.mapper";
import toast from "react-hot-toast";
import {signOut} from "@/api/authenticationApi";


const Navbar: React.FC = () => {

    const [user, setUser] = useState({name: '', lastname: '', company: {type: ''}, role: ''})
    const [type, setType] = useState('')

    useEffect(() => {
        const user = storage('user').get()
        if (user) setUser(user?.user)
        const companyType = UserMapper.mapCompanyType(user?.user.company?.type)
        const role = UserMapper.mapRole(user?.user?.role)
        setType(role + ' - ' + companyType)
    }, []);
    const logout = async () => {
        await signOut()
        toast.success('Sesión cerrada exitosamente')
        location.href = '/login'
    }

    return (
        <div className="flex items-center justify-between px-6 py-4  ">
            <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center">
                    <img src="person.webp" alt="Description" className="w-10 h-10 object-contain mr-2 rounded-full"/>
                    <Menu.Button
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 whitespace-nowrap">
                        {user.name} {user.lastname}
                    </Menu.Button>
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
                                    <span
                                        className={`${active ? 'bg-gray-100 text-gray-900 font-bold' : 'text-gray-700 font-bold'
                                        } block px-4 py-2 text-sm`}
                                    >
                                        {type}
                                    </span>
                                )}
                            </Menu.Item>
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
                                        } block px-4 py-2 text-sm`}
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
