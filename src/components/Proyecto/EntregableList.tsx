import React, { useEffect, useState } from 'react';
import AddEntregableModal from './AddEntregableModal ';


interface inputEntity {
    entregablesIni: any[];
}

const EntregableList: React.FC<inputEntity> = ({ entregablesIni }) => {
    const [indexId, setIndexId] = useState('');
    const [entregables, setEntregables] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEntregable, setCurrentEntregable] = useState<any | null>(null);

    useEffect(() => {
        setEntregables(entregablesIni);
    }, [entregablesIni]);
    const handleEdit = (entregable: any, index:number) => {
        entregable.id = index;
        setCurrentEntregable(entregable);
        setIndexId(index?.toString());
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        setEntregables(entregables.filter((_, i) => i !== index));
    };

    const handleUpdateEntregable = (updatedEntregable: any) => {

        setEntregables(entregables.map((entregable,index) => index.toString() == indexId ? updatedEntregable : entregable));
        setIsModalOpen(false);
    };

    return (
        <div style={{ width: '300px', margin: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {entregables.map((entregable, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span>{entregable.version}</span>
                        <div>
                            <button onClick={() => handleEdit(entregable, index)} style={{ marginRight: '10px' }}>
                                ✏️
                            </button>
                            <button onClick={() => handleDelete(index)}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentEntregable && (
                <AddEntregableModal
                    onAdd={null}
                    entregable={currentEntregable}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateEntregable}
                />
            )}
        </div>
    );
};

export default EntregableList;