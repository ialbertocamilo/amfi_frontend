import {getActivePlans} from '@/api/planApi';
import React, {useEffect, useState} from 'react';
import {PlanEntity} from "@/pages/editar-planes";
import './globals.css'
import {useRouter} from "next/router";

interface PlanProps {
    id: string;
    title: string;
    description: string;
    features: string[];
    buttonText: string;
    color: string;
    isHighlighted?: boolean;
    price: number
}

// ?register=true&email=&transactionId=
const Plan: React.FC<PlanProps> = ({
                                       id, title, description, features, buttonText, color, isHighlighted, price,
                                   }) => {
    const router = useRouter();
    const {register, email, transactionId} = router.query;
    const handleButtonClick = async () => {
        await router.push(`/confirmacion?plan_id=${id}&register=${register}&email=${email}&transactionId=${transactionId}`);
    };
    return (<div
        className={`rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl`}
        style={{border: `2px solid ${color}`}}
    >
        <div className="p-6" style={{backgroundColor: color}}>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
        </div>
        <ul className="mb-6 p-6">
            {features.map((feature, index) => (<li key={index} className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✔️</span>
                {feature}
            </li>))}
        </ul>
        <div className="flex justify-center mb-6">
            <button className="bg-red-500 text-white py-2 mx-2 w-full rounded" onClick={handleButtonClick}>
                {buttonText}
            </button>
        </div>
    </div>);
};
export default function Planes() {
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

    return (<div className="container mx-auto p-10">
        <div className="flex items-center justify-center h-32 text-white mb-8">
            <img src="amfi-large.png" alt="Description" className="object-contain w-24 h-24"/>
        </div>
        <h1 className="text-4xl text-center font-bold mb-8">Planes</h1>
        <p className="text-center text-lg mb-8">Elige el plan que más te convenga</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>);
}