import { getActivePlans, getAllPlans } from '@/api/planApi';
import Plan from '../components/Plan';
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from 'react';
export interface Plan {
    id: string;
    name: string;
    title:string;
    price: number;
    credits: number;
    description: string;
    active: boolean;
    features: string[];
    color:string;
    createdAt: Date;
    isHighlighted:boolean
  }
export default function Home() {


    useEffect(() => {
        const fetchPlans = async () => {
            const fetchedPlans = await getActivePlans();
            const colorMap: { [key: string]: string } = {
                'basic': '#DDEBFB', // Azul claro
                'medium': '#E1E3EB', // Amarillo
                'premium': '#FFD8D8', // Rojo
                'gold': '#FCECCB', // Gris
              };
            const highlightedPlans = ['premium'];
    
            const mappedPlans = fetchedPlans.map((plan) => ({
                ...plan,
                color: colorMap[plan.name] || '#EEEEEE',
                features: plan?.features??[],
                isHighlighted: highlightedPlans.includes(plan.name),
            }));
    
            setPlans(mappedPlans);
        };

        fetchPlans();
    }, []);

    
    const [plans, setPlans] = useState<Plan[]>([]);



    return (<AuthGuard>
            <div className="container mx-auto p-10">
                <div className="flex items-center justify-center h-32 text-white">
                    <img src="amfi-large.png" alt="Description" className="object-contain w-24 h-24"/>
                </div>
                <h1 className="text-4xl text-center font-bold mb-8">Planes</h1>
                <p className="text-center text-lg mb-8">Elige el plan que más te convenga</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (<Plan
                            key={index}
                            id={plan.id}
                            title={plan.title}
                            description={plan.description}
                            features={plan?.features}
                            buttonText={'Elegir'}
                            color={plan.color}
                            isHighlighted={plan?.isHighlighted}
                            price={plan.price}
                        />))}
                </div>
            </div>
        </AuthGuard>);
}
