// pages/index.tsx
import Layout from "@/components/Layout";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../app/globals.css";
import Chart from "../components/Chart";
import PendingTable from "../components/PendingTable";
import SummaryWidget from "../components/SummaryWidget";

export default function Home() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalDirectors: 0,
    totalUsers: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingInvitations: 0
  });

  useEffect(() => {
    api.get("/company/stats").then((data) => {
      setStats(data.data);
    }).catch(error=>{
      if (error?.response?.status === 401) {
        toast.error('No autorizado. Por favor, inicie sesión nuevamente.');
        location.href='/login'  
      } else {
        toast.error('Ocurrió un error al obtener las estadísticas.');
      }
    });
  }, []);

  return (
    <Layout>
      <main className="flex-1 p-6">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Panel</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <SummaryWidget
              title="Total Usuarios"
              count={stats.totalUsers}
              link="/usuarios"
              icon="Icon.png"
            />
            <SummaryWidget
              title="Total Licitaciones"
              count={stats.totalProjects}
              link="/lista-de-proyectos"
              icon="Icon2.png"
            />
            <SummaryWidget
              title="Total Directores"
              count={stats.totalDirectors}
              link="/directores"
              icon="Icon3.png"
            />
          </div>
          <div className="mb-8">
            <Chart />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Licitaciones pendientes
            </h2>
            <PendingTable />
          </div>
        </div>
      </main>
    </Layout>
  );
}
