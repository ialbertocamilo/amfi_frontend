import React, { useEffect, useState } from 'react';
import { ProjectMapper } from '@/mappers/project.mapper';

interface CasaDetailsProps {
  casa: {
    details: boolean;
    directors: {
      id: string;
      name: string;
      type: string;
    }[];
  };
  index: number;
  toggleDetalles: (index: number) => void;
}
interface DirectorItemProps {
    director: {
      id: string;
      name: string;
      type: string;
    };
    isSelected: boolean;
    onSelect: (id: string) => void;
  }
  
  const DirectorItem: React.FC<DirectorItemProps> = ({ director, isSelected, onSelect }) => {
    return (
      <div key={director?.id} className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-red-500 mr-2"
          checked={isSelected}
          onChange={() => onSelect(director.id)}
        />
        <span>
          {director?.name} ({ProjectMapper.mapRepresentationType(director?.type)})
        </span>
      </div>
    );
  };
  
  
  const CasaDetails: React.FC<CasaDetailsProps> = ({ casa, index, toggleDetalles }) => {
    const [selectedDirectorId, setSelectedDirectorId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const handleSelectDirector = (id: string) => {
      setSelectedDirectorId(id === selectedDirectorId ? null : id);
    };
  
    useEffect(() => {
      if (!selectedDirectorId) {
        setError('Debe seleccionar al menos un director.');
      } else {
        setError(null);
      }
    }, [selectedDirectorId]);
  
    return (
      <div>

        {casa?.details && (
          <div className="mt-4 space-y-2">
            {casa?.directors.length > 0 ? (
              casa?.directors.map((director) => (
                <DirectorItem
                  key={director?.id}
                  director={director}
                  isSelected={director.id === selectedDirectorId}
                  onSelect={handleSelectDirector}
                />
              ))
            ) : (
              <span className="text-gray-500">Sin directores disponibles</span>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        )}
      </div>
    );
  };
  
export default CasaDetails;