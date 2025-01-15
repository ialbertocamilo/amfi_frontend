import { fixYesNo } from '@/lib/utils';
import React from 'react';
interface ResumenProyectoProps {
  data: any
}

const ResumenProyecto: React.FC<ResumenProyectoProps> = ({ data }) => {
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
          <p>Porcentaje de tasa sobre el anticipo: {data?.porcentajeTasaAnticipo}%</p>
          <p>Porcentaje de tasa sobre el finiquito: {data?.porcentajeTasaFiniquito}%</p>
          <p>Promedio de tasa total: {data?.porcentajeTasaTotal}%</p>
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
          <p>Online: {data?.online}</p>
          <p>Animación: {data?.animacion}</p>
          <p>Música/Audio: {data?.musica}</p>
          <p>Fotos: {data?.photos}</p>
          <p>Videos: {data?.videos}</p>
          <p>Locutor: {data?.locutor}</p>
          <p>Entrega: {data?.entrega}</p>
        </div>
      </div>

      <hr className={'my-6'} />
      {/* Sección Entregables */}
      <div>
        <h2 className="text-xl font-semibold">Entregables</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
            {data?.entregables?.length > 0 ? (
              data.entregables.map((entregable, index) => (
              <div key={index} className="border p-4 rounded mb-2">
                <p><strong>Duración {index + 1}:</strong> {entregable.duracion}"</p>
                <p><strong>Cantidad:</strong> {entregable?.cantidad}</p>
                <p><strong>Aspecto:</strong> {entregable.aspectRatio}</p>
                <p><strong>Formato:</strong> {entregable.formatoMedidas}</p>
              </div>
              ))
            ) : (
              <p>No hay entregables registrados</p>
            )}
        </div>
      </div>

      <hr className={'my-6'} />

      {/* Sección Responsables de seguimiento */}
      {/*        <div>
          <h2 className="text-xl font-semibold">Responsables de seguimiento de agencia</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Titular: {data?.titularResponsable}</p>
            <p>Secundario: {data?.secundarioResponsable}</p>
          </div>
        </div>*/}

    </div>

  );
};

export default ResumenProyecto;