import { FaCheck } from "react-icons/fa";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
}

const PostulacionSteep3 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {

  return (
      <div className="space-y-8 p-4">
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
          </div>

          <div className="max-w-4xl mx-auto p-4">
            {/* Locaciones Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Locaciones</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Interior"
                    className="border p-2 w-full"
                    name="locaciones.interior"
                    value={formData.locaciones.interior}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Exterior"
                    className="border p-2 w-full"
                    name="locaciones.exterior"
                    value={formData.locaciones.exterior}
                    onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    type="number"
                    placeholder="Cantidad"
                    className="border p-2 w-full"
                    name="locaciones.cantidad"
                    value={formData.locaciones.cantidad}
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Descripción adicional"
                    className="border p-2 w-full"
                    name="locaciones.descripcion"
                    value={formData.locaciones.descripcion}
                    onChange={handleChange}
                />
              </div>
            </div>

            {/* Transporte Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Transporte</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    type="number"
                    placeholder="Cliente"
                    className="border p-2 w-full"
                    name="transporte.cliente"
                    value={formData.transporte.cliente}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Producción"
                    className="border p-2 w-full"
                    name="transporte.produccion"
                    value={formData.transporte.produccion}
                    onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                    type="number"
                    placeholder="Vuelos"
                    className="border p-2 w-full"
                    name="transporte.vuelos"
                    value={formData.transporte.vuelos}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Foráneo"
                    className="border p-2 w-full"
                    name="transporte.foraneo"
                    value={formData.transporte.foraneo}
                    onChange={handleChange}
                />
              </div>
              <textarea
                  placeholder="Descripción adicional"
                  className="border p-2 w-full"
                  name="transporte.descripcion"
                  value={formData.transporte.descripcion}
                  onChange={handleChange}
              />
            </div>

            {/* Post Producción Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Post producción</h2>
              {['edicion', 'audio', 'online', 'masterizacion'].map((item) => (
                  <div key={item} className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="number"
                        placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
                        className="border p-2 w-full"
                        name={`postProduccion.${item}.numero`}
                        value={formData.postProduccion[item].numero}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="CC"
                        className="border p-2 w-full"
                        name={`postProduccion.${item}.cc`}
                        value={formData.postProduccion[item].cc}
                        onChange={handleChange}
                    />
                  </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => setactiveTab('2')}>
                Atrás
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleSubmit('4')}>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PostulacionSteep3;