import React, { useEffect, useState } from 'react';
import styles from './AddEntregableModal.module.css';
import { Switch } from '@headlessui/react';
import { createPortal } from 'react-dom';
import { Divider } from '@mui/material';
import toast from 'react-hot-toast';


type AddEntregableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: ((data: Entregable) => void) | null;
  onUpdate: ((entregable: Entregable) => void) | null;
  entregable: Entregable | null;
};

interface Entregable {
  version: string;
  fechaEntrega: string;
  duracion: string;
  cantidad: number;
  locutor: boolean;
  descripcionEntregable: string;
  tipo: string;
  fullMedia: boolean;
  television: boolean;
  cine: boolean;
  web: boolean;
  pantallas: boolean;
  rrss: boolean;
  facebook: boolean;
  instagram: boolean;
  linkedin: boolean;
  tiktok: boolean;
  youtube: boolean;
  otro: boolean;
  aspectRatio: string;
  formatoMedidas: string;
  notas: string;
}

const renderSwitch = (label: string, checked: boolean, onChange: (value: boolean) => void) => (
  <div className="flex items-center mb-4 w-1/2">
    <label className="block text-sm font-medium text-gray-700 w-1/4">{label}</label>

    <div className=" ml-5 mt-2 w-2/5">
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
  </div>);
const AddEntregableModal = ({ isOpen, onClose, onAdd, entregable, onUpdate }: AddEntregableModalProps) => {
  const entregableInitialState ={
    version: '',
    fechaEntrega: '',
    duracion: '',
    cantidad: 1,
    locutor: true,
    descripcionEntregable: '',
    tipo: '',
    fullMedia: false,
    television: false,
    cine: false,
    web: false,
    pantallas: false,
    rrss: false,
    facebook: false,
    instagram: false,
    linkedin: false,
    tiktok: false,
    youtube: false,
    otro: false,
    aspectRatio: '',
    formatoMedidas: '',
    notas: '',
  }

  const [state, setState] = useState<Entregable>(
    entregableInitialState
  );

  useEffect(() => {
    if (entregable) {
      setState(entregable);
    }
  }, [entregable]);


  const handleAdd = (saveAndClose: boolean) => {
    const { version, fechaEntrega, duracion, descripcionEntregable, aspectRatio } = state;
    if (!version || !fechaEntrega || !duracion || !descripcionEntregable || !aspectRatio) {
      toast.error('Por favor, complete todos los campos antes de agregar.');
      return;
    }

    if (onAdd) {
      onAdd(state);
      handleClear();
      if (saveAndClose) {
        onClose();
      }
    }
  };

  const handleClear = () => {
    setState(entregableInitialState);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return createPortal(
    (<div className={styles.modalOverlay} onClick={handleOverlayClick}>
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
            <label>Versión</label>
            <input
              type="text"
              name="version"
              value={state.version}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="">
            <div className={styles.formGroup + ''}>
              <label>Fecha de entrega</label>
              <input
                type="date"
                name="fechaEntrega"
                value={state.fechaEntrega}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={styles.formGroup + ' '}>
              <label>Duración </label>
              <select
                name="duracion"
                value={state.duracion}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Seleccionar</option>
                <option value="5">5&#34;</option>
                <option value="6">6&#34;</option>
                <option value="7">7&#34;</option>
                <option value="8">8&#34;</option>
                <option value="9">9&#34;</option>
                <option value="10">10&#34;</option>
                <option value="15">15&#34;</option>
                <option value="20">20&#34;</option>
                <option value="30">30&#34;</option>
                <option value="40">40&#34;</option>
                <option value="60">60&#34;</option>
                <option value="90">90&#34;</option>
                <option value="120">120&#34;</option>
                <option value="+120">+120&#34;</option>
              </select>
            </div>

          </div>

          <div className={''}>
            <div className={styles.formGroup + ' '}>
              <label>Aspect Ratio</label>
              <select
                name="aspectRatio"
                value={state.aspectRatio}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Seleccionar</option>
                <option value="16:9">16:9</option>
                <option value="4:3">4:3</option>
                <option value="1:1">1:1</option>
                <option value="21:9">21:9</option>
                <option value="9:16">9:16</option>
              </select>
            </div>
            <div className={styles.formGroup + ' '}>
              <label>Formato/Medidas</label>
              <input
                type="text"
                name="formatoMedidas"
                value={state.formatoMedidas}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            {renderSwitch('Full media', state.fullMedia, (value) => setState({ ...state, fullMedia: value }))}
            {renderSwitch('Television', state.television, (value) => setState({ ...state, television: value }))}
            {renderSwitch('Cine', state.cine, (value) => setState({ ...state, cine: value }))}
            {renderSwitch('Web', state.web, (value) => setState({ ...state, web: value }))}
            {renderSwitch('RRSS', state.rrss, (value) => setState({ ...state, rrss: value }))}
            {renderSwitch('Pantallas', state.pantallas, (value) => setState({ ...state, pantallas: value }))}
            {renderSwitch('Facebook', state.facebook, (value) => setState({ ...state, facebook: value }))}
            {renderSwitch('Instagram', state.instagram, (value) => setState({ ...state, instagram: value }))}
            {renderSwitch('Linkedin', state.linkedin, (value) => setState({ ...state, linkedin: value }))}
            {renderSwitch('TikTok', state.tiktok, (value) => setState({ ...state, tiktok: value }))}
            {renderSwitch('Youtube', state.youtube, (value) => setState({ ...state, youtube: value }))}
            {renderSwitch('Otro', state.otro, (value) => setState({ ...state, otro: value }))}
          </div>

          <Divider />
          <div className={styles.inlineGroup}>
            <label>Locutor</label>
            <div className="mt-2">
              <Switch
                name="locutor"
                checked={state.locutor}
                onChange={(value) => setState({ ...state, locutor: value })}
                className={`${state.locutor ? 'bg-red-500' : 'bg-gray-200'}
                    relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              >
              <span
                className={`${state.locutor ? 'translate-x-6' : 'translate-x-1'}
                    inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
              </Switch>
            </div>
          </div>
          {state.locutor && (
            <div className="flex ">
              <div className={styles.formGroup + ' w-1/2'}>
                <label>Cantidad</label>
                <select
                  name="cantidad"
                  value={state.cantidad}
                  onChange={(e) => handleChange(e)}
                >
                  {Array.from({ length: 50 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup + ' w-1/2'}>
                <label>Tipo</label>
                <select
                  name="tipo"
                  value={state.tipo}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="Nueva">Nueva</option>
                  <option value="Lift">Lift</option>
                  <option value="Adaptación">Adaptación</option>
                </select>
              </div>
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Especificaciones</label>
            <textarea
              name="descripcionEntregable"
              value={state.descripcionEntregable}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={2}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Notas</label>
            <textarea
              name="notas"
              value={state.notas}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={2}
            />
          </div>

        </div>
        <div className={styles.modalFooter}>
          {onAdd && (<button className={styles.secondaryButton} onClick={(e) => {
            e.preventDefault();
            handleAdd(false);
          }}>
            Aceptar y agregar otro
          </button>)}
          <button
            className={styles.primaryButton}
            onClick={(e) => {
              e.preventDefault();
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
    </div>), document.body);
};

export default AddEntregableModal;