// pages/editar-planes.tsx
import { getAllPlans, updatePlan } from '@/api/planApi';
import PlanEditForm from '../components/PlanEditForm';
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaBars } from 'react-icons/fa';
import Navbar from '@/components/NavBar';

export interface Plan {
  id: string;
  name: string;
  title: string;
  price: number;
  credits: number;
  description: string;
  active: boolean;
  features: string[];
  color: string;
  createdAt: Date;
  isHighlighted: boolean;
}

export default function EditarPlanes() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editedPlans, setEditedPlans] = useState<{ [key: string]: Plan }>({});
  const fetchPlans = async () => {
    const fetchedPlans = await getAllPlans();
    const colorMap: { [key: string]: string } = {
      'basic': '#DDEBFB', // Azul claro
      'medium': '#E1E3EB', // Amarillo
      'premium': '#FFD8D8', // Rojo
      'gold': '#FCECCB', // Gris
    };

    const highlightedPlans = ['premium'];

    const mappedPlans = fetchedPlans.map((plan) => ({
      ...plan,
      color: colorMap[plan.name] || '#FFFFFF',
      features: plan?.features ?? [],
      isHighlighted: highlightedPlans.includes(plan.name),
    }));

    setPlans(mappedPlans);
  };
  useEffect(() => {
  

    fetchPlans();
  }, []);

  const handleInputChange = (id: string, field: string, value: any) => {
    setEditedPlans((prevEditedPlans) => ({
      ...prevEditedPlans,
      [id]: {
        ...prevEditedPlans[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    const updatedPlan = editedPlans[id];
    if (updatedPlan) {
      await updatePlan(id, updatedPlan);
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === id ? updatedPlan : plan))
      );
      setEditedPlans((prevEditedPlans) => {
        const { [id]: _, ...rest } = prevEditedPlans;
        return rest;
      });
    }
    fetchPlans();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <AuthGuard>
            <div className="flex bg-gray-100">
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
      <div className="container mx-auto p-10">
        <div className="flex items-center justify-center h-32 text-white">
          <img src="amfi-large.png" alt="Description" className="object-contain w-24 h-24" />
        </div>
        <h1 className="text-4xl text-center font-bold mb-8">Editar Planes</h1>
        <p className="text-center text-lg mb-8">Edita los planes según sea necesario</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PlanEditForm
              key={index}
              plan={plan}
              editedPlan={editedPlans[plan.id] || plan}
              onInputChange={handleInputChange}
              onSave={handleSave}
            />
          ))}
        </div></div>
      </div>
      </div>
    </AuthGuard>
  );
}