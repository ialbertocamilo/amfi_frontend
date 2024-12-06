
interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
}

interface TerritorioSelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TerritorioSelect: React.FC<TerritorioSelectProps> = ({ value, onChange, name }) => {
  return (
    <select
      id={name}
      name={name}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      value={value}
      onChange={onChange}
    >
      <option value="">Seleccionar</option>
      <option value="mexico">México</option>
      <option value="latam">LATAM</option>
      <option value="latam_sin_brasil">LATAM (Sin Brasil)</option>
      <option value="centroamerica">Centroamérica y/o Caribe</option>
      <option value="sudamerica">Sudamérica</option>
      <option value="europa">Europa</option>
      <option value="asia">Asia</option>
      <option value="medio_oriente">Medio Oriente</option>
      <option value="usa">USA</option>
      <option value="usa_hispano">USA (mercado hispano)</option>
      <option value="mundial">Mundial</option>
    </select>
  );
};

const ProyectoSteep2 = ({
                          formData,
                          handleChange,
                          handleSubmit,
                        }: registroEntity) => {
  return (
    <div className="space-y-8 p-4">

      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          <h2 className="text-xl font-bold mb-4">Datos adicionales del proyecto</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="medios" className="block text-sm font-medium text-gray-700">
                Medios
              </label>
              <input
                type="text"
                id="medios"
                name="medios"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.medios || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="temporalidad" className="block text-sm font-medium text-gray-700">
                Temporalidad
              </label>
              <select
                id="temporalidad"
                name="temporalidad"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.temporalidad || ''}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
                <option value="18">18 meses</option>
                <option value="24">24 meses</option>
                <option value="30">30 meses</option>
                <option value="36">36 meses</option>
              </select>
            </div>
            <div>
              <label htmlFor="desglose" className="block text-sm font-medium text-gray-700">
                Desglose
              </label>
              <input
                type="text"
                id="desglose"
                name="desglose"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.desglose || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="territorio1" className="block text-sm font-medium text-gray-700">
                Territorio 1
              </label>
              <TerritorioSelect name={'territorio1'} value={formData?.territorio1 || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="territorio2" className="block text-sm font-medium text-gray-700">
                Territorio 2
              </label>
              <TerritorioSelect name={'territorio2'} value={formData?.territorio2 || ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="territorio3" className="block text-sm font-medium text-gray-700">
                Territorio 3
              </label>
              <TerritorioSelect name={'territorio3'} value={formData?.territorio3 || ''} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="tipoProduccion1" className="block text-sm font-medium text-gray-700">Tipos de producción
                1</label>
              <select
                id="tipoProduccion1"
                name="tipoProduccion1"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.tipoProduccion1}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="tv">TV</option>
                <option value="digital">Digital</option>
                <option value="fotografia">Fotografía</option>
              </select>
            </div>
            <div>
              <label htmlFor="tipoProduccion2" className="block text-sm font-medium text-gray-700">Tipos de producción
                2</label>
              <select
                id="tipoProduccion2"
                name="tipoProduccion2"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.tipoProduccion2}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="tv">TV</option>
                <option value="digital">Digital</option>
                <option value="fotografia">Fotografía</option>
              </select>
            </div>
            <div>
              <label htmlFor="tipoProduccion2" className="block text-sm font-medium text-gray-700">Tipos de producción
                3</label>
              <select
                id="tipoProduccion3"
                name="tipoProduccion3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.tipoProduccion3}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="tv">TV</option>
                <option value="digital">Digital</option>
                <option value="fotografia">Fotografía</option>
              </select>
            </div>
            <div>
              <label htmlFor="derechos" className="block text-sm font-medium text-gray-700">
                Derechos
              </label>
              <input
                type="text"
                id="derechos"
                name="derechos"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.derechos || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cantidadDiasProduccion" className="block text-sm font-medium text-gray-700">
                Cantidad días de producción
              </label>
              <select
                id="cantidadDiasProduccion"
                name="cantidadDiasProduccion"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.cantidadDiasProduccion || ''}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="creatividadAprobada" className="block text-sm font-medium text-gray-700">
                Creatividad aprobada por anunciante
              </label>
              <select
                id="creatividadAprobada"
                name="creatividadAprobada"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.creatividadAprobada || ''}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí, lista para producir</option>
                <option value="sitest">Sí, en testeo</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Fechas</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="entregaBrief" className="block text-sm font-medium text-gray-700">
                  Entrega de Brief
                </label>
                <input
                  type="date"
                  id="entregaBrief"
                  name="entregaBrief"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaBrief || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="entregaPresupuesto" className="block text-sm font-medium text-gray-700">
                  Entrega presupuesto y TT
                </label>
                <input
                  type="date"
                  id="entregaPresupuesto"
                  name="entregaPresupuesto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaPresupuesto || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="entregaBidLetter" className="block text-sm font-medium text-gray-700">
                  Limite de entrega de ofertas
                </label>
                <input
                  type="date"
                  id="entregaBidLetter"
                  name="entregaBidLetter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaBidLetter || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="entregaProyecto" className="block text-sm font-medium text-gray-700">
                  Entrega proyecto
                </label>
                <input
                  type="date"
                  id="entregaProyecto"
                  name="entregaProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaProyecto || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Presupuesto </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="presupuestoAsignado" className="block text-sm font-medium text-gray-700">
                  Presupuesto asignado
                </label>
                <select
                  id="presupuestoAsignado"
                  name="presupuestoAsignado"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.presupuestoAsignado || ''}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">
                  Monto
                </label>
                <div className="relative flex space-x-2">
                  <input
                    type="number"
                    id="presupuesto"
                    name="presupuesto"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md appearance-none no-spinner"
                    value={formData?.presupuesto || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Ingrese el presupuesto"
                  />
                  <select
                    id="moneda"
                    name="moneda"
                    className="mt-1 block p-2 border border-gray-300 rounded-md bg-white"
                    value={formData?.moneda || ''}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="mxn">MXN</option>
                    <option value="usd">USD</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
              onClick={() => handleSubmit('1')}
            >
              Atras
            </button>
            <button
              type="button"
              className="w-1/4 bg-red-500 text-white py-2 rounded"
              onClick={() => handleSubmit('3')}
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProyectoSteep2;