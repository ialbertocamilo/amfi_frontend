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

  const handleSetListaEntregables = (updatedEntregables) => {
    // For locutor, we only want to keep the latest entry
    setListaEntregables([updatedEntregables[updatedEntregables.length - 1]]);
  };

  return (
    <EntregableModal
      isOpen={isOpen}
      onClose={onClose}
      listaEntregables={listaEntregables}
      setListaEntregables={handleSetListaEntregables}
      entregable={entregable}
      campos={campos}
    />
  );
};

export default AddEntregableModalLocutor;