import { validateInputs } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploaderComponent from '../UploaderComponent';
import Input from '../inputs/Input';

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
}

const ProyectoSteep3 = ({ formData, handleChange, handleSubmit, }: registroEntity) => {
  const fieldLabels = {
    link1: "Link 1",
    link2: "Link 2",
    responsablePago: "Responsable de pago",
    politicaPago: "Política de pago",
    procesoFacturacion: "Proceso de facturación",
    // politicaPagoAgencia: "Política de pago para agencia",
    // procesoFacturacionAgencia: "Proceso de facturación para agencia",
    contratoProyecto: "Contrato de proyecto",
    tipoContratoProyecto: "Tipo de contrato de proyecto",
    rondaCotizacion: "Ronda de cotización",
    visualizacion: "Visualización",
    politicaAltaProveedor:"Política de alta al proveedor",
    anticipo:"Anticipo",
    antesDeFilmar:'Antes de filmar',
    porcentajeTasaAnticipo:'Porcentaje de tasa sobre el anticipo',
    porcentajeTasaFiniquito:'Porcentaje de tasa sobre el finiquito',
    porcentajeTasaTotal:'Porcentaje de tasa total',
    informacionAdicional:'Política (Información adicional a considerar)',
  };

  const inputNames = Object.keys(fieldLabels);
  const router = useRouter();
  const projectId = router.query.id as string;
  const handleNext = () => {
    const errorMessage = validateInputs(formData, inputNames, fieldLabels);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      handleSubmit('4');
    }
  };
  const [showAgencyFields, setShowAgencyFields] = useState(false);

  const handleResponsablePagoChange = (e) => {
    const { value } = e.target;
    handleChange(e);
    setShowAgencyFields(value === "agencia");
  };

  useEffect(()=>{
        setShowAgencyFields(formData?.responsablePago === 'agencia')
  },[formData?.responsablePago])
  return (
    <div className="space-y-8 p-4">

      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">

          <div>
            <h2 className="text-xl font-bold mb-4">Documentos</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="line1" className="block text-sm font-medium text-gray-700">Subir
                  archivo</label>
                <UploaderComponent identifier={'first_file'} projectId={projectId} />
              </div>
              <div>
                <label htmlFor="link1" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link1"
                  name="link1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.link1}
                  onChange={handleChange}
                  placeholder="www.google.com (Referencias)"
                />
              </div>
              <div>
                <label htmlFor="line1"
                  className="block text-sm font-medium text-gray-700">Referencias</label>
                <UploaderComponent identifier={'second_file'} projectId={projectId} />
              </div>
              <div>
                <label htmlFor="link2" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link2"
                  name="link2"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.link2}
                  onChange={handleChange}
                  placeholder="www.google.com (Referencias)"
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <h2 className="text-xl font-bold mb-4">Licitación Finanzas</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="responsablePago" className="block text-sm font-medium text-gray-700">Responsable de pago</label>
                  <select
                    id="responsablePago"
                    name="responsablePago"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formData?.responsablePago}
                    onChange={handleResponsablePagoChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="anunciante">Anunciante</option>
                    <option value="agencia">Agencia de publicidad</option>
                  </select>
                </div>

                <div>
                  <Input
                    name="politicaPago"
                    value={formData?.politicaPago}
                    onChange={handleChange}
                    label='Política de pago'
                    placeholder="Ingrese la política de pago en días (Ej. 30 días)"
                  />
                </div>
                <div>
                  <label htmlFor="procesoFacturacion" className="block text-sm font-medium text-gray-700">Proceso de facturación</label>
                  <select
                    id="procesoFacturacion"
                    name="procesoFacturacion"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formData?.procesoFacturacion}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Asignación">Asignación</option>
                    <option value="1er día de prod.">1er día de prod.</option>
                    <option value="CT">CT</option>
                    <option value="Entrega">Entrega</option>
                    <option value="Posterior">Posterior</option>
                  </select>
                </div>
              </div>

              {showAgencyFields && (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8 p-6 bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                  <div>
                  <label htmlFor="agency" className="block text-sm font-medium text-gray-700">Agencia</label>
                  <input
                    type="text"
                    id="agency"
                    name="agency"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    value="Agencia de publicidad"
                    readOnly
                  />
                  </div>
                  <div>
                  <Input
                    name="politicaPagoAgencia"
                    value={formData?.politicaPagoAgencia}
                    onChange={handleChange}
                    label='Política de pago de agencia'
                    placeholder="Ingrese la política de pago en días (Ej. 30 días)"
                  />
                  </div>
                  <div>
                  <label htmlFor="procesoFacturacionAgencia" className="block text-sm font-medium text-gray-700">Proceso de facturación para agencia</label>
                  <select
                    id="procesoFacturacionAgencia"
                    name="procesoFacturacionAgencia"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formData?.procesoFacturacionAgencia}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Asignación">Asignación</option>
                    <option value="1er día de prod.">1er día de prod.</option>
                    <option value="CT">CT</option>
                    <option value="Entrega">Entrega</option>
                    <option value="Posterior">Posterior</option>
                  </select>
                  </div>
                </div>
              )}
            </div>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-8 mb-8'>
              <div>
                <label htmlFor="contratoProyecto" className="block text-sm font-medium text-gray-700">Contrato
                  de proyecto</label>
                <select
                  id="contratoProyecto"
                  name="contratoProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.contratoProyecto}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="tipoContratoProyecto" className="block text-sm font-medium text-gray-700">Tipo de contrato
                  de proyecto</label>
                <select
                  id="tipoContratoProyecto"
                  name="tipoContratoProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.tipoContratoProyecto}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="colaboracionRemunerada">Colaboración remunerada</option>
                  <option value="contratoPublicitario">Contrato publicitario</option>
                  <option value="sinDefinir">Sin definir</option>
                </select>
              </div>
              <div>
                <label htmlFor="rondaCotizacion" className="block text-sm font-medium text-gray-700">Ronda
                  de cotización</label>
                <select
                  id="rondaCotizacion"
                  name="rondaCotizacion"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.rondaCotizacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="1">1ª</option>
                  <option value="2">2ª</option>
                  <option value="3">3ª</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visualización</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="radio"
                    id="visualizacionSi"
                    name="visualizacion"
                    value="si"
                    checked={formData?.visualizacion === 'si'}
                    onChange={handleChange}
                  />
                  <label htmlFor="visualizacionSi" className="mr-4">Sí</label>
                  <input
                    type="radio"
                    id="visualizacionNo"
                    name="visualizacion"
                    value="no"
                    checked={formData?.visualizacion === 'no'}
                    onChange={handleChange}
                  />
                  <label htmlFor="visualizacionNo">No</label>
                </div>
              </div>
              <div>
                <label htmlFor="politicaAltaProveedor"
                  className="block text-sm font-medium text-gray-700">Política de alta al
                  proveedor</label>
                <textarea
                  id="politicaAltaProveedor"
                  name="politicaAltaProveedor"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.politicaAltaProveedor}
                  onChange={handleChange}
                  maxLength={300}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Financiamiento</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="anticipo"
                  className="block text-sm font-medium text-gray-700">Anticipo</label>
                <select
                  id="anticipo"
                  name="anticipo"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.anticipo}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="antesDeFilmar" className="block text-sm font-medium text-gray-700">Antes de
                  filmar</label>
                <select
                  id="antesDeFilmar"
                  name="antesDeFilmar"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.antesDeFilmar}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="porcentajeTasaAnticipo"
                  className="block text-sm font-medium text-gray-700">Porcentaje de tasa sobre el
                  anticipo</label>
                <input
                  type="number"
                  id="porcentajeTasaAnticipo"
                  name="porcentajeTasaAnticipo"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.porcentajeTasaAnticipo}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>
              <div>
                <label htmlFor="porcentajeTasaFiniquito"
                  className="block text-sm font-medium text-gray-700">Porcentaje de tasa sobre el
                  finiquito</label>
                <input
                  type="number"
                  id="porcentajeTasaFiniquito"
                  name="porcentajeTasaFiniquito"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.porcentajeTasaFiniquito}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>

              <div>
                <label htmlFor="porcentajeTasaTotal"
                  className="block text-sm font-medium text-gray-700">Porcentaje de tasa
                  total</label>
                <input
                  type="number"
                  id="porcentajeTasaTotal"
                  name="porcentajeTasaTotal"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.porcentajeTasaTotal}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>
              <div>
                <label htmlFor="informacionAdicional"
                  className="block text-sm font-medium text-gray-700">Política (Información adicional a
                  considerar)</label>
                <textarea
                  id="informacionAdicional"
                  name="informacionAdicional"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.informacionAdicional}
                  onChange={handleChange}
                  maxLength={300}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button type="button" className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
              onClick={() => handleSubmit('2')}>Atras
            </button>
            <button type="button" className="w-1/4 bg-red-500 text-white py-2 rounded"
              onClick={handleNext}>Siguiente
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProyectoSteep3;