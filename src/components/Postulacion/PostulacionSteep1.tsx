import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface registroEntity {
  formData: any,
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  isEditing?: boolean;
}

const PostulacionSteep1 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {

  const router = useRouter();
  const redirect = () => {
      router.push('/lista-de-proyectos');
    };



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

       {/* Sección Presupuesto */}
       <div>
          <h2 className="text-2xl font-semibold mb-4">Presupuesto</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <label>Total</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10000,000000.00" />
            </div>
            <div>
              <label>Personal</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Pre y pro</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Talento</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Equipo</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Set locación</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Viajes</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Digital</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Foto fija</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Post producción</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
            <div>
              <label>Mark up %</label>
              <input type="text" className="border p-2 w-full rounded-lg" defaultValue="10,000000.00" />
            </div>
          </div>
        </div>

        {/* Sección Bid Letter */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Bid Letter</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Días Producción</label>
              <input type="number" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Locación</label>
              <input type="number" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Foro</label>
              <input type="number" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Foráneo</label>
              <input type="number" className="border p-2 w-full rounded-lg" />
            </div>
            <div >
              <label>Ciudad</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div >
              <label>Versiones</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div className="col-span-2">
              <label>Descripción (Opcional)</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Sección Crew */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Crew</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Dirección</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Dirección de fotografía</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Producción ejecutiva</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div  className="col-span-3">
              <label>Descripción (Opcional)</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Cantidad total</label>
              <input type="number" className="border p-2 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Sección Equipo */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Equipo</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Cámara</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Óptica</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>General</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div>
              <label>Especializado</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
            <div className="col-span-4">
              <label>Descripción adicional</label>
              <input type="text" className="border p-2 w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => redirect()}>
              Atras
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleSubmit('2')}>
              Siguiente
            </button>
          </div>
        </div>


          

      

      </div>
    </div>
  );
};

export default PostulacionSteep1;