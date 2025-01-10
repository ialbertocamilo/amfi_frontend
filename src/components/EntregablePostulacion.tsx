import { Fragment, useState } from 'react';
import { FaEdit, FaExclamationCircle, FaTrash } from 'react-icons/fa';

interface Entregable {
    id: string;
    titulo: string;
    duracion: number;
    formato: string;
    lift: string;
    descripcion: string;
}

const EntregablePostulacion = ({
    entregables = [],
    setEntregables,
}: {
    entregables: Entregable[];
    setEntregables: React.Dispatch<React.SetStateAction<Entregable[]>>;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const initialData={
        id: '',
        titulo: '',
        duracion: 0,
        formato: '',
        lift: '',
        descripcion:''
    }
    const [formData, setFormData] = useState<Entregable>(initialData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddEntregable = () => {
        const newEntregable = {
            ...formData,
            id: editingId || Date.now().toString()
        };

        if (editingId) {
            setEntregables(entregables.map(e => e.id === editingId ? newEntregable : e));
            setEditingId(null);
        } else {
            setEntregables([...entregables, newEntregable]);
        }

        setFormData(initialData);
        setIsModalOpen(false);
    };

    const handleEdit = (entregable: Entregable) => {
        setFormData(entregable);
        setEditingId(entregable.id);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setEntregables(entregables.filter(e => e.id !== id));
    };

    return (
        <Fragment>

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Entregables ({entregables.length})</h2>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    Agregar Entregable
                </button>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
                <div className="space-y-6">
                    <div className="space-y-4">
                        {!Array.isArray(entregables) || entregables?.length === 0 ? (
                            <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                                <FaExclamationCircle className="mr-2" style={{ color: '#4B9AA5' }} />
                                No hay entregables agregados
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {entregables?.map((entregable) => (
                                    <div key={entregable.id} className="flex justify-between items-center p-4 border rounded">
                                        <div>
                                            <h3 className="font-bold">{entregable.titulo}</h3>
                                            <p>Duración: {entregable.duracion}</p>
                                            <p>Formato: {entregable.formato}</p>
                                            <p>Lift: {entregable.lift}</p>
                                            <p>Descripción: {entregable.descripcion}</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleEdit(entregable)}
                                                className="text-blue-500"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(entregable.id)}
                                                className="text-red-500"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-96">
                                    <h2 className="text-lg font-bold mb-4">
                                        {editingId ? 'Editar' : 'Agregar'} Entregable
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Título
                                            </label>
                                            <input
                                                type="text"
                                                name="titulo"
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                value={formData.titulo}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Duración
                                            </label>
                                            <input
                                                type="number"
                                                name="duracion"
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                value={formData.duracion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Formato
                                            </label>
                                            <input
                                                type="text"
                                                name="formato"
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                value={formData.formato}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Lift
                                            </label>
                                            <input
                                                type="text"
                                                name="lift"
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                value={formData.lift}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Descripción
                                            </label>
                                            <input
                                                type="text"
                                                name="descripcion"
                                                className="mt-1 block w-full p-2 border rounded-md"
                                                value={formData.descripcion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingId(null);
                                                setFormData(initialData);
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={handleAddEntregable}
                                        >
                                            {editingId ? 'Guardar' : 'Agregar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div></div>

        </Fragment>
    );
};

export default EntregablePostulacion;