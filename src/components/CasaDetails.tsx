import { ProjectMapper } from '@/mappers/project.mapper';
import { CasaProductora, casasProductorasState, Director } from '@/state/producerState';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface CasaDetailsProps {
  casa: CasaProductora;
  index: number;
  toggleDetalles: (index: number) => void;
}

interface DirectorItemProps {
  director: Director;
  isSelected: boolean;
  onSelect: (id: string) => void;
  casa: CasaProductora;
}

const DirectorItem: React.FC<DirectorItemProps> = ({ director, isSelected, onSelect, casa }) => {
  return (
    <div key={director.id} className={`flex items-center p-2 rounded ${casa.isInvited ? 'bg-gray-50' : 'hover:bg-gray-100'}`}>
      <input
        type="checkbox"
        className={`form-checkbox h-4 w-4 ${casa.isInvited ? 'text-blue-400 cursor-not-allowed opacity-50' : 'text-red-500'} mr-2`}
        checked={isSelected}
        onChange={() => !casa.isInvited && onSelect(director?.id)}
        disabled={casa.isInvited}
      />
      <div className="flex flex-col">
        <span className={`font-medium ${casa.isInvited ? 'text-gray-500' : 'text-gray-900'}`}>
          {director.name}
        </span>
        <span className={`text-sm ${casa.isInvited ? 'text-gray-400' : 'text-gray-600'}`}>
          {ProjectMapper.mapRepresentationType(director.type)}
        </span>
      </div>
    </div>
  );
};

const CasaDetails: React.FC<CasaDetailsProps> = ({ casa, index }) => {
  const [casasProductoras, setCasasProductoras] = useRecoilState(casasProductorasState);
  const [error, setError] = useState<string | null>(null);

  const handleSelectDirector = (directorId: string) => {
    setCasasProductoras(prevState => {
      const newState = prevState.map((casa, i) => {
        if (i === index) {
          const updatedDirectors = casa.directors.map(director => {
            // Only allow one director to be selected at a time
            return {
              ...director,
              selected: director.id === directorId ? !director.selected : false
            };
          });
          return {
            ...casa,
            directors: updatedDirectors,
          };
        }
        return casa;
      });
      return newState;
    });
  };

  useEffect(() => {
    const selectedDirectors = casa.directors.filter(director => director.selected);
    if (!casa.isInvited && selectedDirectors.length === 0) {
      setError('Debe seleccionar al menos un director.');
    } else {
      setError(null);
    }
  }, [casa.directors]);

  return (
    <div>
      {casa.details && (
        <div className="mt-4 space-y-2">
          {casa.directors.length > 0 ? (
            casa.directors.map((director) => (
              <DirectorItem
                key={director.id}
                director={director}
                isSelected={director.selected}
                onSelect={handleSelectDirector}
                casa={casa}
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