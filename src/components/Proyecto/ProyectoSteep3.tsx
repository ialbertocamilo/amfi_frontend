import UploaderComponent from '../UploaderComponent';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
}

const ProyectoSteep3 = ({ formData, handleChange, handleSubmit,  }: registroEntity) => {

  const router = useRouter();
  const projectId = router.query.id as string;
  const handleNext = () => {
    handleSubmit('4');
  };

  return (
    <div className="space-y-8 p-4">

      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          {/*TODO: estos datos estan por ver porque fueron aceptados en un principio*/}
          {/*<h2 className="text-xl font-bold mb-4">Objetivos de marca</h2>*/}
          {/*<div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">*/}
          {/*  <div>*/}
          {/*    <label htmlFor="objetivoComunicacion" className="block text-sm font-medium text-gray-700">Objetivos*/}
          {/*      de comunicación</label>*/}
          {/*    <textarea*/}
          {/*      id="objetivoComunicacion"*/}
          {/*      name="objetivoComunicacion"*/}
          {/*      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"*/}
          {/*      value={formData?.objetivoComunicacion}*/}
          {/*      onChange={handleChange}*/}
          {/*      maxLength={300}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target</label>*/}
          {/*    <textarea*/}
          {/*      id="target"*/}
          {/*      name="target"*/}
          {/*      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"*/}
          {/*      value={formData?.target}*/}
          {/*      onChange={handleChange}*/}
          {/*      maxLength={300}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <label htmlFor="lineamientosMarca" className="block text-sm font-medium text-gray-700">Lineamientos*/}
          {/*      de marca</label>*/}
          {/*    <textarea*/}
          {/*      id="lineamientosMarca"*/}
          {/*      name="lineamientosMarca"*/}
          {/*      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"*/}
          {/*      value={formData?.lineamientosMarca}*/}
          {/*      onChange={handleChange}*/}
          {/*      maxLength={300}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}

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
            <h2 className="text-xl font-bold mb-4">Licitación Finanzas</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="responsablePago" className="block text-sm font-medium text-gray-700">Responsable
                  de pago</label>
                <select
                  id="responsablePago"
                  name="responsablePago"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.responsablePago}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="Anunciante">Anunciante</option>
                  <option value="Agencia de publicidad">Agencia de publicidad</option>
                </select>
              </div>
              <div>
                <label htmlFor="procesoFacturacion"
                       className="block text-sm font-medium text-gray-700">Proceso de facturación </label>
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
              <div>
                <label htmlFor="politicaPago" className="block text-sm font-medium text-gray-700">Política
                  de pago</label>
                <select
                  id="politicaPago"
                  name="politicaPago"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData?.politicaPago}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="0 dias">0 dias</option>
                  <option value="15 dias">15 dias</option>
                  <option value="30 dias">30 dias</option>
                  <option value="45 dias">45 dias</option>
                  <option value="60 dias">60 dias</option>
                  <option value="75 dias">75 dias</option>
                  <option value="90 dias">90 dias</option>
                  <option value="210 dias">210 dias</option>
                </select>
              </div>
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
                  <option value="si">Si</option>
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
                  <option value="si">Si</option>
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
                  <option value="si">Si</option>
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