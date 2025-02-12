import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AddEntregableModalFoto from './Proyecto/AddEntregableModalFoto';
import AddEntregableModalLocutor from './Proyecto/AddEntregableModalLocutor';
import AddEntregableModalVideo from './Proyecto/AddEntregableModalVideo';
import EntregableList from './Proyecto/EntregableList';

interface EntregablesProps {
  initialEntregables?: any[];
  onEntregablesChange?: (entregables: any[]) => void;
}

const Entregables: React.FC<EntregablesProps> = ({
  initialEntregables = [],
  onEntregablesChange
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);
  const [isLocutorModalOpen, setIsLocutorModalOpen] = useState(false);
  const [entregablesVideo, setEntregablesVideo] = useState([]);
  const [entregablesFoto, setEntregablesFoto] = useState([]);
  const [entregablesLocutor, setEntregablesLocutor] = useState([]);
  const [formData, setFormData] = useState({ videos: 0, photos: 0, locutor: 0 });
  const [totalNumber, setTotalNumber] = useState(0);

  useEffect(() => {
    if (initialEntregables && initialEntregables?.length > 0) {
      const videos = initialEntregables.filter(e => e.type === 'video') || [];
      const fotos = initialEntregables.filter(e => e.type === 'foto') || [];
      const locutores = initialEntregables.filter(e => e.type === 'locutor') || [];

      setEntregablesVideo(videos as typeof entregablesVideo);
      setEntregablesFoto(fotos as typeof entregablesFoto);
      setEntregablesLocutor(locutores as typeof entregablesLocutor);
    }
  }, [initialEntregables]);
  useEffect(() => {
    const newFormData = {
      videos: entregablesVideo.length,
      photos: entregablesFoto.length,
      locutor: entregablesLocutor.length > 0 ? (entregablesLocutor[entregablesLocutor.length - 1] as { cantidad: number })?.cantidad : 0
    };

    setFormData(newFormData);
    setTotalNumber(newFormData.videos + newFormData.photos + newFormData.locutor);

    // Only update parent if the callback exists and there are actual changes
    if (onEntregablesChange) {
      const allEntregables = [
        ...entregablesVideo.map(e => ({ ...(e as object), type: 'video' })),
        ...entregablesFoto.map(e => ({ ...(e as object), type: 'foto' })),
        ...entregablesLocutor.map(e => ({ ...(e as object), type: 'locutor' }))
      ];

      // Use requestAnimationFrame to prevent rapid successive updates
      requestAnimationFrame(() => {
        onEntregablesChange(allEntregables);
      });
    }
  }, [entregablesVideo, entregablesFoto, entregablesLocutor]);

  const handleEntregableUpdate = (type: string, updatedEntregables: any[]) => {
    switch (type) {
      case 'video':
        setEntregablesVideo(updatedEntregables as React.SetStateAction<typeof entregablesVideo>);
        break;
      case 'foto':
        setEntregablesFoto(updatedEntregables as React.SetStateAction<typeof entregablesFoto>);
        break;
      case 'locutor':
        setEntregablesLocutor(updatedEntregables as React.SetStateAction<typeof entregablesLocutor>);
        break;
    }
  };

  return (
    <div className="text-left">
      {entregablesVideo.length > 0 || entregablesFoto.length > 0 || entregablesLocutor.length > 0 ? (
        <EntregableList
          entregablesVideoIni={entregablesVideo}
          entregablesFotoIni={entregablesFoto}
          entregablesLocutorIni={entregablesLocutor}
          setEntregablesVideo={setEntregablesVideo}
          setEntregablesFoto={setEntregablesFoto}
          setEntregablesLocutor={setEntregablesLocutor}
          onUpdate={handleEntregableUpdate}
        />
      ) : (
        <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
          <FaExclamationCircle className="mr-2" style={{ color: '#4B9AA5' }} />
          Aquí puedes agregar tus entregables.
        </div>
      )}

      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 mr-2 mt-4 rounded"
        onClick={() => setIsVideoModalOpen(true)}
      >
        Agregar Video
      </button>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 mr-2 mt-4 rounded"
        onClick={() => setIsFotoModalOpen(true)}
      >
        Agregar Foto
      </button>
      <button
        type="button"
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => setIsLocutorModalOpen(true)}
      >
        Agregar Locutor
      </button>

      <AddEntregableModalVideo
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
        }}
        listaEntregables={entregablesVideo}
        setListaEntregables={(updatedEntregables) => {
          setEntregablesVideo(updatedEntregables);
          handleEntregableUpdate('video', updatedEntregables);
        }}
        entregable={null}
      />
      <AddEntregableModalFoto
        isOpen={isFotoModalOpen}
        onClose={() => {
          setIsFotoModalOpen(false);
        }}
        listaEntregables={entregablesFoto}
        setListaEntregables={(updatedEntregables) => {
          setEntregablesFoto(updatedEntregables);
          handleEntregableUpdate('foto', updatedEntregables);
        }}
        entregable={null}
      />
      <AddEntregableModalLocutor
        isOpen={isLocutorModalOpen}
        onClose={() => {
          setIsLocutorModalOpen(false);
        }}
        listaEntregables={entregablesLocutor}
        setListaEntregables={(updatedEntregables) => {
          setEntregablesLocutor(updatedEntregables);
          handleEntregableUpdate('locutor', updatedEntregables);
        }}
        entregable={null}
      />

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <label
            htmlFor="videos"
            className="block text-sm font-medium text-gray-700 w-1/4"
          >
            Video
          </label>
          <input
            type="number"
            id="videos"
            name="videos"
            readOnly
            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
            placeholder="Descripción aquí"
            value={formData.videos}
          />
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700 w-1/4"
          >
            Foto
          </label>
          <input
            type="number"
            id="photos"
            name="photos"
            readOnly
            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
            placeholder="Descripción aquí"
            value={formData.photos}
          />
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="locutor"
            className="block text-sm font-medium text-gray-700 w-1/4"
          >
            Locutor
          </label>
          <input
            type="number"
            id="locutor"
            name="locutor"
            readOnly
            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
            placeholder="Descripción aquí"
            value={formData.locutor}
          />
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700 w-1/4"
          >
            Total
          </label>
          <input
            type="number"
            id="total"
            name="total"
            readOnly
            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
            placeholder="Total"
            value={totalNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Entregables;