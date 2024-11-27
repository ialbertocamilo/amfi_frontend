import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import api from "@/lib/api";
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
  }

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
              <div className="relative flex space-x-2">
                <input
                  type="number"
                  id="presupuesto.total"
                  name="presupuesto.total"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md appearance-none no-spinner"
                  value={formData?.presupuesto?.total}
                  onChange={handleChange}
                />
                <select
                  id="presupuesto.moneda"
                  name="presupuesto.moneda"
                  className="mt-1 block p-2 border border-gray-300 rounded-md bg-white"
                  value={formData?.presupuesto?.moneda}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="mxn">MXN</option>
                  <option value="usd">USD</option>
                </select>
              </div>
            </div>
            <div>
              <label>Personal</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.personal" value={formData.presupuesto.personal} onChange={handleChange} />
            </div>
            <div>
              <label>Pre y pro</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.preYPro" value={formData.presupuesto.preYPro} onChange={handleChange} />
            </div>
            <div>
              <label>Talento</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.talento" value={formData.presupuesto.talento} onChange={handleChange} />
            </div>
            <div>
              <label>Equipo</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.equipo" value={formData.presupuesto.equipo} onChange={handleChange} />
            </div>
            <div>
              <label>Set locación</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.setLocacion" value={formData.presupuesto.setLocacion} onChange={handleChange} />
            </div>
            <div>
              <label>Viajes</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.viajes" value={formData.presupuesto.viajes} onChange={handleChange} />
            </div>
            <div>
              <label>Digital</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.digital" value={formData.presupuesto.digital} onChange={handleChange} />
            </div>
            <div>
              <label>Foto fija</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.fotoFija" value={formData.presupuesto.fotoFija} onChange={handleChange} />
            </div>
            <div>
              <label>Post producción</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.postProduccion" value={formData.presupuesto.postProduccion} onChange={handleChange} />
            </div>
            <div>
              <label>Mark up %</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="presupuesto.markUp" value={formData.presupuesto.markUp} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección Bid Letter */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Bid Letter</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Descripción</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.descripcion" value={formData.bidLetter.descripcion} onChange={handleChange} />
            </div>
            <div>
              <label>Fecha</label>
              <input type="date" className="border p-2 w-full rounded-lg" name="bidLetter.fecha" value={formData.bidLetter.fecha} onChange={handleChange} />
            </div>
            <div>
              <label>Cliente</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.cliente" value={formData.bidLetter.cliente} onChange={handleChange} />
            </div>
            <div>
              <label>Proyecto</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.proyecto" value={formData.bidLetter.proyecto} onChange={handleChange} />
            </div>
            <div>
              <label>Versión</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.version" value={formData.bidLetter.version} onChange={handleChange} />
            </div>
            <div>
              <label>Duración</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.duracion" value={formData.bidLetter.duracion} onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <label>Notas</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="bidLetter.notas" value={formData.bidLetter.notas} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección Crew */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Crew</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Dirección</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="crew.direccion" value={formData.crew.direccion} onChange={handleChange} />
            </div>
            <div>
              <label>Dirección de fotografía</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="crew.direccionFotografia" value={formData.crew.direccionFotografia} onChange={handleChange} />
            </div>
            <div>
              <label>Producción ejecutiva</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="crew.produccionEjecutiva" value={formData.crew.produccionEjecutiva} onChange={handleChange} />
            </div>
            <div className="col-span-3">
              <label>Descripción (Opcional)</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="crew.descripcionOpcional" value={formData.crew.descripcionOpcional} onChange={handleChange} />
            </div>
            <div>
              <label>Cantidad total</label>
              <input type="number" className="border p-2 w-full rounded-lg" name="crew.cantidadTotal" value={formData.crew.cantidadTotal} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Sección Equipo */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Equipo</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label>Cámara</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="equipo.camara" value={formData.equipo.camara} onChange={handleChange} />
            </div>
            <div>
              <label>Óptica</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="equipo.optica" value={formData.equipo.optica} onChange={handleChange} />
            </div>
            <div>
              <label>General</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="equipo.general" value={formData.equipo.general} onChange={handleChange} />
            </div>
            <div>
              <label>Especializado</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="equipo.especializado" value={formData.equipo.especializado} onChange={handleChange} />
            </div>
            <div className="col-span-4">
              <label>Descripción adicional</label>
              <input type="text" className="border p-2 w-full rounded-lg" name="equipo.descripcionAdicional" value={formData.equipo.descripcionAdicional} onChange={handleChange} />
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