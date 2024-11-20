import { CreateDirectorDto, UpdateDirectorDto } from "@/dto/create-director.dto";
import { CreateDirectorDTO } from "@/entities/CreateDirectorDTO";
import api from "@/lib/api";
import { ProjectMapper } from "@/mappers/project.mapper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";
import styles from "./AddDirectorModal.module.css";
import { COUNTRIES } from "./countries/countries";

type AddDirectorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: ((data: any) => void) | null;
  director: CreateDirectorDTO | null;
  onSave: (dto: CreateDirectorDto | UpdateDirectorDto) => void;
};

const AddDirectorModal2 = ({
  isOpen,
  onClose,
  onAdd,
  director,
  onSave,
}: AddDirectorModalProps) => {
  const [timer, setTimer] = useState<any>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [typeRepresentative, setTypeRepresentative] = useState("freelance");
  const [residesInMexico, setResidesInMexico] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [directionYear, setDirectionYear] = useState(0);

  const [representationAlert, setRepresentationAlert] = useState(false);

  const [representationString, setRepresentationString] = useState("");

  useEffect(() => {
    if (name && lastName && birthYear && nationality) {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          api
            .post("/director/getDirectorByCode", {
              name: name,
              lastname: lastName,
              birthDate: birthYear,
              nationality: nationality,
              isMexicanResident: residesInMexico,
              representation: typeRepresentative
            })
            .then((data) => {
              setRepresentationString(
                ProjectMapper.mapRepresentationType(data.data?.content)
              );
              setRepresentationAlert(true);
            }).catch((e) => {
              console.log('error', e)
            });
        }, 1000)
      );
    }
  }, [name, lastName, birthYear, nationality]);
  const validateFields = () => {
    if (!name) {
      toast.error('El nombre es obligatorio');
      return false;
    }
    if (!lastName) {
      toast.error('El apellido es obligatorio');
      return false;
    }
    if (!nationality) {
      toast.error('La nacionalidad es obligatoria');
      return false;
    }
    if (!birthYear) {
      toast.error('El año de nacimiento es obligatorio');
      return false;
    }
    if (!directionYear) {
      toast.error('El año de inicio de experiencia es obligatorio');
      return false;
    }
    if (!typeRepresentative) {
      toast.error('El tipo de representación es obligatorio');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    onSave({
      name: name,
      nationality: nationality,
      isMexicanResident: residesInMexico,
      birthDate: birthYear,
      id: director?.id || undefined,
      lastname: lastName,
      startedExperienceYear: directionYear,
      representation: typeRepresentative,
    });
  };
  useEffect(() => {
    if (director) {
      setName(director?.name || "");
      setNationality(director?.nationality || "");
      setResidesInMexico(!!director?.isMexicanResident || false);
      setBirthYear(director?.birthDate || "");
      setDirectionYear(Number(director?.directionYear) || 0);
      setLastName(director?.lastName || "");
      setTypeRepresentative(director?.representation || "freelance");
    }
  }, [director]);

  const handleAdd = (saveAndClose: boolean) => {
    if (onAdd) {
      onAdd({
        name: name,
        lastName: lastName,
        representation: typeRepresentative,
        directionYear: directionYear,
        nationality: nationality,
        residesInMexico: residesInMexico,
        birthYear: birthYear,
        id: null,
      });
      handleClear();
      if (saveAndClose) {
        onClose();
      }
    }
  };

  const handleClear = () => {
    setName("");
    setNationality("");
    setResidesInMexico(false);
    setBirthYear("");
    setDirectionYear(0);
    setLastName("");
    setTypeRepresentative("freelance");
  };

  const RepresentationComponent = () => {
    if (representationAlert && representationString) {
      return (
        <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
          <FaExclamationCircle className="mr-2" style={{ color: "#4B9AA5" }} />
          Este director ya es un {representationString}.
        </div>
      );
    }
    return <></>;
  };
  if (!isOpen) return null;


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className="text-2xl text-black font-bold">Agregar Director</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <span className="text-sm text-gray-400">
          Ingresa información oficial, no uses apodos o nicknames.
        </span>
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
          {representationAlert && (
            <div className={styles.formGroup}>
              <RepresentationComponent />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Nacionalidad</label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.title}
                </option>
              ))}
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
              onChange={(e) => setTypeRepresentative(e.target.value)}
            >
              <option value={"freelance"}>Freelance</option>
              <option value={"represented"}>Representado</option>
              <option value={"co-represented"}>Co-representado</option>
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
              type="number"
              value={directionYear||''}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md appearance-none no-spinner"
              onChange={(e) => setDirectionYear(Number(e.target.value))}
              placeholder="Elige el año"
            />
            
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
            onClick={handleSave}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDirectorModal2;
