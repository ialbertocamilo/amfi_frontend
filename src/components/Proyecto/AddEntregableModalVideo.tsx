import React from 'react';
import EntregableModal, { Field } from './AddEntregable';

const AddEntregableModal = ({ isOpen, onClose, listaEntregables, setListaEntregables, entregable, noSave = false }) => {
  const campos: Field[] = [
    { etiqueta: 'Versión', nombre: 'version', tipo: 'text' },
    { etiqueta: 'Fecha de entrega', nombre: 'fechaEntrega', tipo: 'date' },
    { etiqueta: 'Duración', nombre: 'duracion', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: '5', label: '5"' },
      { value: '6', label: '6"' },
      { value: '7', label: '7"' },
      { value: '8', label: '8"' },
      { value: '9', label: '9"' },
      { value: '10', label: '10"' },
      { value: '15', label: '15"' },
      { value: '20', label: '20"' },
      { value: '30', label: '30"' },
      { value: '40', label: '40"' },
      { value: '60', label: '60"' },
      { value: '90', label: '90"' },
      { value: '120', label: '120"' },
      { value: '+120', label: '+120"' },
    ]},
    { etiqueta: 'Aspect Ratio', nombre: 'aspectRatio', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: '16:9', label: '16:9' },
      { value: '4:3', label: '4:3' },
      { value: '1:1', label: '1:1' },
      { value: '21:9', label: '21:9' },
      { value: '9:16', label: '9:16' },
    ]},
    { etiqueta: 'Formato/Medidas', nombre: 'formatoMedidas', tipo: 'text' },
    { etiqueta: 'Full Media', nombre: 'fullMedia', tipo: 'switch' },
    { etiqueta: 'Television', nombre: 'television', tipo: 'switch' },
    { etiqueta: 'Cine', nombre: 'cine', tipo: 'switch' },
    { etiqueta: 'Web', nombre: 'web', tipo: 'switch' },
    { etiqueta: 'RRSS', nombre: 'rrss', tipo: 'switch' },
    { etiqueta: 'Pantallas', nombre: 'pantallas', tipo: 'switch' },
    { etiqueta: 'Facebook', nombre: 'facebook', tipo: 'switch' },
    { etiqueta: 'Instagram', nombre: 'instagram', tipo: 'switch' },
    { etiqueta: 'Linkedin', nombre: 'linkedin', tipo: 'switch' },
    { etiqueta: 'TikTok', nombre: 'tiktok', tipo: 'switch' },
    { etiqueta: 'Youtube', nombre: 'youtube', tipo: 'switch' },
    { etiqueta: 'Otro', nombre: 'otro', tipo: 'switch' },
    { etiqueta: 'Especificaciones', nombre: 'descripcionEntregable', tipo: 'textarea' },
    { etiqueta: 'Notas', nombre: 'notas', tipo: 'textarea' },
  ];

  return (
    <EntregableModal
      isOpen={isOpen}
      onClose={onClose}
      listaEntregables={listaEntregables}
      setListaEntregables={setListaEntregables}
      entregable={entregable}
      campos={campos}
      noSave={noSave}
    />
  );
};

export default AddEntregableModal;