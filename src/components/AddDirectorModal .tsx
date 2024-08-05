import React, { useEffect, useState } from 'react';
import styles from './AddDirectorModal.module.css';
import { Director } from '@/entities/Director';

type AddDirectorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: ((data: any) => void) | null;
    onUpdate: ((director: Director) => void) | null;
    director: Director | null;
};

const AddDirectorModal = ({ isOpen, onClose, onAdd, director, onUpdate }: AddDirectorModalProps) => {
    const [name, setName] = useState('');
    const [nationality, setNationality] = useState('');
    const [residesInMexico, setResidesInMexico] = useState(false);
    const [birthYear, setBirthYear] = useState('');

    useEffect(() => {
        console.log('useEffect triggered');
        if (director) {
            console.log('director data', director);
            setName(director?.name || '');
            setNationality(director?.nationality || '');
            setResidesInMexico(director?.residesInMexico || false);
            setBirthYear(director?.birthYear || '');
        }
    }, [director]);

    const handleAdd = (saveAndClose: boolean) => {
        if (onAdd) {
            onAdd({
                name: name,
                nationality: nationality,
                residesInMexico: residesInMexico,
                birthYear: birthYear,
                id: null
            });
            handleClear();
            if (saveAndClose) {
                onClose();
            }
        }
    };

    const handleClear = () => {
        setName('');
        setNationality('');
        setResidesInMexico(false);
        setBirthYear('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Agregar(1)</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className={styles.modalBody}>
                    <p>Ingresa los datos del director</p>
                    <div className={styles.formGroup}>
                        <label>Nombre y apellidos oficiales del Director representado</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Nacionalidad</label>
                        <select
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="Mexicana">Mexicana</option>
                            {/* Agregar más opciones según sea necesario */}
                        </select>
                    </div>
                    <div className={styles.inlineGroup}>
                        <label>¿Reside en México?</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    checked={residesInMexico}
                                    onChange={() => setResidesInMexico(true)}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={!residesInMexico}
                                    onChange={() => setResidesInMexico(false)}
                                />
                                No
                            </label>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Año de nacimiento del Director</label>
                        <input
                            type="text"
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            placeholder="Elige el año"
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
                                    name: name,
                                    nationality: nationality,
                                    residesInMexico: residesInMexico,
                                    birthYear: birthYear,
                                    id: director?.id || null
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

export default AddDirectorModal;