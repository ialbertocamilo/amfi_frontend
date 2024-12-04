import EntregableList from '@/components/Proyecto/EntregableList';
import { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AddEntregableModal from './Proyecto/AddEntregableModal';
import AddEntregableModalFoto from './Proyecto/AddEntregableModalFoto';

type EntregablesProps = {
  projectId: string;
  videos: number;
  photos: number;
  onVideoCountChange: (count: number) => void;
  onPhotoCountChange: (count: number) => void;
};

const Entregables = ({ projectId, videos, photos, onVideoCountChange, onPhotoCountChange }: EntregablesProps) => {
  const [videoCount, setVideoCount] = useState(videos);
  const [photoCount, setPhotoCount] = useState(photos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);
  const [entregables, setEntregables] = useState<any[]>([]);

  const handleAddEntregable = (entregable: any) => {
    const updatedEntregable = [...entregables, entregable];
    setEntregables(updatedEntregable);
  };

  const handleAddEntregableFoto = (entregable: any) => {
    const newPhotoCount = photoCount + 1;
    setPhotoCount(newPhotoCount);
    onPhotoCountChange(newPhotoCount);
    handleAddEntregable(entregable);
  };

  const handleAddEntregableVideo = (entregable: any) => {
    const newVideoCount = videoCount + 1;
    setVideoCount(newVideoCount);
    onVideoCountChange(newVideoCount);
    handleAddEntregable(entregable);
  };

  useEffect(() => {
    console.log(entregables);
  }, [entregables]);

  return (
    <div className="text-left">
      {entregables.length > 0 ? (
        <EntregableList entregablesIni={entregables} />
      ) : (
        <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
          <FaExclamationCircle className="mr-2" style={{ color: '#4B9AA5' }} />
          Aqui puedes agregar tus entregable.
        </div>
      )}

      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 mr-2 mt-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Video
      </button>
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => setIsFotoModalOpen(true)}
      >
        Agregar Foto
      </button>

      <AddEntregableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEntregableVideo}
        entregable={null}
        onUpdate={null}
      />
      <AddEntregableModalFoto
        isOpen={isFotoModalOpen}
        onClose={() => setIsFotoModalOpen(false)}
        onAdd={handleAddEntregableFoto}
        entregable={null}
        onUpdate={null}
      />
    </div>
  );
};

export default Entregables;