import EntregableList from '@/components/Proyecto/EntregableList';
import { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AddEntregableModal from './Proyecto/AddEntregableModal';
import AddEntregableModalFoto from './Proyecto/AddEntregableModalFoto';

type EntregablesProps = {
  projectId: string;
  total: number;
  setEntregables: React.Dispatch<React.SetStateAction<any[]>>;
  entregables: any[];
  handleChange: (e) => void;
  formData: any;
};

const Entregables = ({
                       projectId,
                       entregables,
                       setEntregables,
                       total,
                       handleChange,
                       formData,
                     }: EntregablesProps) => {
  const [videoCount, setVideoCount] = useState(formData?.videos || 0);
  const [photoCount, setPhotoCount] = useState(formData?.photos || 0);
  const [totalNumber, setTotalNumber] = useState(total || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFotoModalOpen, setIsFotoModalOpen] = useState(false);

  const handleAddEntregable = (entregable: any) => {
    const updatedEntregable = [...entregables, entregable];
    setEntregables(updatedEntregable);
  };

  const updateEntregable = (entregable: any) => {
    setEntregables(entregable);
  };


  useEffect(() => {
    console.log('Adding ');
    const total = Number(videoCount) + Number(photoCount) + (Number(formData.locutor) || 0);
    handleChange({ target: { name: 'total', value: total } });
    setTotalNumber(total);
  }, [formData.videos, formData.photos, formData.locutor]);

  const handleAddEntregableFoto = (entregable: any) => {
    const newPhotoCount = Number(photoCount) + 1;
    setPhotoCount(newPhotoCount);
    handleChange({ target: { name: 'photos', value: newPhotoCount ? Number(newPhotoCount) : undefined } as any });
    handleAddEntregable(entregable);
  };

  const handleAddEntregableVideo = (entregable: any) => {
    const newVideoCount = Number(videoCount) + 1;
    setVideoCount(newVideoCount);
    handleChange({ target: { name: 'videos', value: newVideoCount ? Number(newVideoCount) : undefined } as any });
    handleAddEntregable(entregable);
  };


  return (
    <div className="text-left">
      {entregables.length > 0 ? (
        <EntregableList entregablesIni={entregables} setEntregables={updateEntregable} />
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
      <div>
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
            value={formData?.videos || 0}
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
            value={formData?.photos || 0}
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
            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md"
            placeholder="Descripción aquí"
            value={formData.locutor}
            onChange={handleChange}
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
            onChange={(e) => setTotalNumber(Number(e.target.value))}
          />
        </div>
      </div>
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