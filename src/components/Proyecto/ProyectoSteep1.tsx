import { toast } from 'react-hot-toast';
import NextButton from '../buttons/NextButton';
import { DatosAgenciaPublicidad } from './DatosAgenciaPublicidad';
import DatosAnunciante from './DatosAnunciante';
import { Project } from 'next/dist/build/swc/types';
import { IProject } from '@/interfaces/project.interface';

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
    // productorAgencia?: string;
    odtNumber?: string;
    buyerContact?: string;
  };
  handleChange: any;
  handleSubmit: any;
  readonly?: boolean;
  project:IProject
}

const ProyectoSteep1 = ({
                          formData,
                          project,
                          handleChange,
                          handleSubmit,
                          readonly,
                        }: registroEntity) => {
  const validateFormData = (formData: Record<string, any>): boolean => {
    const requiredFields = [
      'brand', 'product',  'projectName', 'versionName',
      'agencyEmail', 'agencyCreativeDirector', 'contactoFinanzas',
      'agencyAccountDirector', 'odtNumber', 'buyerContact',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
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