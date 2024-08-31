// pages/index.tsx
import { useState } from 'react';
import SummaryWidget from '../components/SummaryWidget';
import Chart from '../components/Chart';
import PendingTable from '../components/PendingTable';
import "./globals.css";
import Navbar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="container mx-auto p-4" style={{ backgroundColor: '#F5F5F5' }}>
            <h1 className="text-4xl font-bold mb-4">Panel</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <SummaryWidget title="Total Usuarios" count={32} link="#" icon="Icon.png" />
              <SummaryWidget title="Proyectos" count={294} link="#" icon="Icon2.png" />
              <SummaryWidget title="Proyectos activos" count={32} link="#" icon="Icon3.png" />
            </div>
            <div className="mb-8">
              <Chart />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Licitaciones pendientes</h2>
              <PendingTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}