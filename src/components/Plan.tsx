import React from 'react';

interface PlanProps {
    title: string;
    description: string;
    features: string[];
    buttonText: string;
    color: string;
    isHighlighted?: boolean;
}

const Plan: React.FC<PlanProps> = ({ title, description, features, buttonText, color, isHighlighted }) => {
    return (
        <div className={`rounded-lg shadow-lg }`} style={{ border: `2px solid ${color}` }}>
            <div className="p-6" style={{ backgroundColor: color }}>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
            </div>
            <ul className="mb-6 p-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <span className="text-green-500 mr-2">✔</span>{feature}
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mb-6">
                <button className="bg-red-500 text-white py-2 px-4 rounded">{buttonText}</button>
            </div>
        </div>
    );
};

export default Plan;
