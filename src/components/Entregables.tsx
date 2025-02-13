import React, { useEffect, useMemo, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import AddEntregableModalFoto from './Proyecto/AddEntregableModalFoto';
import AddEntregableModalLocutor from './Proyecto/AddEntregableModalLocutor';
import AddEntregableModalVideo from './Proyecto/AddEntregableModalVideo';
import EntregableList from './Proyecto/EntregableList';

interface EntregablesProps {
    initialEntregables?: any[];
    onEntregablesChange?: (entregables: any[]) => void;
    disabled?: boolean;
}

const Entregables: React.FC<EntregablesProps> = ({
                                                     initialEntregables = [],
                                                     onEntregablesChange,
                                                     disabled = true
                                                 }) => {
    // Define types for entregables
    type Entregable = {
        type: 'video' | 'foto' | 'locutor';
        cantidad?: number;
        [key: string]: any;
    };

    // Unified modal state management
    const [modalState, setModalState] = useState({
        video: false,
        foto: false,
        locutor: false
    });

    // Unified entregables state management
    const [entregables, setEntregables] = useState<{
        video: Entregable[];
        foto: Entregable[];
        locutor: Entregable[];
    }>({
        video: [],
        foto: [],
        locutor: []
    });

    const [formData, setFormData] = useState({ videos: 0, photos: 0, locutor: 0 });
    const [totalNumber, setTotalNumber] = useState(0);

    // Initialize entregables from props
    useEffect(() => {
        if (initialEntregables?.length > 0) {
            const categorizedEntregables = initialEntregables.reduce((acc, item) => ({
                ...acc,
                [item.type]: [...(acc[item.type] || []), item]
            }), { video: [], foto: [], locutor: [] });

            setEntregables(categorizedEntregables);
        }
    }, [initialEntregables]);

    // Update form data and notify parent
    useEffect(() => {
        const newFormData = {
            videos: entregables.video.length,
            photos: entregables.foto.length,
            locutor: entregables.locutor.length > 0 ? entregables.locutor[entregables.locutor.length - 1]?.cantidad || 0 : 0
        };

        setFormData(newFormData);
        setTotalNumber(newFormData.videos + newFormData.photos + newFormData.locutor);

        if (onEntregablesChange) {
            const allEntregables = Object.entries(entregables).flatMap(([type, items]) =>
                items.map(item => ({ ...item, type }))
            );

            requestAnimationFrame(() => onEntregablesChange(allEntregables));
        }
    }, [entregables, onEntregablesChange]);

    const handleEntregableUpdate = (type: string, updatedEntregables: Entregable[]) => {
        setEntregables(prev => ({
            ...prev,
            [type]: updatedEntregables
        }));
    };

    const memoizedEntregableList = useMemo(() => (
        <EntregableList
            entregablesVideoIni={entregables.video}
            entregablesFotoIni={entregables.foto}
            entregablesLocutorIni={entregables.locutor}
            setEntregablesVideo={(items: Entregable[]) => handleEntregableUpdate('video', items)}
            setEntregablesFoto={(items: Entregable[]) => handleEntregableUpdate('foto', items)}
            setEntregablesLocutor={(items: Entregable[]) => handleEntregableUpdate('locutor', items)}
            onUpdate={handleEntregableUpdate}
            disabled={disabled}
        />
    ), [entregables, disabled]);

    const memoizedModals = useMemo(() => (
        <React.Fragment>
            {Object.entries({
                video: AddEntregableModalVideo,
                foto: AddEntregableModalFoto,
                locutor: AddEntregableModalLocutor
            }).map(([type, Modal]) => (
                <Modal
                    key={type}
                    isOpen={modalState[type]}
                    onClose={() => setModalState(prev => ({ ...prev, [type]: false }))}
                    listaEntregables={entregables[type]}
                    setListaEntregables={(updated) => handleEntregableUpdate(type, updated)}
                    entregable={null}
                />
            ))}
        </React.Fragment>
    ), [modalState, entregables, disabled]);

    // Memoize the form inputs section
    const memoizedFormInputs = useMemo(() => (
        <div className="mt-8">
            <div className="flex items-center mb-4">
                <label htmlFor="videos" className="block text-sm font-medium text-gray-700 w-1/4">
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
                <label htmlFor="photos" className="block text-sm font-medium text-gray-700 w-1/4">
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
                <label htmlFor="locutor" className="block text-sm font-medium text-gray-700 w-1/4">
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
                <label htmlFor="total" className="block text-sm font-medium text-gray-700 w-1/4">
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
    ), [formData, totalNumber]);

    return (
        <div className="text-left">
            {entregables.video.length > 0 || entregables.foto.length > 0 || entregables.locutor.length > 0 ? (
                memoizedEntregableList
            ) : (
                <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                    <FaExclamationCircle className="mr-2" style={{ color: '#4B9AA5' }} />
                    Aquí puedes agregar tus entregables.
                </div>
            )}

            {!disabled && (
                <>
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 mr-2 mt-4 rounded"
                        onClick={() => setModalState(prev => ({ ...prev, video: true }))}
                    >
                        Agregar Video
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 mr-2 mt-4 rounded"
                        onClick={() => setModalState(prev => ({ ...prev, foto: true }))}
                    >
                        Agregar Foto
                    </button>
                    <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                        onClick={() => setModalState(prev => ({ ...prev, locutor: true }))}
                    >
                        Agregar Locutor
                    </button>
                </>
            )}

            {memoizedModals}
            {memoizedFormInputs}
        </div>
    );
};

export default Entregables;