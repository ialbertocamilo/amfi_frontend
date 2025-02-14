import { useFormValidation } from '@/hooks/useFormValidation';
import { checkProjectReadonly } from '@/lib/utils';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useProjectContext } from '@/providers/project.context';
import toast from 'react-hot-toast';
import RequiredTag from './RequiredTag';

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  readOnly?: boolean;
}

interface TerritorioSelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}


export const validationRules = {
  medios: { required: true, message: 'Los medios son requeridos', label: 'Medios' },
  temporalidad: { required: true, message: 'La temporalidad es requerida', label: 'Temporalidad' },
  desglose: { required: true, message: 'El desglose es requerido', label: 'Desglose' },
  territorio1: { required: true, message: 'El territorio 1 es requerido', label: 'Territorio 1' },
  tipoProduccion1: { required: true, message: 'El tipo de producción 1 es requerido', label: 'Tipo de Producción 1' },
  productodummie: { required: true, message: 'El producto/dummie es requerido', label: 'Producto/Dummie' },
  cantidadDiasProduccion: { required: true, message: 'La cantidad de días de producción es requerida', label: 'Cantidad de Días de Producción' },
  creatividadAprobada: { required: true, message: 'La creatividad aprobada es requerida', label: 'Creatividad Aprobada' },
  entregaBrief: { required: true, message: 'La fecha de entrega del brief es requerida', label: 'Entrega de Brief' },
  entregaPresupuesto: { required: true, message: 'La fecha de entrega del presupuesto es requerida', label: 'Entrega de Presupuesto' },
  entregaProyecto: { required: true, message: 'La fecha de entrega del proyecto es requerida', label: 'Entrega de Proyecto' },
  presupuestoAsignado: { required: true, message: 'El presupuesto asignado es requerido', label: 'Presupuesto Asignado' },
  presupuesto: { required: true, message: 'El monto del presupuesto es requerido', label: 'Monto' }
};

const TerritorioSelect: React.FC<TerritorioSelectProps> = ({ value, onChange, name,disabled }) => {
  return (
    <select
      id={name}
      name={name}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      value={value}
      onChange={onChange}
disabled={disabled}
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


  const { validate } = useFormValidation();


  const onNext = () => {
    if (validate(formData, validationRules)) {
      handleSubmit('3');
    }
  }

  const projectContext = useProjectContext()
  return (
    <div className="space-y-8 p-4">

      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          <h2 className="text-xl font-bold mb-4">Datos adicionales del proyecto</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="medios" className="block text-sm font-medium text-gray-700">
                Medios <RequiredTag/>
              </label>
              <input
                type="text"
                id="medios"
                name="medios"
                placeholder={'Ejemplo: TV, Digital, Radio, Cine, OOH, Prensa, Revistas, Redes Sociales'}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.medios || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)

                }
              />
            </div>
            <div>
              <label htmlFor="temporalidad" className="block text-sm font-medium text-gray-700">
                Temporalidad <RequiredTag/>
              </label>
              <select
                id="temporalidad"
                name="temporalidad"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.temporalidad || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                Desglose <RequiredTag/>
              </label>
              <input
                type="text"
                id="desglose"
                name="desglose"
                placeholder={'Ingrese desglose'}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.desglose || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label htmlFor="territorio1" className="block text-sm font-medium text-gray-700">
                Territorio 1 <RequiredTag/>
              </label>
              <TerritorioSelect name={'territorio1'} value={formData?.territorio1 || ''}disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="territorio2" className="block text-sm font-medium text-gray-700">
                Territorio 2
              </label>
              <TerritorioSelect name={'territorio2'} value={formData?.territorio2 || ''} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="territorio3" className="block text-sm font-medium text-gray-700">
                Territorio 3
              </label>
              <TerritorioSelect name={'territorio3'} value={formData?.territorio3 || ''}disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="tipoProduccion1" className="block text-sm font-medium text-gray-700">Tipos de producción
                1 <RequiredTag/></label>
              <select
                id="tipoProduccion1"
                name="tipoProduccion1"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.tipoProduccion1}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="tv">TV</option>
                <option value="digital">Digital</option>
                <option value="fotografia">Fotografía</option>
              </select>
            </div>
            <div>
              <label htmlFor="productodummie" className="block text-sm font-medium text-gray-700">
                Producto/Dummie <RequiredTag/>
              </label>
              <input
                type="text"
                id="productodummie"
                name="productodummie"
                placeholder='Ejemplo: Producto 1, Producto 2, Dummie 1, Dummie 2'
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.productodummie || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label htmlFor="cantidadDiasProduccion" className="block text-sm font-medium text-gray-700">
                Cantidad días de producción <RequiredTag/>
              </label>
              <select
                id="cantidadDiasProduccion"
                name="cantidadDiasProduccion"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.cantidadDiasProduccion || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="creatividadAprobada" className="block text-sm font-medium text-gray-700">
                Creatividad aprobada por anunciante <RequiredTag/>
              </label>
              <select
                id="creatividadAprobada"
                name="creatividadAprobada"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.creatividadAprobada || ''}
                onChange={handleChange}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                  Entrega de Brief <RequiredTag/>
                </label>
                <input
                  type="date"
                  id="entregaBrief"
                  name="entregaBrief"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaBrief || ''}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const currentDate = new Date();
                    if (selectedDate <= currentDate) {
                      toast.error('La fecha de entrega de brief debe ser mayor a la fecha actual.');
                      return;
                    }
                    handleChange(e);
                  }}
                  disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                />
              </div>
              <div>
                <label htmlFor="entregaPresupuesto" className="block text-sm font-medium text-gray-700">
                  Entrega presupuesto y TT <RequiredTag/>
                </label>
                <input
                  type="date"
                  id="entregaPresupuesto"
                  name="entregaPresupuesto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaPresupuesto || ''}
                  disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const currentDate = new Date();
                    if (selectedDate <= currentDate) {
                      toast.error('La fecha de entrega de presupuesto debe ser mayor a la fecha actual.');
                      return;
                    }
                    handleChange(e);
                  }}
                />
              </div>
              <div>
                <label htmlFor="entregaProyecto" className="block text-sm font-medium text-gray-700">
                  Entrega proyecto <RequiredTag/>
                </label>
                <input
                  type="date"
                  id="entregaProyecto"
                  name="entregaProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.entregaProyecto || ''}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const currentDate = new Date();
                    if (selectedDate <= currentDate) {
                      toast.error('La fecha de entrega de proyecto debe ser mayor a la fecha actual.');
                      return;
                    }
                    handleChange(e);
                  }}
                  disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Presupuesto </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="presupuestoAsignado" className="block text-sm font-medium text-gray-700">
                  Presupuesto asignado <RequiredTag/>
                </label>
                <select
                  id="presupuestoAsignado"
                  name="presupuestoAsignado"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.presupuestoAsignado || ''}
                  onChange={handleChange}
                  disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                >
                  <option value="">Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">
                  Monto <RequiredTag/>
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
                    disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">MXN</span>
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
              onClick={onNext}
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