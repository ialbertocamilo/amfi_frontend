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

const PostulacionSteep2 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {

  const getLabelText = (type: string) => {
    switch (type) {
      case 'principal':
        return 'Principal';
      case 'secundario':
        return 'Secundario';
      case 'adicional':
        return 'Adicional';
      case 'extras':
        return 'Extras';
      case 'total':
        return 'Total';
      default:
        return '';
    }
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

        <div className="max-w-3xl mx-auto p-4">
          {/* Talento Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Talento</h2>
            {['principal', 'secundario', 'adicional', 'extras', 'total'].map((item) => (
              <div key={item} className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700">{getLabelText(item)}</label>
                  <input
                    type="number"
                    placeholder="Número"
                    className="border p-2 w-full"
                    value={(formData.talento as any)[item].numero}
                    onChange={(e) => handleChange('talento', item, 'numero', e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Texto"
                    className="border p-2 w-full"
                    maxLength={300}
                    value={(formData.talento as any)[item].texto}
                    onChange={(e) => handleChange('talento', item, 'texto', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Vestuario Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Vestuario</h2>
            {/* <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Descripción adicional</label> */}
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              maxLength={300}
              value={formData.vestuario.descripcion}
              onChange={(e) => handleChange('vestuario', 'descripcion', e.target.value)}
            />
          </div>

          {/* Arte Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Arte</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Sets</label>

                <input
                  type="text"
                  placeholder="Sets"
                  className="border p-2 w-full"
                  value={formData.arte.sets}
                  onChange={(e) => handleChange('arte', 'sets', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Props</label>
                <input
                  type="text"
                  placeholder="Props"
                  className="border p-2 w-full"
                  value={formData.arte.props}
                  onChange={(e) => handleChange('arte', 'props', e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Descripción adicional</label>
            <textarea
              placeholder="Descripción adicional"
              className="border p-2 w-full"
              maxLength={300}
              value={formData.arte.descripcion}
              onChange={(e) => handleChange('arte', 'descripcion', e.target.value)}
            />
          </div>
        </div>




        {/* Botones */}

        <div className="flex justify-center mt-8">
          <div className="flex space-x-4">
            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => handleSubmit('1')}>
              Atras
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleSubmit('3')}>
              Siguiente
            </button>
          </div>
        </div>





      </div>
    </div>
  );
};

export default PostulacionSteep2;
