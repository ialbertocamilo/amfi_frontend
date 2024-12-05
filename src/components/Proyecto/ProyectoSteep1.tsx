import { toast } from 'react-hot-toast';
import NextButton from '../buttons/NextButton';
import { DatosAgenciaPublicidad } from './DatosAgenciaPublicidad';
import DatosAnunciante from './DatosAnunciante';
import useProject from '@/hooks/project.hook';
import useUser from '@/hooks/user.hook';
import { useUserContext } from '@/providers/user.context';

interface registroEntity {
  formData: {
    client?: string;
    brand?: string;
    product?: string;
    category?: string;
    agencyProductor?: string;
    projectName?: string;
    versionName?: string;
    quantity?: number;
    agencyName?: string;
    agencyEmail?: string;
    agencyCreativeDirector?: string;
    contactoMarketing?: string;
    contactoFinanzas?: string;
    agencyAccountDirector?: string;
    // productorAgencia?: string;
    odtNumber?: string;
    buyerContact?: string;
  };
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
  readonly?: boolean;
}

const ProyectoSteep1 = ({
                          formData,
                          handleChange,
                          handleSubmit,
                          readonly,
                        }: registroEntity) => {
                          const userContext = useUserContext();
                          const user = userContext?.user;
  const validateFormData = (formData: Record<string, any>): boolean => {
    const requiredFields = [
      'brand', 'product', 'category', 'projectName', 'versionName', 'quantity',
      'agencyName', 'agencyEmail', 'agencyCreativeDirector', 'contactoFinanzas',
      'agencyAccountDirector', 'odtNumber', 'buyerContact',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        console.log('field', field);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateFormData(formData)) {
      toast.error('Por favor llena todos los campos');
      return;
    }
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
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.category || ''}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label
              htmlFor="versionName"
              className="block text-sm font-medium text-gray-700"
            >
              Versiones
            </label>
            <input
              type="text"
              id="versionName"
              name="versionName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.versionName || ''}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.quantity || ''}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
        </div>
        {user && <DatosAnunciante user={user} formData={formData} handleChange={handleChange} readonly={readonly} />}
        {user && <DatosAgenciaPublicidad user={user} formData={formData} handleChange={handleChange} readonly={readonly} />}
        <div className="flex justify-center space-x-4">
          <NextButton onClick={handleNext} />
        </div>
        </div>
      </div>
      );
      };

      export default ProyectoSteep1;