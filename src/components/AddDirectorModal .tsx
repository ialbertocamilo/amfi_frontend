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
    const [lastName, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [typeRepresentative, setTypeRepresentative] = useState(1);
    const [residesInMexico, setResidesInMexico] = useState(false);
    const [birthYear, setBirthYear] = useState('');
    const [directionYear, setDirectionYear] = useState('');


    useEffect(() => {
        console.log('director', director)
        if (director) {

            setName(director?.name || '');
            setNationality(director?.nationality || '');
            setResidesInMexico(director?.residesInMexico || false);
            setBirthYear(director?.birthYear || '');
            setDirectionYear(director?.directionYear || '');
            setLastName(director?.lastName || '');
            setTypeRepresentative(director?.typeRepresentative || 1);
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
        setDirectionYear('');
        setLastName('');
        setTypeRepresentative(1);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className="text-2xl text-black font-bold">Agregar Director</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <span className="text-sm text-gray-400">Ingresa información oficial, no uses apodos o nicknames.</span>
                <div className={styles.modalBody}>
                    <p>Ingresa los datos del director</p>
                    <div className={styles.formGroup}>
                        <label>Nombres</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Apellidos</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        <label>Tipo de representación</label>
                        <select
                            value={typeRepresentative}
                            onChange={(e) => setTypeRepresentative(Number(e.target.value))}
                        >
                            <option value={1}>Representación 1</option>
                            <option value={2}>Representación 2</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Año de nacimiento del Director</label>
                        <input
                            type="date"
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            placeholder="Elige el año"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>¿En qué año empezó a dirigir?</label>
                        <input
                            type="date"
                            value={directionYear}
                            onChange={(e) => setDirectionYear(e.target.value)}
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
                                    id: director?.id || null,
                                    lastName: lastName,
                                    directionYear: directionYear,
                                    typeRepresentative: Number(typeRepresentative)
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