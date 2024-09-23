import { useState } from "react";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";
import EntregableList from "./EntregableList";
import AddEntregableModal from "./AddEntregableModal ";

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  setEntregables: any;
  entregables: any[];
}







const ProyectoSteep4 = ({
  formData,
  handleChange,
  handleSubmit,
  activeTab,
  setactiveTab,

}: registroEntity) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entregables, setEntregables] = useState<any[]>([]);

  const handleAddEntregable = (entregable: any) => {
    const updatedEntregable = [...entregables, entregable];
    setEntregables(updatedEntregable)

  };
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>

      <form >
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          {/* Navegación de pestañas */}
          <div className="tabs flex justify-center space-x-10 mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setactiveTab(step.toString())}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= step
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
                  }`}
              >
                {Number(activeTab) >= step ? <FaCheck /> : step}
              </button>
            ))}
          </div>

          {/* Sección: Desglose Creativo */}
          <h2 className="text-xl font-bold mb-4">Desglose creativo</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            {[
              "Cinematografía",
              "Arte/ Props",
              "Talento",
              "Vestuario",
              "Locación",
              "Casting",
              "Compesanción",
              "Maquillaje y peinado",
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.toLowerCase()}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field}
                </label>
                <input
                  type="text"
                  id={field.toLowerCase()}
                  name={field.toLowerCase()}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Descripción aquí"
                  value={formData[field.toLowerCase()]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Sección: Post Producción */}
          <h2 className="text-xl font-bold mb-4">Post producción</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            {["Online", "Música", "Locución", "Animación", "Audio", "Entrega"].map(
              (field, index) => (
                <div key={index}>
                  <label
                    htmlFor={field.toLowerCase()}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field.toLowerCase()}
                    name={field.toLowerCase()}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Descripción aquí"
                    value={formData[field.toLowerCase()]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>

          {/* Sección: Asistentes filmación */}
          <h2 className="text-xl font-bold mb-4">Asistentes filmación</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="cantidadAsistentes"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidadAsistentes"
                name="cantidadAsistentes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.cantidadAsistentes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="puestoAsistentes"
                className="block text-sm font-medium text-gray-700"
              >
                Puesto
              </label>
              <select
                id="puestoAsistentes"
                name="puestoAsistentes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.puestoAsistentes}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Cámara">Cámara</option>
                <option value="Sonido">Sonido</option>
                <option value="Producción">Producción</option>
              </select>
            </div>
          </div>

          {/* Sección: Entregables */}
          <h2 className="text-xl font-bold mb-4">Entregables</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="text-left mt-4">
              <div className="text-left">
                {entregables.length > 0 ? (
                  <EntregableList entregablesIni={entregables} />
                ) : (
                  <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                    <FaExclamationCircle className="mr-2" style={{ color: '#4B9AA5' }} />
                    Aqui puedes agregar tus entregable.
                  </div>
                )}
              </div>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                Agregar Entregable
              </button>
              <AddEntregableModal
                entregable={null}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddEntregable}
                onUpdate={null}
              />
            </div>


            <div className="">

              <label htmlFor="comentarioEntregables" className="block text-sm font-medium text-gray-700">Comentarios</label>

              <textarea
                id="comentarioEntregables"
                name="comentarioEntregables"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.comentarioEntregables}
                onChange={handleChange}
                maxLength={300}
              />




            </div>
            <div>
              {["Video", "Foto", "Locutor", "Total"].map(
                (field, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <label
                      htmlFor={field.toLowerCase()}
                      className="block text-sm font-medium text-gray-700 w-1/4"
                    >
                      {field}
                    </label>
                    <input
                      type="number"
                      id={field.toLowerCase()}
                      name={field.toLowerCase()}
                      className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md"
                      placeholder="Descripción aquí"
                      value={formData[field.toLowerCase()]}
                      onChange={handleChange}
                    />
                  </div>
                )
              )}
            </div>

          </div>

          {/* Sección: Comentarios */}
          <h2 className="text-xl font-bold mb-4">Comentarios</h2>
          <div className="mb-8">
            <textarea
              id="comentarios"
              name="comentarios"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Descripción aquí"
              value={formData.comentarios}
              onChange={handleChange}
            />
          </div>

          {/* Sección: Responsables */}
          <h2 className="text-xl font-bold mb-4">Responsables de seguimiento de agencia</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="tituloResponsable"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="tituloResponsable"
                name="tituloResponsable"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Título aquí"
                value={formData.tituloResponsable}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="nombreResponsable"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <select
                id="nombreResponsable"
                name="nombreResponsable"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nombreResponsable}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Pedro">Pedro</option>
                <option value="María">María</option>
                <option value="Juan">Juan</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
              onClick={() => 
                {
                setEntregables(entregables)
                handleSubmit('3')}}
            >
              Atras
            </button>
            <button
              type="button"
              className="w-1/4 bg-red-500 text-white py-2 rounded"
              onClick={() =>{
                setEntregables(entregables)
                handleSubmit('5')}} 
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProyectoSteep4;
