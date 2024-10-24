// pages/index.tsx
import { useEffect, useState } from "react";
import SummaryWidget from "../components/SummaryWidget";
import Chart from "../components/Chart";
import PendingTable from "../components/PendingTable";
import "../app/globals.css";
import { api } from "@/lib/api";
import Layout from "@/components/Layout";

export default function Home() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalUsers: 0,
  });
  useEffect(() => {
    api.get("/company/stats").then((data) => {
      setStats(data.data);
    });
  }, []);
  return (
    <Layout>
      <main className="flex-1 p-6">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Panel</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <SummaryWidget
              title="Total Usuarios"
              count={stats.totalUsers}
              link="#"
              icon="Icon.png"
            />
            <SummaryWidget
              title="Licitaciones"
              count={stats.totalProjects}
              link="#"
              icon="Icon2.png"
            />
            <SummaryWidget
              title="Proyectos activos"
              count={stats.activeProjects}
              link="#"
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
