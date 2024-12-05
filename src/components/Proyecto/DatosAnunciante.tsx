import { IUser } from '@/interfaces/user.interface';
import React, { useEffect } from 'react';
import FastSearch from '../modals/FastSearch';
import AddAnunciante from './AddAnunciante';

interface DatosAnuncianteProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  user:IUser
}

const DatosAnunciante: React.FC<DatosAnuncianteProps> = ({ user,formData, handleChange, readonly }) => {


  useEffect(()=>{

    console.log(user)
  },[user])
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Datos del anunciante</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <input
            type="text"
            id="client"
            name="client"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.client || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        {/* TODO: agregar anunciante */}
        {/* <AddAnunciante/> */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Marca
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.brand || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">
            Producto
          </label>
          <input
            type="text"
            id="product"
            name="product"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.product || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label htmlFor="contactoMarketing" className="block text-sm font-medium text-gray-700">
            Contacto Responsable Marketing
          </label>
          <input
            type="text"
            id="contactoMarketing"
            name="contactoMarketing"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.contactoMarketing || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label htmlFor="contactoFinanzas" className="block text-sm font-medium text-gray-700">
            Contacto Finanzas
          </label>
          <input
            type="text"
            id="contactoFinanzas"
            name="contactoFinanzas"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.contactoFinanzas || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label htmlFor="buyerContact" className="block text-sm font-medium text-gray-700">
            Contacto Compras
          </label>
          <input
            type="text"
            id="buyerContact"
            name="buyerContact"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.buyerContact || ''}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
      </div>
    </div>
  );
};

export default DatosAnunciante;