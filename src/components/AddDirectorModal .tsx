import React, {useEffect, useState} from 'react';
import styles from './AddDirectorModal.module.css';
import {Director} from '@/entities/Director';
import {api} from "@/lib/api";
import {FaExclamationCircle} from "react-icons/fa";

type AddDirectorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: ((data: any) => void) | null;
    onUpdate: ((director: Director) => void) | null;
    director: Director | null;
};

const AddDirectorModal = ({isOpen, onClose, onAdd, director, onUpdate}: AddDirectorModalProps) => {

    const [timer, setTimer] = useState<any>(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationality, setNationality] = useState('');
    const [typeRepresentative, setTypeRepresentative] = useState(1);
    const [residesInMexico, setResidesInMexico] = useState(false);
    const [birthYear, setBirthYear] = useState('');
    const [directionYear, setDirectionYear] = useState('');

    const [representationAlert, setRepresentationAlert] = useState(false)

    const [representationString, setRepresentationString] = useState('')
    useEffect(() => {
        if (name && lastName && birthYear && nationality){

        if (timer) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(() => {
                api.post('/director', {
                    "name": name,
                    "lastname": lastName,
                    "birthDate": birthYear,
                    "nationality": nationality
                }).then(data=>{
                    console.log(data.data?.content)
                    switch (data.data?.content)
                    {
                        case 'freelance': setRepresentationString('Freelance');break
                        case 'represented': setRepresentationString('Representado');break
                        case 'co-represented': setRepresentationString('Co-representado');break
                    }
                    setRepresentationAlert(true)
                })
            }, 1000)
        );
        }
    }, [name, lastName, birthYear, nationality]);

    useEffect(() => {
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
                lastName: lastName,
                typeRepresentative: typeRepresentative,
                directionYear: directionYear,
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

    const RepresentationComponent=()=>{
        if (representationAlert) {
            return <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                <FaExclamationCircle className="mr-2" style={{color: '#4B9AA5'}}/>
                Este director ya es un {representationString}.
            </div>
        }
        return <></>
    }
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
                    {representationAlert &&
                    <div className={styles.formGroup}>
                        <div className="bg-[#FFEDD5] rounded p-4 mb-2 flex items-center">
                            <FaExclamationCircle className="mr-2" style={{color: '#D8A25E'}}/>
                            Este director ya es un {representationString}.
                        </div>
                    </div>
                    }
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
                            <option value={1}>Freelance</option>
                            <option value={2}>Representado</option>
                            <option value={3}>Co-representado</option>
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