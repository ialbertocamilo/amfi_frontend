export function CrewSection({ data }: { data: any }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Crew</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Dirección</h3>
            <p className="text-gray-800">{data?.crew?.direccion}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Dirección de Fotografía</h3>
            <p className="text-gray-800">{data?.crew?.direccionFotografia}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Producción Ejecutiva</h3>
            <p className="text-gray-800">{data?.crew?.produccionEjecutiva}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Cantidad Total</h3>
            <p className="text-gray-800">{data?.crew?.descripcionOpcional}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción Adicional</h3>
            <p className="text-gray-800">{data?.crew?.cantidadTotal}</p>
          </div>
        </div>
      </div>
    );
  }