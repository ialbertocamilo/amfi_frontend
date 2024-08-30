// pages/index.tsx
import SummaryWidget from '../components/SummaryWidget';
import Chart from '../components/Chart';
import PendingTable from '../components/PendingTable';
import "./globals.css";

export default function Home() {
  return (
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
  );
}