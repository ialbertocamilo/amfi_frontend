import React, { useState, useEffect } from 'react';


type inputEntity = {

    entregablesVideoIni: any[];
  
    entregablesFotoIni: any[];
  
    setEntregablesVideo: React.Dispatch<React.SetStateAction<any[]>>;
  
    setEntregablesFoto: React.Dispatch<React.SetStateAction<any[]>>;
  
  };
  
const EntregableList: React.FC<inputEntity> = ({ entregablesVideoIni, entregablesFotoIni, setEntregablesVideo, setEntregablesFoto }) => {
  const [entregablesVideo, setEntregablesVideoIn] = useState<any[]>([]);
  const [entregablesFoto, setEntregablesFotoIn] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntregable, setCurrentEntregable] = useState<any | null>(null);
  const [indexId, setIndexId] = useState('');

  useEffect(() => {
    setEntregablesVideoIn(entregablesVideoIni);
    setEntregablesFotoIn(entregablesFotoIni);
  }, [entregablesVideoIni, entregablesFotoIni]);

  const handleEdit = (entregable: any, index: number, type: 'video' | 'foto') => {
    setCurrentEntregable({ ...entregable, id: index, type });
    setIndexId(index.toString());
    setIsModalOpen(true);
  };

  const handleDelete = (index: number, type: 'video' | 'foto') => {
    if (type === 'video') {
      const updatedEntregables = entregablesVideo.filter((_, i) => i !== index);
      setEntregablesVideoIn(updatedEntregables);
      setEntregablesVideo(updatedEntregables);
    } else {
      const updatedEntregables = entregablesFoto.filter((_, i) => i !== index);
      setEntregablesFotoIn(updatedEntregables);
      setEntregablesFoto(updatedEntregables);
    }
  };

  return (
    <div className="w-full border border-gray-300 p-2.5">
      <h2 className="text-lg font-bold mb-4">Entregables de Video</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {entregablesVideo.map((entregable, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span>{entregable.version} {JSON.stringify(entregable.category)}</span>
            <div>
              <button onClick={(e) => {
                e.preventDefault();
                handleEdit(entregable, index, 'video');
              }} style={{ marginRight: '10px' }}>
                ✏️
              </button>
              <button onClick={(e) => {
                e.preventDefault();
                handleDelete(index, 'video');
              }}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-8 mb-4">Entregables de Foto</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {entregablesFoto.map((entregable, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span>{entregable.version} {JSON.stringify(entregable.category)}</span>
            <div>
              <button onClick={(e) => {
                e.preventDefault();
                handleEdit(entregable, index, 'foto');
              }} style={{ marginRight: '10px' }}>
                ✏️
              </button>
              <button onClick={(e) => {
                e.preventDefault();
                handleDelete(index, 'foto');
              }}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntregableList;