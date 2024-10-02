import { useState } from "react";
import { FaCheck, FaTimes, FaUpload } from "react-icons/fa";
interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
}

const ProyectoSteep3 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {



  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>




      <form >
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          <div className="tabs flex justify-center space-x-10">
            <button
              onClick={() => setactiveTab('1')}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {Number(activeTab) >= 1 ? <FaCheck /> : '1'}
            </button>
            <button
              onClick={() => setactiveTab('2')}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {Number(activeTab) >= 2 ? <FaCheck /> : '2'}
            </button>

            <button
              onClick={() => setactiveTab('3')}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {Number(activeTab) >= 3 ? <FaCheck /> : '3'}
            </button>

            <button
              onClick={() => setactiveTab('4')}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 4 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {Number(activeTab) >= 4 ? <FaCheck /> : '4'}
            </button>

            <button
              onClick={() => setactiveTab('3')}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 5 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {Number(activeTab) >= 5 ? <FaCheck /> : '5'}
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">Objetivos de marca</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">

            <div>
              <label htmlFor="objetivoComunicacion" className="block text-sm font-medium text-gray-700">Objetivos de comunicación</label>
              <textarea
                id="objetivoComunicacion"
                name="objetivoComunicacion"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.objetivoComunicacion}
                onChange={handleChange}
                maxLength={300}
              />
            </div>

            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target</label>
              <textarea
                id="target"
                name="target"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.target}
                onChange={handleChange}
                maxLength={300}
              />
            </div>

            <div>
              <label htmlFor="lineamientosMarca" className="block text-sm font-medium text-gray-700">Lineamientos de marca</label>
              <textarea
                id="lineamientosMarca"
                name="lineamientosMarca"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.lineamientosMarca}
                onChange={handleChange}
                maxLength={300}
              />
            </div>

          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Documentos</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="line1" className="block text-sm font-medium text-gray-700">Line</label>
                <input
                  type="file"
                  id="line1"
                  name="line1"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="line1"
                  className="mt-1 flex items-center justify-center w-full p-2 border border-gray-300 rounded-md text-green-500 cursor-pointer"
                >
                  <FaUpload className="mr-2" />
                  Subir archivo
                </label>
                {formData.line1 && (
                  <div className="mt-2 flex items-center">
                    <p className="text-sm text-gray-500">Archivo seleccionado: {formData.line1}</p>
                    <FaTimes
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={formData.line1 && (() => handleChange({ target: { name: 'line1', value: '' } }))}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="link1" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link1"
                  name="link1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.link1}
                  onChange={handleChange}
                  placeholder="www.google.com"
                />
              </div>

              <div>
                <label htmlFor="line2" className="block text-sm font-medium text-gray-700">Line</label>
                <input
                  type="file"
                  id="line2"
                  name="line2"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="line2"
                  className="mt-1 flex items-center justify-center w-full p-2 border border-gray-300 rounded-md text-green-500 cursor-pointer"
                >
                  <FaUpload className="mr-2" />
                  Subir archivo
                </label>
                {formData.line2 && (
                  <div className="mt-2 flex items-center">
                    <p className="text-sm text-gray-500">Archivo seleccionado: {formData.line2}</p>
                    <FaTimes
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={formData.line2 && (() => handleChange({ target: { name: 'line2', value: '' } }))}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="link2" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link2"
                  name="link2"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.link2}
                  onChange={handleChange}
                  placeholder="www.google.com"
                />
              </div>

              <div>
                <label htmlFor="line3" className="block text-sm font-medium text-gray-700">Line</label>
                <input
                  type="file"
                  id="line3"
                  name="line3"
                  className="hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="line3"
                  className="mt-1 flex items-center justify-center w-full p-2 border border-gray-300 rounded-md text-green-500 cursor-pointer"
                >
                  <FaUpload className="mr-2" />
                  Subir archivo
                </label>
                {formData.line3 && (
                  <div className="mt-2 flex items-center">
                    <p className="text-sm text-gray-500">Archivo seleccionado: {formData.line3}</p>
                    <FaTimes
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={formData.line3 && (() => handleChange({ target: { name: 'line3', value: '' } }))}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="link3" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link3"
                  name="link3"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.link3}
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
                <label htmlFor="responsablePago" className="block text-sm font-medium text-gray-700">Responsable de pago</label>
                <select
                  id="responsablePago"
                  name="responsablePago"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.responsablePago}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="momentoFacturacion" className="block text-sm font-medium text-gray-700">Momento de facturación de Agencia</label>
                <select
                  id="momentoFacturacion"
                  name="momentoFacturacion"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.momentoFacturacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="politicaPago" className="block text-sm font-medium text-gray-700">Política de pago</label>
                <select
                  id="politicaPago"
                  name="politicaPago"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.politicaPago}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="contratoProyecto" className="block text-sm font-medium text-gray-700">Contrato de proyecto</label>
                <select
                  id="contratoProyecto"
                  name="contratoProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.contratoProyecto}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="tipoProyecto" className="block text-sm font-medium text-gray-700">Tipo de proyecto</label>
                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.tipoProyecto}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="momentoFacturacion" className="block text-sm font-medium text-gray-700">Momento de facturación</label>
                <select
                  id="momentoFacturacion"
                  name="momentoFacturacion"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.momentoFacturacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="rondaCotizacion" className="block text-sm font-medium text-gray-700">Ronda de cotización</label>
                <select
                  id="rondaCotizacion"
                  name="rondaCotizacion"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.rondaCotizacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
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
                    className="mr-2"
                    checked={formData.visualizacion === 'si'}
                    onChange={handleChange}
                  />
                  <label htmlFor="visualizacionSi" className="mr-4">Sí</label>
                  <input
                    type="radio"
                    id="visualizacionNo"
                    name="visualizacion"
                    value="no"
                    className="mr-2"
                    checked={formData.visualizacion === 'no'}
                    onChange={handleChange}
                  />
                  <label htmlFor="visualizacionNo">No</label>
                </div>
              </div>

              <div>
              <label htmlFor="politicaAltaProveedor" className="block text-sm font-medium text-gray-700">Política de alta al proveedor</label>
              <textarea
                id="politicaAltaProveedor"
                name="politicaAltaProveedor"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.politicaAltaProveedor}
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
                <label htmlFor="porcentajeTasaAnticipo" className="block text-sm font-medium text-gray-700">Porcentaje de tasa sobre el anticipo</label>
                <input
                  type="number"
                  id="porcentajeTasaAnticipo"
                  name="porcentajeTasaAnticipo"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.porcentajeTasaAnticipo}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>

              <div>
                <label htmlFor="porcentajeTasaFiniquito" className="block text-sm font-medium text-gray-700">Porcentaje de tasa sobre el finiquito</label>
                <input
                  type="number"
                  id="porcentajeTasaFiniquito"
                  name="porcentajeTasaFiniquito"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.porcentajeTasaFiniquito}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>

              <div>
                <label htmlFor="porcentajeTasaTotal" className="block text-sm font-medium text-gray-700">Porcentade de tasa total</label>
                <input
                  type="number"
                  id="porcentajeTasaTotal"
                  name="porcentajeTasaTotal"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.porcentajeTasaTotal}
                  onChange={handleChange}
                  placeholder="%"
                />
              </div>


              <div>
              <label htmlFor="informacionAdicional" className="block text-sm font-medium text-gray-700">Información adicional</label>
              <textarea
                id="informacionAdicional"
                name="informacionAdicional"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.informacionAdicional}
                onChange={handleChange}
                maxLength={300}
              />
            </div>

            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button type="button" className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded" onClick={() => handleSubmit('2')}>Atras</button>
            <button type="button" className="w-1/4 bg-red-500 text-white py-2 rounded" onClick={() => handleSubmit('4')}>Siguiente</button>
          </div>
        </div>


      </form>
    </div>
  );
};

export default ProyectoSteep3;
