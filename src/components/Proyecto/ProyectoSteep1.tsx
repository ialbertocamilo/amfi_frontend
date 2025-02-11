import { useFormValidation } from '@/hooks/useFormValidation';
import { IProject } from '@/interfaces/project.interface';
import NextButton from '../buttons/NextButton';
import { DatosAgenciaPublicidad } from './DatosAgenciaPublicidad';
import DatosAnunciante from './DatosAnunciante';

interface registroEntity {
  formData: {
    client?: string;
    brand?: string;
    product?: string;
    agencyProductor?: string;
    projectName?: string;
    versionName?: string;
    agencyEmail?: string;
    agencyCreativeDirector?: string;
    contactoMarketing?: string;
    contactoFinanzas?: string;
    agencyAccountDirector?: string;
    odtNumber?: string;
    buyerContact?: string;
  };
  handleChange: any;
  handleSubmit: any;
  readonly?: boolean;
  project: IProject
}

export const validationRules = {
  brand: { required: true, message: 'La marca es requerida', label: 'Marca' },
  product: { required: true, message: 'El producto es requerido', label: 'Producto' },
  projectName: { required: true, message: 'El nombre del proyecto es requerido', label: 'Nombre de Proyecto' },
  versionName: { required: true, message: 'La cantidad de versiones es requerida', label: 'Cantidad de Versiones' },
  agencyEmail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email inválido',
    label: 'Correo Electrónico'
  },
  agencyCreativeDirector: { required: true, message: 'El director creativo es requerido', label: 'Director Creativo' },
  contactoFinanzas: { required: true, message: 'El contacto de finanzas es requerido', label: 'Contacto de Finanzas' },
  contactoMarketing: { required: true, message: 'El contacto de marketing es requerido', label: 'Contacto de Marketing' },
  agencyAccountDirector: { required: true, message: 'El director de cuenta es requerido', label: 'Director de Cuenta' },
  odtNumber: { required: true, message: 'El número ODT es requerido', label: 'Número ODT' },
  buyerContact: { required: true, message: 'El contacto de compras es requerido', label: 'Contacto de Compras' }
};

const ProyectoSteep1 = ({
  formData,
  project,
  handleChange,
  handleSubmit,
  readonly,
}: registroEntity) => {
  const { validate } = useFormValidation();

  const handleNext = () => {
    if (validate(formData, validationRules))
      handleSubmit('2');
  };

  return (
    <div className="space-y-8 p-4">
      <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
        <h2 className="text-xl font-bold mb-4">Datos del proyecto</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
          <div className="col-span-2">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de Campaña / Proyecto
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.projectName || ''}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label
              htmlFor="versionName"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad Versiones
            </label>
            <select
              id="versionName"
              name="versionName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.versionName || ''}
              onChange={handleChange}
              disabled={readonly}
            >
              <option value="">Seleccionar</option>
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DatosAnunciante formData={formData} handleChange={handleChange} readonly={readonly} advertiser={project?.advertiser} />
        <DatosAgenciaPublicidad formData={formData} handleChange={handleChange} readonly={readonly} agency={project?.agency} />
        <div className="flex justify-center space-x-4">
          <NextButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default ProyectoSteep1;