import React, { useEffect, useState } from 'react';
import AddEntregableModalFoto from './AddEntregableModalFoto';
import AddEntregableModalLocutor from './AddEntregableModalLocutor';
import AddEntregableModalVideo from './AddEntregableModalVideo';

type inputEntity = {
  entregablesVideoIni: any[];
  entregablesFotoIni: any[];
  entregablesLocutorIni: any[];
  setEntregablesVideo: React.Dispatch<React.SetStateAction<any[]>>;
  setEntregablesFoto: React.Dispatch<React.SetStateAction<any[]>>;
  setEntregablesLocutor: React.Dispatch<React.SetStateAction<any[]>>;
  onUpdate?: (type: string, updatedEntregables: any[]) => void;
};

const EntregableList: React.FC<inputEntity> = ({ entregablesVideoIni, entregablesFotoIni, entregablesLocutorIni, setEntregablesVideo, setEntregablesFoto, setEntregablesLocutor, onUpdate }) => {
  const [entregablesVideo, setEntregablesVideoIn] = useState<any[]>([]);
  const [entregablesFoto, setEntregablesFotoIn] = useState<any[]>([]);
  const [entregablesLocutor, setEntregablesLocutorIn] = useState<any[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);
  const [isLocutorModalOpen, setIsLocutorModalOpen] = useState(false);
  const [currentEntregable, setCurrentEntregable] = useState<any | null>(null);

  useEffect(() => {
    setEntregablesVideoIn(entregablesVideoIni);
    setEntregablesFotoIn(entregablesFotoIni);
    setEntregablesLocutorIn(entregablesLocutorIni);
  }, [entregablesVideoIni, entregablesFotoIni, entregablesLocutorIni]);

  const handleEdit = (entregable: any, type: 'video' | 'foto' | 'locutor') => {
    setCurrentEntregable({ ...entregable, type });
    if (type === 'video') {
      setIsVideoModalOpen(true);
    } else if (type === 'foto') {
      setIsFotoModalOpen(true);
    } else if (type === 'locutor') {
      setIsLocutorModalOpen(true);
    }
  };

  const handleDelete = (index: number, type: 'video' | 'foto' | 'locutor') => {
    if (type === 'video') {
      const updatedEntregables = entregablesVideo.filter((_, i) => i !== index);
      setEntregablesVideoIn(updatedEntregables);
      setEntregablesVideo(updatedEntregables);
      onUpdate?.('video', updatedEntregables);
    } else if (type === 'foto') {
      const updatedEntregables = entregablesFoto.filter((_, i) => i !== index);
      setEntregablesFotoIn(updatedEntregables);
      setEntregablesFoto(updatedEntregables);
      onUpdate?.('foto', updatedEntregables);
    } else if (type === 'locutor') {
      setEntregablesLocutorIn([]);
      setEntregablesLocutor([]);
      onUpdate?.('locutor', []);
    }
  };

  return (
    <div className="w-full border border-gray-300 p-2.5">
      <h2 className="text-lg font-bold mb-4">Entregables de Video</h2>
      <ul className="space-y-2">
        {entregablesVideo?.map((entregable, index) => (
          <li key={index} className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
            <div>
              <h3 className="font-semibold">{entregable.version}</h3>
              <p className="text-sm text-gray-600">Duración: {entregable.duracion}&quot;</p>
              <p className="text-sm text-gray-600">Formato: {entregable.formatoMedidas}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(entregable, 'video');
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(index, 'video')}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-8 mb-4">Entregables de Foto</h2>
      <ul className="space-y-2">
        {entregablesFoto?.map((entregable, index) => (
          <li key={index} className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
            <div>
              <h3 className="font-semibold">{entregable.version}</h3>
              <p className="text-sm text-gray-600">Medios: {entregable.medios}</p>
              <p className="text-sm text-gray-600">Resolución: {entregable.resolucion}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(entregable, 'foto');
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(index, 'foto')}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-8 mb-4">Entregable de Locutor</h2>
      <ul className="space-y-2">
        {entregablesLocutor?.length > 0 ? (
          <li className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
            <div>
              <h3 className="font-semibold">{entregablesLocutor[0].version}</h3>
              <p className="text-sm text-gray-600">Tipo: {entregablesLocutor[0].tipo}</p>
              <p className="text-sm text-gray-600">Especificaciones: {entregablesLocutor[0].especificaciones}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(entregablesLocutor[0], 'locutor');
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(0, 'locutor')}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                🗑️
              </button>
            </div>
          </li>
        ) : null}
      </ul>

      <AddEntregableModalVideo
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setCurrentEntregable(null);
        }}
        listaEntregables={entregablesVideo}
        setListaEntregables={setEntregablesVideo}
        entregable={currentEntregable?.type === 'video' ? currentEntregable : null}
      />
      <AddEntregableModalFoto
        isOpen={isFotoModalOpen}
        onClose={() => {
          setIsFotoModalOpen(false);
          setCurrentEntregable(null);
        }}
        listaEntregables={entregablesFoto}
        setListaEntregables={setEntregablesFoto}
        entregable={currentEntregable?.type === 'foto' ? currentEntregable : null}
      />
      <AddEntregableModalLocutor
        isOpen={isLocutorModalOpen}
        onClose={() => {
          setIsLocutorModalOpen(false);
          setCurrentEntregable(null);
        }}
        listaEntregables={entregablesLocutor}
        setListaEntregables={setEntregablesLocutor}
        entregable={currentEntregable?.type === 'locutor' ? currentEntregable : null}
      />
    </div>
  );
};

export default EntregableList;