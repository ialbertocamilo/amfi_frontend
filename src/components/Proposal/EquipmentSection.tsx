export function EquipmentSection({ data }: { data: any }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Equipo Técnico</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Cámara</h3>
            <p className="text-gray-800">{data?.equipo?.camara}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Óptica</h3>
            <p className="text-gray-800">{data?.equipo?.optica}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Equipo General</h3>
            <p className="text-gray-800">{data?.equipo?.general}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Equipo Especializado</h3>
            <p className="text-gray-800">{data?.equipo?.especializado}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción Adicional</h3>
            <p className="text-gray-800">{data?.equipo?.descripcionAdicional}</p>
          </div>
        </div>
      </div>
    );
  }