import React, { useEffect, useState } from 'react';
import styles from './AddEntregableModal.module.css';
import { FaExclamationCircle } from "react-icons/fa";
import { Switch } from '@headlessui/react';

type AddEntregableModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: ((data: any) => void) | null;
    onUpdate: ((entregable: any) => void) | null;
    entregable: any | null;
};

const AddEntregableModal = ({ isOpen, onClose, onAdd, entregable, onUpdate }: AddEntregableModalProps) => {

    const [timer, setTimer] = useState<any>(null);
    const [version, setVersion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [duracion, setDuracion] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [locutor, setLocutor] = useState(false);
    const [descripcionEntregable, setDescripcionEntregable] = useState('');
    const [tipo, setTipo] = useState('');



    useEffect(() => {
        if (entregable) {
            setVersion(entregable?.version || '');
            setDuracion(entregable?.duracion || '');
            setLocutor(entregable?.locutor || false);
            setDescripcionEntregable(entregable?.descripcionEntregable || '');
            setTipo(entregable?.tipo || '');
            setFechaEntrega(entregable?.fechaEntrega || '');
            setCantidad(entregable?.cantidad || 1);
        }
    }, [entregable]);

    const handleAdd = (saveAndClose: boolean) => {
        if (onAdd) {
            onAdd({
                version: version,
                fechaEntrega: fechaEntrega,
                cantidad: cantidad,
                tipo: tipo,
                duracion: duracion,
                locutor: locutor,
                descripcionEntregable: descripcionEntregable,
                id: null
            });
            handleClear();
            if (saveAndClose) {
                onClose();
            }
        }
    };

    const handleClear = () => {
        setVersion('');
        setDuracion('');
        setLocutor(false);
        setDescripcionEntregable('');
        setTipo('');
        setFechaEntrega('');
        setCantidad(1);
    };


    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className="text-2xl text-black font-bold">Agregar Entregables</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <span className="text-sm text-gray-400">Asegurate de configurar todas las opciones.</span>
                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Versión</label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className={styles.formGroup + " w-1/2"}>
                            <label>Fecha de entrega</label>
                            <input
                                type="date"
                                value={fechaEntrega}
                                onChange={(e) => setFechaEntrega(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup + " w-1/2"}>
                            <label>Duración </label>
                            <select
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)}
                            >
                                <option value="">Seleccionar</option>
                                <option value="1">Opcion 1</option>
                                <option value="2">Opcion 2</option>
                                <option value="3">Opcion 3</option>
                                <option value="4">Opcion 4</option>
                                {/* Agregar más opciones según sea necesario */}
                            </select>
                        </div>
                    </div>
                    <div className={styles.inlineGroup}>
                        <label>Locutor</label>
                        <div className="mt-2">
                            <Switch
                                checked={locutor}
                                onChange={setLocutor}
                                className={`${locutor ? 'bg-red-500' : 'bg-gray-200'}
                            relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                            >
                                <span
                                    className={`${locutor ? 'translate-x-6' : 'translate-x-1'}
                            inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                />
                            </Switch>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className={styles.formGroup + " w-1/2"}>
                            <label>Cantidad</label>
                            <select
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>

                        <div className={styles.formGroup + " w-1/2"}>
                            <label>Tipo</label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Descripcion</label>
                        <textarea
                            value={descripcionEntregable}
                            onChange={(e) => setDescripcionEntregable(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            rows={2}
                        />
                    </div>

                </div>
                <div className={styles.modalFooter}>
                    {onAdd && (
                        <button className={styles.secondaryButton} onClick={() => handleAdd(false)}>
                            Aceptar y agregar otro
                        </button>
                    )}
                    <button
                        className={styles.primaryButton}
                        onClick={() => {
                            if (onUpdate) {
                                onUpdate({
                                    version: version,
                                    duracion: duracion,
                                    locutor: locutor,
                                    descripcionEntregable: descripcionEntregable,
                                    id: entregable?.id || null,
                                    fechaEntrega: fechaEntrega,
                                    tipo: tipo,
                                    cantidad: Number(cantidad)
                                });
                            } else {
                                handleAdd(true);
                            }
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEntregableModal;