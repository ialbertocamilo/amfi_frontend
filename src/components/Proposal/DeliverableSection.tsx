interface DeliverableItem {
    lista: Array<{
      titulo: string;
      duracion: string;
      formato: string;
      lift: string;
    }>;
  }
  
  export function DeliverableSection({ data }: { data: { entregables: DeliverableItem } }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Entregables</h2>
        {(!data?.entregables?.lista || data.entregables.lista.length === 0) ? (
          <p className="text-gray-600">No hay entregables adjuntos</p>
        ) : (
          <div className="space-y-4">
            {data.entregables.lista.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                      <div className="mb-4">
                          <h2 className="text-lg font-normal text-gray-900 border-b border-gray-300 pb-2">
                              Entregable #{index + 1}
                          </h2>
                      </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Título</h3>
                          <p className="mt-1 text-base text-gray-800">{item?.titulo}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Duración</h3>
                          <p className="mt-1 text-base text-gray-800">{item?.duracion}"</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Formato</h3>
                          <p className="mt-1 text-base text-gray-800">{item?.formato}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Lift</h3>
                          <p className="mt-1 text-base text-gray-800">{item?.lift}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }