import React, {useEffect, useState} from "react";
import {FaBars} from "react-icons/fa";
import '../app/globals.css';
import Navbar from "./Navbar";
import RecoilContextProvider from "./RecoilContextProvider";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

    }, []);

    return (<div className="flex h-screen bg-gray-100">
            <div
                className={`fixed inset-y-0 z-50 left-0 w-64 transition-transform transform shadow-lg ${isSidebarOpen ? "translate-x-0 relative" : "-translate-x-full"}`}
            >
                <Sidebar/>
            </div>
            <div className="flex-1 flex flex-col overflow-auto">
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button
                        className="p-2 focus:outline-none focus:bg-gray-200 z-40"
                        onClick={() => toggleSidebar()}
                    >
                        <FaBars className="w-6 h-6"/>
                    </button>
                    <Navbar/>
                </div>
                <main className="flex-1 p-6 overflow-auto">
                    <RecoilContextProvider>
                        <div className="bg-white min-h-screen p-6">  {children}</div>
                    </RecoilContextProvider>
                </main>
            </div>
        </div>);
};

export default Layout;