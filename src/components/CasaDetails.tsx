import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ProjectMapper } from '@/mappers/project.mapper';
import { CasaProductora, casasProductorasState } from '@/state/producerState';

interface CasaDetailsProps {
  casa: CasaProductora;
  index: number;
  toggleDetalles: (index: number) => void;
}

interface DirectorItemProps {
  director: Director;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const DirectorItem: React.FC<DirectorItemProps> = ({ director, isSelected, onSelect }) => {
  return (
    <div key={director.id} className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-red-500 mr-2"
        checked={isSelected}
        onChange={() => onSelect(director.id)}
      />
      <span>
        {director.name} ({ProjectMapper.mapRepresentationType(director.type)})
      </span>
    </div>
  );
};

const CasaDetails: React.FC<CasaDetailsProps> = ({ casa, index, toggleDetalles }) => {
  const [casasProductoras, setCasasProductoras] = useRecoilState(casasProductorasState);
  const [error, setError] = useState<string | null>(null);

  const handleSelectDirector = (directorId: number) => {
    setCasasProductoras(prevState => {
      const newState = prevState.map((casa, i) => {
        if (i === index) {
          const updatedDirectors = casa.directors.map(director => {
            if (director.id === directorId) {
              return {
                ...director,
                selected: !director.selected,
              };
            }
            return director;
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
    if (selectedDirectors.length === 0) {
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