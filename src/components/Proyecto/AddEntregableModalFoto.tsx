import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Switch } from '@headlessui/react';
import styles from './AddEntregableModal.module.css';
import toast from 'react-hot-toast';

type AddEntregableModalFotoProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: ((data: EntregableFoto) => void) | null;
    onUpdate: ((entregable: EntregableFoto) => void) | null;
    entregable: EntregableFoto | null;
};

interface EntregableFoto {
    version: string;
    cantidad: number;
    fechaEntrega: string;
    medios: string;
    resolucion: string;
    tamano: string;
    tipoEncuadre: string;
    tipoPost: string;
    tipoArchivo: string;
    espacioColor: string;
    especificaciones: string;
    notas: string;
}

const renderSwitch = (label: string, checked: boolean, onChange: (value: boolean) => void) => (
    <div className="flex items-center mb-4 w-1/2">
        <div className="ml-5 mt-2 w-2/5">
            <Switch
                checked={checked}
                name={label}
                onChange={onChange}
                className={`${checked ? 'bg-red-500' : 'bg-gray-200'}
                            relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
            >
                <span
                    className={`${checked ? 'translate-x-6' : 'translate-x-1'}
                                inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
            </Switch>
        </div>
    </div>
);

const AddEntregableModalFoto = ({ isOpen, onClose, onAdd, entregable, onUpdate }: AddEntregableModalFotoProps) => {
    const [state, setState] = useState<EntregableFoto>({
        version: '',
        cantidad: 1,
        fechaEntrega: '',
        medios: '',
        resolucion: '',
        tamano: '',
        tipoEncuadre: '',
        tipoPost: '',
        tipoArchivo: '',
        espacioColor: '',
        especificaciones: '',
        notas: ''
    });

    const handleClear = () => {
        setState({
            version: '',
            cantidad: 1,
            fechaEntrega: '',
            medios: '',
            resolucion: '',
            tamano: '',
            tipoEncuadre: '',
            tipoPost: '',
            tipoArchivo: '',
            espacioColor: '',
            especificaciones: '',
            notas: ''
        });
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAdd = (closeAfter: boolean) => {


        const areFieldsFilled = Object.values(state).every(value => value !== '');

        if (!areFieldsFilled) {
            toast.error('Todos los campos deben estar llenos');
            return;
        }
        if (onAdd) {
            onAdd(state);
            if (closeAfter) {
                onClose();
            } else {
                handleClear();
            }
        }
    };

    if (!isOpen) return null;

    return (createPortal(
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className="text-2xl text-black font-bold">
                        {onAdd ? 'Agregar Entregables' : 'Editar Entregable'}
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <span className="text-sm text-gray-400">Asegurate de configurar todas las opciones.</span>

                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>
                            Versión
                            <input className="border p-2 rounded" type="text" name="version" value={state.version} onChange={handleChange} placeholder="Versión" />
                        </label></div>
                    <div className={styles.formGroup}>
                        <label>
                            Cantidad
                            <input className="border p-2 rounded" type="number" name="cantidad" value={state.cantidad} onChange={handleChange} placeholder="Cantidad" />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Fecha entrega
                            <input className="border p-2 rounded" type="date" name="fechaEntrega" value={state.fechaEntrega} onChange={handleChange} placeholder="Fecha entrega" />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Medios
                            <input className="border p-2 rounded" type="text" name="medios" value={state.medios} onChange={handleChange} placeholder="Medios" />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Resolución (dpi&apos;s)
                            <input className="border p-2 rounded" type="text" name="resolucion" value={state.resolucion} onChange={handleChange} placeholder="Resolución (dpi's)" />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Tamaño (pixeles)
                            <input className="border p-2 rounded" type="text" name="tamano" value={state.tamano} onChange={handleChange} placeholder="Tamaño (pixeles)" />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Tipo de encuadre
                            <select className="border p-2 rounded" name="tipoEncuadre" value={state.tipoEncuadre} onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="cuadrado">Cuadrado</option>
                                <option value="horizontal">Horizontal</option>
                                <option value="vertical">Vertical</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Tipo de post
                            <select className="border p-2 rounded" name="tipoPost" value={state.tipoPost} onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="retoqueCosmetico">Retoque Cosmético</option>
                                <option value="integracion">Integración</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Tipo de archivo
                            <select className="border p-2 rounded" name="tipoArchivo" value={state.tipoArchivo} onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="PSD(capas)">PSD (capas)</option>
                                <option value="TIF">TIF</option>
                                <option value="PNG">PNG</option>
                                <option value="JPG">JPG</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label>
                            Espacio de color
                            <select className="border p-2 rounded" name="espacioColor" value={state.espacioColor} onChange={handleChange}>
                                <option value="">Seleccionar</option>
                                <option value="rec2020">Rec.2020</option>
                                <option value="dci">DCI-P3</option>
                                <option value="rec709">Rec.709</option>
                                <option value="srgb">sRGB</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        Especificaciones (recorte, capas, fondos, etc)
                        <textarea className="border p-2 rounded w-full" name="especificaciones" value={state.especificaciones} onChange={handleChange} placeholder="Especificaciones (recorte, capas, fondos, etc)" />
                    </div>
                    <div className={styles.formGroup}>
                        Notas

                        <textarea className="border p-2 rounded w-full" name="notas" value={state.notas} onChange={handleChange} placeholder="Notas" />
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    {onAdd && (
                        <button
                            className={styles.secondaryButton}
                            onClick={() => handleAdd(false)}
                        >
                            Aceptar y agregar otro
                        </button>
                    )}
                    <button
                        className={styles.primaryButton}
                        onClick={() => {
                            if (onUpdate) {
                                onUpdate(state);
                            } else {
                                handleAdd(true);
                            }
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
    );
};

export default AddEntregableModalFoto;