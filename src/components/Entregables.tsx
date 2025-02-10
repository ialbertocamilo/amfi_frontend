import React, { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AddEntregableModalFoto from './Proyecto/AddEntregableModalFoto';
import AddEntregableModalLocutor from './Proyecto/AddEntregableModalLocutor';
import AddEntregableModalVideo from './Proyecto/AddEntregableModalVideo';
import EntregableList from './Proyecto/EntregableList';

interface EntregablesProps {
  initialData?: {
    videos?: any[];
    photos?: any[];
    locutor?: any[];
  };
  onUpdate?: (data: any) => void;
}

const Entregables: React.FC<EntregablesProps> = ({ initialData, onUpdate }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);
  const [isLocutorModalOpen, setIsLocutorModalOpen] = useState(false);
  const [entregablesVideo, setEntregablesVideo] = useState(initialData?.videos || []);
  const [entregablesFoto, setEntregablesFoto] = useState(initialData?.photos || []);
  const [entregablesLocutor, setEntregablesLocutor] = useState(initialData?.locutor || []);
  const [formData, setFormData] = useState({ videos: 0, photos: 0, locutor: 0 });
  const [totalNumber, setTotalNumber] = useState(0);

  useEffect(() => {
    const total = Number(formData.videos) + Number(formData.photos) + Number(formData.locutor);
    setTotalNumber(total);
  }, [formData.videos, formData.photos, formData.locutor]);

  useEffect(() => {
    setFormData({
      videos: entregablesVideo.length,
      photos: entregablesFoto.length,
      locutor: entregablesLocutor.length,
    });

    if (onUpdate) {
      onUpdate({
        videos: entregablesVideo,
        photos: entregablesFoto,
        locutor: entregablesLocutor
      });
    }
  }, [entregablesVideo, entregablesFoto, entregablesLocutor]);

  useEffect(() => {
    if (initialData) {
      setEntregablesVideo(initialData.videos || []);
      setEntregablesFoto(initialData.photos || []);
      setEntregablesLocutor(initialData.locutor || []);
    }
  }, [initialData]);

  return (
    <div className="text-left">
      {entregablesVideo.length > 0 || entregablesFoto.length > 0 || entregablesLocutor.length > 0 ? (
        <EntregableList
          entregablesVideoIni={entregablesVideo}
          entregablesFotoIni={entregablesFoto}
          setEntregablesVideo={setEntregablesVideo}
          setEntregablesFoto={setEntregablesFoto}
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
        onClose={() => setIsVideoModalOpen(false)}
        listaEntregables={entregablesVideo}
        setListaEntregables={setEntregablesVideo}
        entregable={null}
      />
      <AddEntregableModalFoto
        isOpen={isFotoModalOpen}
        onClose={() => setIsFotoModalOpen(false)}
        listaEntregables={entregablesFoto}
        setListaEntregables={setEntregablesFoto}
        entregable={null}
      />
      <AddEntregableModalLocutor
        isOpen={isLocutorModalOpen}
        onClose={() => setIsLocutorModalOpen(false)}
        listaEntregables={entregablesLocutor}
        setListaEntregables={setEntregablesLocutor}
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