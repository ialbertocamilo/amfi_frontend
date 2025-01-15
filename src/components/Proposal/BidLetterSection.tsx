interface BidLetterProps {
  cliente: string;
  proyecto: string;
  version: string;
  fecha: string;
  duracion: string;
  descripcion: string;
}

export function ProjectSection({ data }: { data: any }) {


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Proyecto</h2>
      <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Días de Producción</h3>
                <p className="text-gray-800">{data?.bidLetter.produccionDias}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ciudad de Producción</h3>
                <p className="text-gray-800">{data?.bidLetter.produccionCiudad}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Versiones de Producción</h3>
                <p className="text-gray-800">{data?.bidLetter.produccionVersiones}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Días de Locación</h3>
                <p className="text-gray-800">{data?.bidLetter.locacionDias}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Versiones de Locación</h3>
                <p className="text-gray-800">{data?.bidLetter.locacionVersiones}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Días de Foro</h3>
                <p className="text-gray-800">{data?.bidLetter.foroDias}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Días Foráneos</h3>
                <p className="text-gray-800">{data?.bidLetter.foraneoDias}</p>
              </div>
            </div>
          </div>
        </div>
  );
}