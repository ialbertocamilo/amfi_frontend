import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/NavBar';
import { FaBars } from 'react-icons/fa';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex bg-gray-100">
            <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'hidden' : 'hidden'} md:relative md:translate-x-0 md:block`}>
                {isSidebarOpen && <Sidebar />}
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
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;