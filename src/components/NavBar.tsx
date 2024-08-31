import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';


const Navbar: React.FC = () => {
    return (
        <div className="flex items-center justify-between px-6 py-4  ">
            <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center">
                    <img src="persona.png" alt="Description" className="w-10 h-10 object-contain mr-2 rounded-full" />
                    <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 whitespace-nowrap">
                        Alfie Perito
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
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block px-4 py-2 text-sm`}
                                    >
                                        Ver perfil
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } block px-4 py-2 text-sm`}
                                    >
                                        Cambiar contraseña
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
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
