import { useState } from "react";
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
}

const PostulacionSteep4 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {




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
                type="number"
                placeholder="2D"
                className="border p-2 w-full"
                value={formData.animacion.twoD}
                onChange={(e) => handleChange('animacion', 'twoD', e.target.value)}
              />
              <input
                type="number"
                placeholder="3D"
                className="border p-2 w-full"
                value={formData.animacion.threeD}
                onChange={(e) => handleChange('animacion', 'threeD', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="VFX"
                className="border p-2 w-full"
                value={formData.animacion.vfx}
                onChange={(e) => handleChange('animacion', 'vfx', e.target.value)}
              />
              <textarea
                placeholder="Descripción Adicional"
                className="border p-2 w-full"
                value={formData.animacion.descripcion}
                onChange={(e) => handleChange('animacion', 'descripcion', e.target.value)}
              />
            </div>
          </div>

          {/* Música Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Música</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Original"
                className="border p-2 w-full"
                value={formData.musica.original}
                onChange={(e) => handleChange('musica', 'original', e.target.value)}
              />
              <input
                type="number"
                placeholder="Sound a like"
                className="border p-2 w-full"
                value={formData.musica.soundALike}
                onChange={(e) => handleChange('musica', 'soundALike', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Stock"
                className="border p-2 w-full"
                value={formData.musica.stock}
                onChange={(e) => handleChange('musica', 'stock', e.target.value)}
              />
              <input
                type="number"
                placeholder="Licencia"
                className="border p-2 w-full"
                value={formData.musica.licencia}
                onChange={(e) => handleChange('musica', 'licencia', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <textarea
                placeholder="Otro"
                className="border p-2 w-full"
                value={formData.musica.otro}
                onChange={(e) => handleChange('musica', 'otro', e.target.value)}
              />
              <textarea
                placeholder="Descripción Adicional"
                className="border p-2 w-full"
                value={formData.musica.descripcion}
                onChange={(e) => handleChange('musica', 'descripcion', e.target.value)}
              />
            </div>
          </div>

          {/* Locutor Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Locutor</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Institucional"
                className="border p-2 w-full"
                value={formData.locutor.institucional}
                onChange={(e) => handleChange('locutor', 'institucional', e.target.value)}
              />
              <input
                type="number"
                placeholder="Principal"
                className="border p-2 w-full"
                value={formData.locutor.principal}
                onChange={(e) => handleChange('locutor', 'principal', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Secundario"
                className="border p-2 w-full"
                value={formData.locutor.secundario}
                onChange={(e) => handleChange('locutor', 'secundario', e.target.value)}
              />
              <input
                type="number"
                placeholder="Voces"
                className="border p-2 w-full"
                value={formData.locutor.voces}
                onChange={(e) => handleChange('locutor', 'voces', e.target.value)}
              />
            </div>
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              value={formData.locutor.descripcion}
              onChange={(e) => handleChange('locutor', 'descripcion', e.target.value)}
            />
          </div>

          {/* Entregables Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Entregables</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Título"
                className="border p-2 w-full"
                value={formData.entregables.titulo}
                onChange={(e) => handleChange('entregables', 'titulo', e.target.value)}
              />
              <input
                type="number"
                placeholder="Duración"
                className="border p-2 w-full"
                value={formData.entregables.duracion}
                onChange={(e) => handleChange('entregables', 'duracion', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Formato"
                className="border p-2 w-full"
                value={formData.entregables.formato}
                onChange={(e) => handleChange('entregables', 'formato', e.target.value)}
              />
              <input
                type="text"
                placeholder="Lift"
                className="border p-2 w-full"
                value={formData.entregables.lift}
                onChange={(e) => handleChange('entregables', 'lift', e.target.value)}
              />
            </div>
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              value={formData.entregables.descripcion}
              onChange={(e) => handleChange('entregables', 'descripcion', e.target.value)}
            />
            <textarea
              placeholder="Notas"
              className="border p-2 w-full"
              value={formData.entregables.notas}
              onChange={(e) => handleChange('entregables', 'notas', e.target.value)}
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
