import React from 'react';
interface ResumenProyectoProps {
  data: any
}

const ResumenProyecto: React.FC<ResumenProyectoProps> = ({ data }) => {
  return (
      <div className="">

        <hr className={'my-6'}/>
        {/* Sección Licitación y Finanzas */}
        <div>
          <h2 className="text-xl font-semibold">Licitación Finanzas</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Responsable de pago: Nombre</p>
            <p>Momento de facturación de Agencia: Lorem ipsum</p>
            <p>Anticipo: $1000.00</p>
            <p>Contrato de proyecto: Lorem ipsum</p>
            <p>Política de pago: 30 días</p>
            <p>Tipo: Acuerdo</p>
            <p>Momento de facturación: Fin de mes</p>
            <p>Ronda de cotización: Lorem ipsum</p>
            <p>Política de alta al proveedor: Giuliano Casas</p>
            <p>Género: Lorem ipsum</p>
          </div>
        </div>

        <hr className={'my-6'}/>
        {/* Sección Financiamiento */}
        <div>
          <h2 className="text-xl font-semibold">Financiamiento</h2>
          <div className="mt-4">
            <p>Porcentaje de tasa sobre el anticipo: {data?.porcentajeTasaAnticipo}%</p>
            <p>Porcentaje de tasa sobre el finiquito: {data?.porcentajeTasaFiniquito}%</p>
            <p>Promedio de tasa total: {data?.porcentajeTasaTotal}%</p>
          </div>
        </div>

        <hr className={'my-6'}/>
        {/* Sección Desglose creativo */}
        <div>
          <h2 className="text-xl font-semibold">Desglose creativo</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Cinematografía: {data?.cinematografia}</p>
            <p>Locación: {data?.locacion}</p>
            <p>Arte/Props: {data?.arteprops}</p>
            <p>Casting: {data?.casting}</p>
            <p>Talento: {data?.talento}</p>
            <p>Compensación: {data?.compensacion}</p>
            <p>Vestuario: {data?.vestuario}</p>
            <p>Maquillaje y peinado: {data?.maquillajepeinado}</p>
          </div>
        </div>

        <hr className={'my-6'}/>
        {/* Sección Post producción */}
        <div>
          <h2 className="text-xl font-semibold">Post producción</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Online: {data?.online}</p>
            <p>Animación: {data?.animacion}</p>
            <p>Música: {data?.musica}</p>
            <p>Audio: {data?.audio}</p>
            <p>Locutor: {data?.locutor}</p>
            <p>Entrega: {data?.entrega}</p>
          </div>
        </div>
        <hr className={'my-6'}/>

        {/* Sección Asistentes filmación */}
        <div>
          <h2 className="text-xl font-semibold">Asistentes filmación</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Cantidad: {data?.cantidadAsistentes}</p>
            <p>Puesto: {data?.puestoAsistentes}</p>
          </div>
        </div>

        <hr className={'my-6'}/>
        {/* Sección Entregables */}
        <div>
          <h2 className="text-xl font-semibold">Entregables</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p>Version 1</p>
              <p>Version 1</p>
              <p>Version 1</p>
              <p>Version 1</p>
            </div>
            <div>
              <p>Video: 3</p>
              <p>Foto: 3</p>
              <p>Total: 6</p>
              <p>Locutor: 1</p>
            </div>
          </div>
        </div>

        <hr className={'my-6'}/>

        {/* Sección Responsables de seguimiento */}
        <div>
          <h2 className="text-xl font-semibold">Responsables de seguimiento de agencia</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Titular: Pietro Saliciano</p>
            <p>Secundario: Lorem ipsum</p>
          </div>
        </div>

      </div>

  );
};

export default ResumenProyecto;
