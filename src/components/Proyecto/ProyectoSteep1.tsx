import { FaCheck } from "react-icons/fa";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
  readonly?: boolean;
}

const ProyectoSteep1 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab, isEditing, readonly }: registroEntity) => {

  const guardarProyecto = async () => {
    console.log(readonly);
    
    // if (readonly) {
    //   setactiveTab('2')
    // } else {
    //   const token = localStorage.getItem('token')?.replace(/"/g, '');
    //   const user = JSON.parse(localStorage.getItem('user') || '{}');

    //   const projectData: any = {
    //     "brand": formData?.brand,
    //     "product": formData?.product,
    //     "category": formData?.category,
    //     "projectName": formData?.projectName,
    //     "versionName": formData?.versionName,
    //     "versionNumber": formData?.versionNumber,
    //     "agencyName": formData?.agencia,
    //     "agencyEmail": formData?.agencyEmail,
    //     "agencyCreativeDirector": formData?.agencyCreativeDirector,
    //     "agencyAccountDirector": formData?.agencyAccountDirector,
    //     "odtNumber": formData?.odtNumber,
    //     "buyerContact": formData?.buyerContact,
    //     "budget": 1,
    //     "status": "En progreso",
    //     "projectStep": 1,
    //     "extra": {}
    //   };
    //   if (user.user?.company?.type === 'advertiser') {
    //     projectData.advertiserId = user.user.company.id;
    //   } else if (user.user?.company?.type === 'agency') {
    //     projectData.agencyId = user.user.company.id;
    //   } else{
    //     console.log('Is admin or moderator')
    //   }
    //   try {
    //     const response = await api.post(`/project/create`, projectData, {
    //       headers: {
    //         'Authorization': 'Bearer ' + token
    //       }
    //     });
    //     localStorage.setItem('projectId', response.data.id);
    //     toast.success('Registro de proyecto exitoso');
    //     setactiveTab('2')
    //   } catch (error: any) {
    //     console.error("Registration error:", error);
    //     if (error.status === 400)
    //       error.response?.data?.message.forEach((value: any) => toast.error(value))
    //     if (error.status === 409)
    //       toast.error(error.response?.data?.clientMessage)
    //   }
    // }
  }


  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>


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

        <h2 className="text-xl font-bold mb-4">Datos del proyecto</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">

          {/* <div>
            <label htmlFor="anunciante" className="block text-sm font-medium text-gray-700">Anunciante</label>
            <input
              type="text"
              id="anunciante"
              name="anunciante"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.anunciante}
              onChange={handleChange}
              disabled={isEditing}
            />
          </div> */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.brand}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Producto</label>
            <input
              type="text"
              id="product"
              name="product"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.product}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.category}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Nombre de Campaña / Proyecto</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.projectName}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="versionName" className="block text-sm font-medium text-gray-700">Versiones</label>
            <input
              type="text"
              id="versionName"
              name="versionName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.versionName}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>
          <div>
            <label htmlFor="versionNumber" className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              id="versionNumber"
              name="versionNumber"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData?.versionNumber}
              onChange={handleChange}
              disabled={readonly}
            />
          </div>


        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Datos de la agencia</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">Nombre de la agencia</label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.agencyName}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="agencyEmail" className="block text-sm font-medium text-gray-700">Correo del responsable</label>
              <input
                type="email"
                id="agencyEmail"
                name="agencyEmail"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.agencyEmail}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="agencyCreativeDirector" className="block text-sm font-medium text-gray-700">Nombre del Director Creativo</label>
              <input
                type="text"
                id="agencyCreativeDirector"
                name="agencyCreativeDirector"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.agencyCreativeDirector}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="contactoFinanzas" className="block text-sm font-medium text-gray-700">Contacto Finanzas</label>
              <input
                type="text"
                id="contactoFinanzas"
                name="contactoFinanzas"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.contactoFinanzas}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="agencyAccountDirector" className="block text-sm font-medium text-gray-700">Nombre del Director de Cuentas</label>
              <input
                type="text"
                id="agencyAccountDirector"
                name="agencyAccountDirector"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.agencyAccountDirector}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="productorAgencia" className="block text-sm font-medium text-gray-700">Productor de la agencia</label>
              <input
                type="text"
                id="productorAgencia"
                name="productorAgencia"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.productorAgencia}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="odtNumber" className="block text-sm font-medium text-gray-700">Número ODT</label>
              <input
                type="text"
                id="odtNumber"
                name="odtNumber"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.odtNumber}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
            <div>
              <label htmlFor="buyerContact" className="block text-sm font-medium text-gray-700">Contacto Compras</label>
              <input
                type="text"
                id="buyerContact"
                name="buyerContact"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.buyerContact}
                onChange={handleChange}
                disabled={readonly}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button type="submit" className="w-1/4 bg-red-500 text-white py-2 rounded" onClick={() => guardarProyecto()}>Siguiente</button>
        </div>
      </div>


    </div>
  );
};

export default ProyectoSteep1;
