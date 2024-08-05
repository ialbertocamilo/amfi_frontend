import { Director } from '@/entities/Director';
import React, { useEffect, useState } from 'react';
import AddDirectorModal from './AddDirectorModal ';


interface inputEntity {
    directorsIni: Director[];
}

const DirectorsList: React.FC<inputEntity> = ({ directorsIni }) => {
    const [directors, setDirectors] = useState<Director[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDirector, setCurrentDirector] = useState<Director | null>(null);

    useEffect(() => {
        console.log('directorsIni', directorsIni)
        setDirectors(directorsIni);
        console.log('directors', directors)
    }, [directorsIni]);
    const handleEdit = (director: Director) => {
        setCurrentDirector(director);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number | null) => {
        setDirectors(directors.filter(director => director.id !== id));
    };

    const handleUpdateDirector = (updatedDirector: Director) => {
        setDirectors(directors.map(director => director.id === updatedDirector.id ? updatedDirector : director));
        setIsModalOpen(false);
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
                            <button onClick={() => handleDelete(director.id)}>
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentDirector && (
                <AddDirectorModal
                    onAdd={null}
                    director={currentDirector}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateDirector}
                />
            )}
        </div>
    );
};

export default DirectorsList;