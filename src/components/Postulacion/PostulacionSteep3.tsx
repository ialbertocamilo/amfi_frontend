import { FaCheck } from "react-icons/fa";
import Input from "../inputs/Input";
import { useState } from "react";
import { toast } from "react-hot-toast";
import RequiredTag from "../Proyecto/RequiredTag";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
}

const PostulacionSteep3 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

  const validateFields = () => {
    const errors: string[] = [];
    const newFieldErrors: { [key: string]: boolean } = {};

    // Validar locaciones
    const locacionesFields = [
      { field: 'interior', label: 'Interior' },
      { field: 'exterior', label: 'Exterior' },
      { field: 'cantidad', label: 'Cantidad' },
      { field: 'descripcion', label: 'Descripción' }
    ];

    locacionesFields.forEach(({ field, label }) => {
      if (!formData.locaciones[field]) {
        errors.push(`${label} de locaciones es requerido`);
        newFieldErrors[`locaciones.${field}`] = true;
      }
    });

    const transporteFields = [
      { field: 'cliente', label: 'Cliente' },
      { field: 'produccion', label: 'Producción' },
      { field: 'vuelos', label: 'Vuelos' },
      { field: 'foraneo', label: 'Foráneo' },
      { field: 'descripcion', label: 'Descripción' }
    ];

    transporteFields.forEach(({ field, label }) => {
      if (!formData.transporte[field]) {
        errors.push(`${label} de transporte es requerido`);
        newFieldErrors[`transporte.${field}`] = true;
      }
    });

    // Validar postproducción
    const postproduccionFields = [
      { field: 'edicion', label: 'Edición' },
      { field: 'audio', label: 'Audio' },
      { field: 'online', label: 'Online' },
      { field: 'masterizacion', label: 'Masterización' },
      { field: 'cc', label: 'CC' },
      { field: 'descripcion', label: 'Descripción' }
    ];

    postproduccionFields.forEach(({ field, label }) => {
      if (!formData.postproduccion[field]) {
        errors.push(`${label} de postproducción es requerido`);
        newFieldErrors[`postproduccion.${field}`] = true;
      }
    });

    setFieldErrors(newFieldErrors);

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateFields()) {
      handleSubmit('4');
    }
  };

  return (
    <div className="space-y-2">
      <div className="mb-8 bg-white shadow-md rounded ">
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
              <Input
                label={"Interior"}
                type={"text"}
                name={"locaciones.interior"}
                value={formData.locaciones.interior}
                onChange={handleChange}
                error={fieldErrors['locaciones.interior']}
                required
              />
              <Input
                label={"Exterior"}
                type={"text"}
                name={"locaciones.exterior"}
                value={formData.locaciones.exterior}
                onChange={handleChange}
                error={fieldErrors['locaciones.exterior']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label={"Cantidad"}
                type={"number"}
                name={"locaciones.cantidad"}
                value={formData.locaciones.cantidad}
                onChange={handleChange}
                error={fieldErrors['locaciones.cantidad']}
                required
              />
              <Input
                label={"Descripción adicional"}
                type={"textarea"}
                name={"locaciones.descripcion"}
                value={formData.locaciones?.descripcion || ''}
                onChange={handleChange}
                error={fieldErrors['locaciones.descripcion']}
                required
              />
            </div>
          </div>

          {/* Transporte Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Transporte</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label={"Cliente"}
                type={"number"}
                name={"transporte.cliente"}
                value={formData.transporte.cliente}
                onChange={handleChange}
                error={fieldErrors['transporte.cliente']}
                required
              />
              <Input
                label={"Producción"}
                type={"number"}
                name={"transporte.produccion"}
                value={formData.transporte.produccion}
                onChange={handleChange}
                error={fieldErrors['transporte.produccion']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label={"Vuelos"}
                type={"number"}
                name={"transporte.vuelos"}
                value={formData.transporte.vuelos}
                onChange={handleChange}
                error={fieldErrors['transporte.vuelos']}
                required
              />
              <Input
                label={"Foráneo"}
                type={"number"}
                name={"transporte.foraneo"}
                value={formData.transporte.foraneo}
                onChange={handleChange}
                error={fieldErrors['transporte.foraneo']}
                required
              />
            </div>
            <label htmlFor="transporte.descripcion">Descripción</label>
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Edición"
                type="number"
                name="postproduccion.edicion"
                value={formData.postproduccion.edicion}
                onChange={handleChange}
                error={fieldErrors['postproduccion.edicion']}
                required
              />
              <Input
                label="Audio"
                type="number"
                name="postproduccion.audio"
                value={formData.postproduccion.audio}
                onChange={handleChange}
                error={fieldErrors['postproduccion.audio']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Online"
                type="number"
                name="postproduccion.online"
                value={formData.postproduccion.online}
                onChange={handleChange}
                error={fieldErrors['postproduccion.online']}
                required
              />
              <Input
                label="Masterización"
                type="number"
                name="postproduccion.masterizacion"
                value={formData.postproduccion.masterizacion}
                onChange={handleChange}
                error={fieldErrors['postproduccion.masterizacion']}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="CC"
                type="number"
                name="postproduccion.cc"
                value={formData.postproduccion.cc}
                onChange={handleChange}
                error={fieldErrors['postproduccion.cc']}
                required
              />
            </div>

            <Input 
              label={"Descripción adicional"} 
              onChange={handleChange} 
              name="postproduccion.descripcion" 
              value={formData.postproduccion?.descripcion} 
              error={fieldErrors['postproduccion.descripcion']}
              required
            />
          </div>
        
          {/* Botones */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-4">
              <button 
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" 
                onClick={() => setactiveTab('2')}
              >
                Atrás
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" 
                onClick={handleNext}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostulacionSteep3;