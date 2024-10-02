import React from 'react';

const ResumenProyecto: React.FC = () => {
  return (
      <div className="">
        
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

        {/* Sección Financiamiento */}
        <div>
          <h2 className="text-xl font-semibold">Financiamiento</h2>
          <div className="mt-4">
            <p>Porcentaje de tasa sobre el anticipo: x%</p>
            <p>Porcentaje de tasa sobre el finiquito: x%</p>
            <p>Promedio de tasa total: x%</p>
          </div>
        </div>

        {/* Sección Desglose creativo */}
        <div>
          <h2 className="text-xl font-semibold">Desglose creativo</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Cinematografía: Texto</p>
            <p>Locación: Texto</p>
            <p>Arte/Props: Texto</p>
            <p>Casting: Texto</p>
            <p>Talento: Texto</p>
            <p>Compensación: Texto</p>
            <p>Vestuario: Texto</p>
            <p>Maquillaje y peinado: Texto</p>
          </div>
        </div>

        {/* Sección Post producción */}
        <div>
          <h2 className="text-xl font-semibold">Post producción</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Online: Texto</p>
            <p>Animación: Texto</p>
            <p>Música: Texto</p>
            <p>Audio: Texto</p>
            <p>Locutor: Texto</p>
            <p>Entregas: Texto</p>
          </div>
        </div>

        {/* Sección Asistentes filmación */}
        <div>
          <h2 className="text-xl font-semibold">Asistentes filmación</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Cantidad: Número</p>
            <p>Puesto: Texto</p>
          </div>
        </div>

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
