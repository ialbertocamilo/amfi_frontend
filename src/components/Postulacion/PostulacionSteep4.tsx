import { FaCheck } from "react-icons/fa";
import EntregablePostulacion from "../EntregablePostulacion";
import ProposalUploaderComponent from "../ProposalUploaderComponent";
import Input from "../inputs/Input";
import { useEffect, useState } from "react";
import RequiredTag from "../Proyecto/RequiredTag";
import { toast } from "react-hot-toast";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
  files: (files: File[]) => void
}

const PostulacionSteep4 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab, files }: registroEntity) => {
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const validateForm = () => {
    const errors: string[] = [];
    const newFieldErrors: { [key: string]: boolean } = {};

    // Validate Animacion
    if (!formData.animacion.twoD) {
      console.log('GAA')
      errors.push("2D es requerido");
    }
    if (!formData.animacion.threeD) {
      errors.push("3D es requerido");
    }
    if (!formData.animacion.vfx) {
      errors.push("VFX es requerido");
    }

    // Validate Musica
    if (!formData.musica.original) {
      errors.push("Música original es requerida");
    }
    if (!formData.musica.soundALike) {
      errors.push("Sound-alike es requerido");
    }
    if (!formData.musica.stock) {
      errors.push("Stock es requerido");
    }
    if (!formData.musica.licencia) {
      errors.push("Licencia es requerida");
    }
    if (!formData.musica.otro) {
      errors.push("Otro es requerido");
    }

    // Validate Locutor
    if (!formData.locutor.institucional) {
      errors.push("Locutor institucional es requerido");
    }
    if (!formData.locutor.principal) {
      errors.push("Locutor principal es requerido");
    }
    if (!formData.locutor.secundario) {
      errors.push("Locutor secundario es requerido");
    }
    if (!formData.locutor.voces) {
      errors.push("Voces es requerido");
    }

    if (!formData.notas?.text) {
      errors.push("Las notas son requeridas");
    }

    setFieldErrors(newFieldErrors);

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      handleSubmit('5');
    }
  };


  return (
    <div className="space-y-2">
      <div className="mb-8 bg-white shadow-md rounded">
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
              <Input
                label="2D"
                type="text"
                name="animacion.twoD"
                value={formData.animacion.twoD}
                onChange={handleChange}
                error={fieldErrors['animacion.twoD']}
                required
              />
              <Input
                label="3D"
                type="text"
                name="animacion.threeD"
                value={formData.animacion.threeD}
                onChange={handleChange}
                error={fieldErrors['animacion.threeD']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="VFX"
                type="text"
                name="animacion.vfx"
                value={formData.animacion.vfx}
                onChange={handleChange}
                error={fieldErrors['animacion.vfx']}
                required
              />
              <Input
                label="Descripción adicional"
                type="text"
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
              <Input
                label="Original"
                type="text"
                name="musica.original"
                value={formData.musica.original}
                onChange={handleChange}
                error={fieldErrors['musica.original']}
                required
              />
              <Input
                label="Sound-alike"
                type="text"
                name="musica.soundALike"
                value={formData.musica.soundALike}
                onChange={handleChange}
                error={fieldErrors['musica.soundALike']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Stock"
                type="text"
                name="musica.stock"
                value={formData.musica.stock}
                onChange={handleChange}
                error={fieldErrors['musica.stock']}
                required
              />
              <Input
                label="Licencia"
                type="text"
                name="musica.licencia"
                value={formData.musica.licencia}
                onChange={handleChange}
                error={fieldErrors['musica.licencia']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Otro"
                type="text"
                name="musica.otro"
                value={formData.musica.otro}
                onChange={handleChange}
                error={fieldErrors['musica.otro']}
                required
              />
              <Input
                label="Descripción adicional"
                type="text"
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
              <Input
                label="Institucional"
                type="text"
                name="locutor.institucional"
                value={formData.locutor.institucional}
                onChange={handleChange}
                error={fieldErrors['locutor.institucional']}
                required
              />
              <Input
                label="Principal"
                type="text"
                name="locutor.principal"
                value={formData.locutor.principal}
                onChange={handleChange}
                error={fieldErrors['locutor.principal']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Secundario"
                type="text"
                name="locutor.secundario"
                value={formData.locutor.secundario}
                onChange={handleChange}
                error={fieldErrors['locutor.secundario']}
                required
              />
              <Input
                label="Voces"
                type="text"
                name="locutor.voces"
                value={formData.locutor.voces}
                onChange={handleChange}
                error={fieldErrors['locutor.voces']}
                required
              />
            </div>
            <label htmlFor="locutor.descripcion">Descripción adicional</label>
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              name="locutor.descripcion"
              value={formData.locutor.descripcion}
              onChange={handleChange}
            />
          </div>

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
          <h2 className="text-xl font-bold mb-4">Notas <RequiredTag/></h2>
            <Input
              type="textarea" 
              name="notas.text"
              value={formData.notas?.text}
              onChange={handleChange}
              error={fieldErrors['notas.text']}
              placeholder="Escriba sus notas aquí"
              required
            />
          </div>
          {/* Proposal uploader Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Subir archivos adjuntos <RequiredTag/></h2>
            <ProposalUploaderComponent identifier={"1"} onFilesChange={files} />
          </div>
        </div>
        {/* Botones */}

        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => handleSubmit('3')}>
              Atras
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={handleNext}>
              Enviar propuesta
            </button>
          </div>
        </div>
<br />

      </div>
    </div>
  );
};

export default PostulacionSteep4;