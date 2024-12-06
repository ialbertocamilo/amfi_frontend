import AddEntregableModal from "@/components/Proyecto/AddEntregableModal";
import React, { useEffect, useState } from 'react';

interface inputEntity {
    entregablesIni: any[];
    setEntregables:any
}

const EntregableList: React.FC<inputEntity> = ({ entregablesIni, setEntregables}) => {
    const [indexId, setIndexId] = useState('');
    const [entregables, setEntregablesIn] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEntregable, setCurrentEntregable] = useState<any | null>(null);

    useEffect(() => {
        setEntregablesIn(entregablesIni);
    }, [entregablesIni]);

    const handleEdit = (entregable: any, index: number) => {
        console.log(entregable);
        setCurrentEntregable({ ...entregable, id: index });
        setIndexId(index.toString());
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        const updatedEntregables = entregables.filter((_, i) => i !== index);
        setEntregablesIn(updatedEntregables);
        setEntregables(updatedEntregables);
    };

    const handleAddEntregable = (newEntregable: any) => {
        setEntregablesIn(prevEntregables => [...prevEntregables, newEntregable]);
        setIsModalOpen(false);
    };

    const handleUpdateEntregable = (updatedEntregable: any) => {
        const updatedEntregables = entregables.map((entregable, index) =>
            index.toString() === indexId ? updatedEntregable : entregable
        );
        setEntregablesIn(updatedEntregables);
        setIsModalOpen(false);
    };

    return (
        <div className="w-72 border border-gray-300 p-2.5 w-full">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {entregables.map((entregable, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span>{entregable.version}</span>
                        <div>
                            <button onClick={(e) => {
                                e.preventDefault()
                                handleEdit(entregable, index);
                            }} style={{ marginRight: '10px' }}>
                                ✏️
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleDelete(index);
                            }}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

                <AddEntregableModal
                    onAdd={handleAddEntregable}
                    entregable={currentEntregable}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateEntregable}
                />
        </div>
    );
};

export default EntregableList;