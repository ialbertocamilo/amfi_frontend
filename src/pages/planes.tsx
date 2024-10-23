import {getActivePlans} from '@/api/planApi';
import Plan from '../components/Plan';
import AuthGuard from "@/components/AuthGuard";
import {useEffect, useState} from 'react';
import {PlanEntity} from "@/pages/editar-planes";
import './globals.css'

export default function Home() {
    const [plans, setPlans] = useState<PlanEntity[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const fetchedPlans = await getActivePlans();
            const colorMap: { [key: string]: string } = {
                'basic': '#DDEBFB', // Light Blue
                'medium': '#E1E3EB', // Yellow
                'premium': '#FFD8D8', // Red
                'gold': '#FCECCB', // Gray
            };
            const highlightedPlans = ['premium'];

            const mappedPlans = fetchedPlans.map((plan: PlanEntity) => ({
                ...plan,
                color: colorMap[plan.name] || '#EEEEEE',
                features: plan?.features ?? [],
                isHighlighted: highlightedPlans.includes(plan.name),
            }));

            setPlans(mappedPlans);
        };

        fetchPlans();
    }, []);

    return (
        <AuthGuard>
            <div className="container mx-auto p-10">
                <div className="flex items-center justify-center h-32 text-white mb-8">
                    <img src="amfi-large.png" alt="Description" className="object-contain w-24 h-24"/>
                </div>
                <h1 className="text-4xl text-center font-bold mb-8">Planes</h1>
                <p className="text-center text-lg mb-8">Elige el plan que más te convenga</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <Plan
                            key={index}
                            id={plan.id}
                            title={plan.title}
                            description={plan.description}
                            features={plan?.features}
                            buttonText={'Elegir'}
                            color={plan.color}
                            isHighlighted={plan?.isHighlighted}
                            price={plan.price}
                        />
                    ))}
                </div>
            </div>
        </AuthGuard>
    );
}