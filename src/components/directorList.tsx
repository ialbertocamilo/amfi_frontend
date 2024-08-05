import { Director } from '@/entities/Director';
import React, { useState } from 'react';
import AddDirectorModal from './AddDirectorModal ';

interface inputEntity {
    directors: Director[];
}


const DirectorsList: React.FC<inputEntity> = ({ directors }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEdit = (data: Director | null) => {
        setIsModalOpen(true)
    };

    const handleDelete = (id: number | null) => {
        console.log(`Delete director with id: ${id}`);
    };

    return (
        <div style={{ width: '300px', margin: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {directors.map((director) => (
                    <li key={director.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span>{director.name}</span>
                        <div>
                            <button onClick={() => handleEdit(director)} style={{ marginRight: '10px' }}>
                                ✏️
                            </button>
                            <AddDirectorModal
                                director={null}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onAdd={null}
                            />
                            <button onClick={() => handleDelete(director.id)}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DirectorsList;
