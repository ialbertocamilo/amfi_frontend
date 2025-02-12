import DeliverableModal, { Field } from './AddEntregable';

const AddEntregableModalFoto = ({ isOpen, onClose, listaEntregables, setListaEntregables, entregable }) => {
  const campos: Field[] = [
    { etiqueta: 'Versión', nombre: 'version', tipo: 'text' },
    { etiqueta: 'Fecha de entrega', nombre: 'fechaEntrega', tipo: 'date' },
    { etiqueta: 'Medios', nombre: 'medios', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'OOH', label: 'OOH' },
      { value: 'POP', label: 'POP' },
      { value: 'Impresos', label: 'Impresos' },
      { value: 'Catalogo', label: 'Catalogo' },
      { value: 'Digital', label: 'Digital' },
    ]},
    { etiqueta: 'Resolución', nombre: 'resolucion', tipo: 'text' },
    { etiqueta: 'Tamaño', nombre: 'tamano', tipo: 'text' },
    { etiqueta: 'Tipo de Encuadre', nombre: 'tipoEncuadre', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'Vertical', label: 'Vertical' },
      { value: 'Horizontal', label: 'Horizontal' },
      { value: 'Cuadrado', label: 'Cuadrado' },
    ]},
    { etiqueta: 'Tipo de Post', nombre: 'tipoPost', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'retoqueCosmetico', label: 'Retoque Cosmético' },
      { value: 'integracion', label: 'Integración' },
    ]},
    { etiqueta: 'Tipo de Archivo', nombre: 'tipoArchivo', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'PSD(capas)', label: 'PSD (capas)' },
      { value: 'TIF', label: 'TIF' },
      { value: 'PNG', label: 'PNG' },
      { value: 'JPG', label: 'JPG' },
    ]},
    { etiqueta: 'Espacio de Color', nombre: 'espacioColor', tipo: 'select', opciones: [
      { value: '', label: 'Seleccionar' },
      { value: 'Adobe RGB', label: 'Adobe RGB' },
      { value: 'sRGB', label: 'sRGB' },
      { value: 'CMYK', label: 'CMYK' },
    ]},
    { etiqueta: 'Especificaciones', nombre: 'especificaciones', tipo: 'textarea' },
    { etiqueta: 'Notas', nombre: 'notas', tipo: 'textarea' },
  ];

  return (
    <DeliverableModal
      isOpen={isOpen}
      onClose={onClose}
      listaEntregables={listaEntregables}
      setListaEntregables={setListaEntregables}
      entregable={entregable}
      campos={campos}
    />
  );
};

export default AddEntregableModalFoto;