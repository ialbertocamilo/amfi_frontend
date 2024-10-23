import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {storage} from "@/lib/storage";
import {storageConstants} from "@/constants";
import { getCurrentUser } from "@/api/authenticationApi";

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

const Plan: React.FC<PlanProps> = ({
                                      id, title, description, features, buttonText, color, isHighlighted, price,
                                   }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        const user=storage(storageConstants.user)
        router.push(`/confirmacion?plan_id=${id}`);
    };
    return (<div
            className={`rounded-lg shadow-lg }`}
            style={{border: `2px solid ${color}`}}
        >
            <div className="p-6" style={{backgroundColor: color}} >
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

export default Plan;
