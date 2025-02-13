import { fixYesNo } from '@/lib/utils';
import React, { useState } from 'react';
import AddEntregableModalFoto from '../Proyecto/AddEntregableModalFoto';
import AddEntregableModalLocutor from '../Proyecto/AddEntregableModalLocutor';
import AddEntregableModalVideo from '../Proyecto/AddEntregableModalVideo';

interface ResumenProyectoProps {
  data: any;
}

const ResumenProyecto: React.FC<ResumenProyectoProps> = ({ data }) => {
  const [selectedEntregable, setSelectedEntregable] = useState<{ type: string } | null>(null);
  const [modalState, setModalState] = useState({
    video: false,
    foto: false,
    locutor: false
  });

  const handleEntregableClick = (entregable) => {
    setSelectedEntregable(entregable);
    setModalState(prev => ({ ...prev, [entregable.type]: true }));
  };

  const closeModal = () => {
    setSelectedEntregable(null);
    setModalState({ video: false, foto: false, locutor: false });
  };

  return (
    <div className="">

      <hr className={'my-6'} />
      {/* Sección Licitación y Finanzas */}
      <div>
        <h2 className="text-xl font-semibold">Licitación Finanzas</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>Responsable de pago: {data?.responsablePago?.toUpperCase()}</p>
          <p>Política de pago: {data?.politicaPago}</p>
          <p>Proceso de facturación: {data?.procesoFacturacion}</p>
          <p>Contrato de proyecto: {data?.contratoProyecto}</p>
          <p>Anticipo: {data?.porcentajeTasaAnticipo}%</p>
          <p>Ronda de cotización:{data?.rondaCotizacion}</p>
          <p>Política de alta al proveedor: {data?.politicaAltaProveedor}</p>
        </div>
      </div>

      <hr className={'my-6'} />
      {/* Sección Financiamiento */}
      <div>
        <h2 className="text-xl font-semibold">Financiamiento</h2>
        <div className="mt-4">
          <p>Anticipo {data?.anticipo}</p>
          <p>Antes de filmar {data?.antesDeFilmar}</p>
          <p>Política: {data?.politicaAltaProveedor}</p>
        </div>
      </div>

      <hr className={'my-6'} />
      {/* Sección Desglose creativo */}
      <div>
        <h2 className="text-xl font-semibold">Notas</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>Locación: {data?.locacion}</p>
          <p>Arte: {data?.arteprops}</p>
          <p>Tipo de casting: {data?.talentoTipoCasting?.toUpperCase()}</p>
          <p>Talento: {data?.talento}</p>
          <p>Menores de edad: {fixYesNo(data?.menoresDeEdad)}</p>
          <p>Vestuario: {data?.vestuario}</p>
          <p>Maquillaje y peinado: {data?.maquillajepeinado}</p>
        </div>
      </div>

      <hr className={'my-6'} />
      {/* Sección Post producción */}
      <div>
        <h2 className="text-xl font-semibold">Post producción</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>Animación: {data?.animacion}</p>
          <p>Música/Audio: {data?.musica}</p>
          <p>Fotos: {data?.photos}</p>
          <p>Videos: {data?.videos}</p>
          <p>Locutor: {data?.locutor}</p>
          {/* <p>Entrega: {data?.entrega}</p> */}
        </div>
      </div>

      <hr className={'my-6'} />
      {/* Sección Entregables */}
      <div>
        <h2 className="text-xl font-semibold">Entregables</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <h3 className="col-span-2 text-lg font-semibold">Videos</h3>
          {data?.entregables?.filter(e => e.type === 'video').map((entregable, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-2 cursor-pointer"
              onClick={() => handleEntregableClick(entregable)}
            >
              <p><strong>Duración {index + 1}:</strong> {entregable.duracion}"</p>
              <p><strong>Aspecto:</strong> {entregable.aspectRatio}</p>
              <p><strong>Formato:</strong> {entregable.formatoMedidas}</p>
            </div>
          ))}
          <h3 className="col-span-2 text-lg font-semibold">Fotos</h3>
          {data?.entregables?.filter(e => e.type === 'foto').map((entregable, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-2 cursor-pointer"
              onClick={() => handleEntregableClick(entregable)}
            >
              <p><strong>Medios:</strong> {entregable.medios}</p>
              <p><strong>Resolución:</strong> {entregable.resolucion}</p>
              <p><strong>Tamaño:</strong> {entregable.tamano}</p>
              <p><strong>Tipo de Encuadre:</strong> {entregable.tipoEncuadre}</p>
            </div>
          ))}
          <h3 className="col-span-2 text-lg font-semibold">Locutores</h3>
          {data?.entregables?.filter(e => e.type === 'locutor').map((entregable, index) => (
            <div
              key={index}
              className="border p-4 rounded mb-2 cursor-pointer"
              onClick={() => handleEntregableClick(entregable)}
            >
              <p><strong>Cantidad:</strong> {entregable.cantidad}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className={'my-6'} />

      {selectedEntregable?.type === 'video' && (
        <AddEntregableModalVideo
          isOpen={modalState.video}
          onClose={closeModal}
          listaEntregables={data.entregables.filter(e => e.type === 'video')}
          setListaEntregables={() => {}}
          entregable={selectedEntregable}
          noSave={true}
        />
      )}
      {selectedEntregable?.type === 'foto' && (
        <AddEntregableModalFoto
          isOpen={modalState.foto}
          onClose={closeModal}
          listaEntregables={data.entregables.filter(e => e.type === 'foto')}
          setListaEntregables={() => {}}
          entregable={selectedEntregable}
          noSave={true}
        />
      )}
      {selectedEntregable?.type === 'locutor' && (
        <AddEntregableModalLocutor
          isOpen={modalState.locutor}
          onClose={closeModal}
          listaEntregables={data.entregables.filter(e => e.type === 'locutor')}
          setListaEntregables={() => {}}
          entregable={selectedEntregable}
          noSave={true}
        />
      )}
    </div>
  );
};

export default ResumenProyecto;