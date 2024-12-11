interface BidLetterProps {
  cliente: string;
  proyecto: string;
  version: string;
  fecha: string;
  duracion: string;
  descripcion: string;
}

export function BidLetterSection({ data }: { data: any }) {


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Bid Letter</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
            <p className="text-gray-800">{data?.bidLetter.cliente}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Proyecto</h3>
            <p className="text-gray-800">{data?.bidLetter.proyecto}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Versión</h3>
            <p className="text-gray-800">{data?.bidLetter.version}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
            <p className="text-gray-800">{data?.bidLetter.fecha}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Duración</h3>
            <p className="text-gray-800">{data?.bidLetter.duracion}</p>
          </div>
        </div>
        <div className="col-span-2">
          <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
          <p className="text-gray-800 mt-1">{data?.bidLetter.descripcion}</p>
        </div>
      </div>
    </div>
  );
}