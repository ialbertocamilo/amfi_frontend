import React from 'react';
import EntregableModal, { Field } from './AddEntregable';

const AddEntregableModalLocutor = ({ isOpen, onClose, listaEntregables, setListaEntregables, entregable }) => {
  const campos: Field[] = [
    { etiqueta: 'Cantidad', nombre: 'cantidad', tipo: 'number' },
    { etiqueta: 'Tipo', nombre: 'tipo', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'Nueva', label: 'Nueva' },
      { value: 'Lift', label: 'Lift' },
      { value: 'Adaptación', label: 'Adaptación' },
    ]},
    { etiqueta: 'Especificaciones', nombre: 'especificaciones', tipo: 'textarea' },
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
    />
  );
};

export default AddEntregableModalLocutor;