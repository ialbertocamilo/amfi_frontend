// components/PlanEditForm.tsx
import { PlanEntity } from '@/pages/editar-planes';
import React, { useState } from 'react';

interface PlanEditFormProps {
    plan: PlanEntity;
    editedPlan: PlanEntity;
    onInputChange: (id: string, field: string, value: any) => void;
    onSave: (id: string) => void;
}

const PlanEditForm: React.FC<PlanEditFormProps> = ({ plan, editedPlan, onInputChange, onSave }) => {
    const [featuresInput, setFeaturesInput] = useState(editedPlan?.features?.join(', ') ?? plan.features?.join(', ') ?? '');

    const handleFeaturesBlur = (id: string) => {
        const featuresArray = featuresInput.split(',').map(feature => {
            feature = feature.trim();
            return feature.endsWith('.') ? feature : feature + '.';
        });
        onInputChange(id, 'features', featuresArray);
    };

    return (
        <div style={{ backgroundColor: plan.color, padding: '10px', borderRadius: '5px' }}>
            <div className="mb-2">
                <label htmlFor={`name-${plan.id}`} className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    id={`name-${plan.id}`}
                    type="text"
                    value={editedPlan?.title ?? plan.title ?? ''}
                    onChange={(e) => onInputChange(plan.id, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`price-${plan.id}`} className="block text-sm font-medium text-gray-700">Precio MXN</label>
                <input
                    id={`price-${plan.id}`}
                    type="number"
                    value={editedPlan?.price ?? plan.price ?? 0}
                    onChange={(e) => onInputChange(plan.id, 'price', parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`credits-${plan.id}`} className="block text-sm font-medium text-gray-700">Usuarios</label>
                <input
                    id={`credits-${plan.id}`}
                    type="number"
                    value={editedPlan?.maxUsers ?? plan.maxUsers ?? 0}
                    onChange={(e) => onInputChange(plan.id, 'maxUsers', parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`description-${plan.id}`} className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                    id={`description-${plan.id}`}
                    value={editedPlan?.description ?? plan.description ?? ''}
                    onChange={(e) => onInputChange(plan.id, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`features-${plan.id}`} className="block text-sm font-medium text-gray-700">Características</label>
                <input
                    id={`features-${plan.id}`}
                    type="text"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    onBlur={() => handleFeaturesBlur(plan.id)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor={`active-${plan.id}`} className="block text-sm font-medium text-gray-700">Activo</label>
                <input
                    id={`active-${plan.id}`}
                    type="checkbox"
                    checked={editedPlan?.active ?? plan.active ?? false}
                    onChange={(e) => onInputChange(plan.id, 'active', e.target.checked)}
                    className="mb-2"
                />
            </div>
            <button
                onClick={() => onSave(plan.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition duration-300"
            >
                Guardar
            </button>
        </div>
    );
};

export default PlanEditForm;