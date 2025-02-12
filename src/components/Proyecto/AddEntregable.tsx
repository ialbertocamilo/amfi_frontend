import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import styles from './AddEntregableModal.module.css';

type EntregableModalProps = {
    isOpen: boolean;
    onClose: () => void;
    listaEntregables: any[];
    setListaEntregables: (lista: any[]) => void;
    entregable: any | null;
    campos: Field[];
};

export type Field = {
    etiqueta: string;
    nombre: string;
    tipo: 'number' | 'date' | 'select' | 'text' | 'switch' | 'textarea';
    opciones?: { value: string; label: string }[];
};

const CampoEntrada = ({ etiqueta, nombre, valor, onChange, tipo = 'text', placeholder = '', required = true }) => {
    const isError = required && valor === '';
    return (
        <div className={styles.formGroup}>
            <label>{etiqueta}</label>
            <input
                type={tipo}
                name={nombre}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                className={`border p-2 rounded ${isError ? 'border-red-500' : ''}`}
            />
            {isError && (
                <span className="text-red-500 text-sm mt-1">
                    Este campo es requerido
                </span>
            )}
        </div>
    );
};

const CampoSeleccion = ({ etiqueta, nombre, valor, onChange, opciones, required = true }) => {
    const isError = required && valor === '';
    return (
        <div className={styles.formGroup}>
            <label>{etiqueta}</label>
            <select 
                name={nombre} 
                value={valor} 
                onChange={onChange} 
                className={`border p-2 rounded ${isError ? 'border-red-500' : ''}`}
            >
                {opciones.map((opcion, index) => (
                    <option key={index} value={opcion.value}>
                        {opcion.label}
                    </option>
                ))}
            </select>
            {isError && (
                <span className="text-red-500 text-sm mt-1">
                    Este campo es requerido
                </span>
            )}
        </div>
    );
};

const CampoAreaTexto = ({ etiqueta, nombre, valor, onChange, filas = 2, required = true }) => {
    const isError = required && valor === '';
    return (
        <div className={styles.formGroup}>
            <label>{etiqueta}</label>
            <textarea
                name={nombre}
                value={valor}
                onChange={onChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md ${isError ? 'border-red-500' : ''}`}
                rows={filas}
            />
            {isError && (
                <span className="text-red-500 text-sm mt-1">
                    Este campo es requerido
                </span>
            )}
        </div>
    );
};

const SwitchField = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-center mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 w-1/4 text-center">{label}</label>
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

const EntregableModal = ({ isOpen, onClose, listaEntregables, setListaEntregables, entregable, campos }: EntregableModalProps) => {
    const estadoInicial = campos.reduce((acc, campo) => {
        acc[campo.nombre] = campo.tipo === 'switch' ? false : '';
        return acc;
    }, {});

    const [estado, setEstado] = useState<any>(estadoInicial);


    const manageClose = (e?:any) => {
        e?.preventDefault()
        if (onClose) onClose();
    };

    useEffect(() => {
        if (entregable) {
            setEstado(entregable);
        }
    }, [entregable]);

    const manejarAgregar = () => {
        const camposRequeridos = campos.filter(campo => campo.tipo !== 'switch');
        const camposCompletos = camposRequeridos.every(campo => estado[campo.nombre] !== '');

        if (!camposCompletos) {
            toast.error('Por favor, complete todos los campos antes de agregar.');
            return;
        }

        const nuevoEntregable = { ...estado };
        const nuevaLista = [...listaEntregables, nuevoEntregable];
        setListaEntregables(nuevaLista);

        manejarLimpiar();
    };

    const manejarLimpiar = () => {
        setEstado(estadoInicial);
    };

    const manejarClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            manageClose();
        }
    };

    if (!isOpen) return null;

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setEstado((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return createPortal(
        <div className={styles.modalOverlay}  onClick={manejarClickOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className="text-2xl text-black font-bold">
                        {entregable ? 'Editar Entregable' : 'Agregar Entregables'}
                    </h2>
                    <button className={styles.closeButton} onClick={manageClose}>
                        ×
                    </button>
                </div>
                <span className="text-sm text-gray-400">Asegurate de configurar todas las opciones.</span>

                <div className={styles.modalBody}>
                    {campos.map((campo) => {
                        switch (campo.tipo) {
                            case 'text':
                            case 'number':
                            case 'date':
                                return (
                                    <CampoEntrada
                                        key={campo.nombre}
                                        etiqueta={campo.etiqueta}
                                        nombre={campo.nombre}
                                        valor={estado[campo.nombre]}
                                        onChange={manejarCambio}
                                        tipo={campo.tipo}
                                    />
                                );
                            case 'select':
                                return (
                                    <CampoSeleccion
                                        key={campo.nombre}
                                        etiqueta={campo.etiqueta}
                                        nombre={campo.nombre}
                                        valor={estado[campo.nombre]}
                                        onChange={manejarCambio}
                                        opciones={campo.opciones || []}
                                    />
                                );
                            case 'textarea':
                                return (
                                    <CampoAreaTexto
                                        key={campo.nombre}
                                        etiqueta={campo.etiqueta}
                                        nombre={campo.nombre}
                                        valor={estado[campo.nombre]}
                                        onChange={manejarCambio}
                                        
                                    />
                                );
                            case 'switch':
                                return (
                                    <SwitchField
                                        key={campo.nombre}
                                        label={campo.etiqueta}
                                        checked={estado[campo.nombre]}
                                        onChange={(value) => setEstado({ ...estado, [campo.nombre]: value })}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
                <div className={styles.modalFooter}>
                    <button
                        className={styles.primaryButton}
                        onClick={(e) => {
                            e.preventDefault();
                            manejarAgregar();
                            toast.success('Entregable agregado exitosamente.');
                        }}
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>,
        document.body
        )
};

export default EntregableModal;