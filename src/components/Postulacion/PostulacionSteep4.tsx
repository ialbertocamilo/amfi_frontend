import { FaCheck } from "react-icons/fa";
import EntregablePostulacion from "../EntregablePostulacion";
import ProposalUploaderComponent from "../ProposalUploaderComponent";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
  files: (files: File[]) => void
}

const PostulacionSteep4 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab,files }: registroEntity) => {


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
          {/* Animación Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Animación</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="2D"
                className="border p-2 w-full"
                name="animacion.twoD"
                value={formData.animacion.twoD}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="3D"
                className="border p-2 w-full"
                name="animacion.threeD"
                value={formData.animacion.threeD}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="VFX"
                className="border p-2 w-full"
                name="animacion.vfx"
                value={formData.animacion.vfx}
                onChange={handleChange}
              />
              <textarea
                placeholder="Descripción adicional"
                className="border p-2 w-full"
                name="animacion.descripcion"
                value={formData.animacion.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Música Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Música</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Original"
                className="border p-2 w-full"
                name="musica.original"
                value={formData.musica.original}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Sound-alike"
                className="border p-2 w-full"
                name="musica.soundALike"
                value={formData.musica.soundALike}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Stock"
                className="border p-2 w-full"
                name="musica.stock"
                value={formData.musica.stock}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Licencia"
                className="border p-2 w-full"
                name="musica.licencia"
                value={formData.musica.licencia}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Otro"
                className="border p-2 w-full"
                name="musica.otro"
                value={formData.musica.otro}
                onChange={handleChange}
              />
              <textarea
                placeholder="Descripción adicional"
                className="border p-2 w-full"
                name="musica.descripcion"
                value={formData.musica.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Locutor Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Locutor</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Institucional"
                className="border p-2 w-full"
                name="locutor.institucional"
                value={formData.locutor.institucional}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Principal"
                className="border p-2 w-full"
                name="locutor.principal"
                value={formData.locutor.principal}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Secundario"
                className="border p-2 w-full"
                name="locutor.secundario"
                value={formData.locutor.secundario}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Voces"
                className="border p-2 w-full"
                name="locutor.voces"
                value={formData.locutor.voces}
                onChange={handleChange}
              />
            </div>
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              name="locutor.descripcion"
              value={formData.locutor.descripcion}
              onChange={handleChange}
            />
          </div>

          {/* Proposal uploader Section */}
          <ProposalUploaderComponent identifier={"1"} onFilesChange={files}/>
<br />
          {/* Entregables Section */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <EntregablePostulacion
                entregables={formData.entregables?.lista || []}
                setEntregables={(entregables) => handleChange({
                  target: { 
                    name: 'entregables.lista',
                    value: entregables
                  }
                })}
              />
            </div>
          <div>
            <h2>Notas</h2>

            <textarea
              placeholder="Escriba sus notas aquí"
              className="border p-2 w-full"
              name="notas.text"
              value={formData.notas?.text}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Botones */}

        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => handleSubmit('3')}>
              Atras
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleSubmit('5')}>
              Enviar propuesta
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PostulacionSteep4;
