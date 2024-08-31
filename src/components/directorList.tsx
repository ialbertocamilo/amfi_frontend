import { Director } from '@/entities/Director';
import React, { useEffect, useState } from 'react';
import AddDirectorModal from './AddDirectorModal ';


interface inputEntity {
    directorsIni: Director[];
}

const DirectorsList: React.FC<inputEntity> = ({ directorsIni }) => {
    const [indexId, setIndexId] = useState('');
    const [directors, setDirectors] = useState<Director[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDirector, setCurrentDirector] = useState<Director | null>(null);

    useEffect(() => {
        setDirectors(directorsIni);
    }, [directorsIni]);
    const handleEdit = (director: Director, index:number) => {
        director.id = index;
        setCurrentDirector(director);
        setIndexId(index?.toString());
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        setDirectors(directors.filter((_, i) => i !== index));
    };

    const handleUpdateDirector = (updatedDirector: Director) => {

        setDirectors(directors.map((director,index) => index.toString() == indexId ? updatedDirector : director));
        setIsModalOpen(false);
    };

    return (
        <div style={{ width: '300px', margin: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {directors.map((director, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span>{director.name}</span>
                        <div>
                            <button onClick={() => handleEdit(director, index)} style={{ marginRight: '10px' }}>
                                ✏️
                            </button>
                            <button onClick={() => handleDelete(index)}>
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