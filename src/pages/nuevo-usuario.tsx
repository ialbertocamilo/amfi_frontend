// pages/new-user.tsx
import { useState } from 'react';
import "./globals.css";
import Navbar from '@/components/NavBar';
import { FaBars } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';

const NewUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic
    console.log('User data:', formData);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [enviado, setEnviado] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const enviar = () => {
    setEnviado(true)
  }
  const redirect = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            className="p-2 focus:outline-none focus:bg-gray-200 z-40"
            onClick={toggleSidebar}
          >
            <FaBars className="w-6 h-6" />
          </button>
          <Navbar />
        </div>
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
          <div className="text-sm text-gray-500 mb-8">
            <span>Usuarios</span> {">"} <span>Usuario Nuevo</span>
          </div>

          {/* Formulario de eregistro de nuevo usuario */}
          {!enviado && (
            <div className="mb-8 bg-white shadow-md rounded m-4 p-6   flex flex-col items-center justify-center">
              <div className="w-full max-w-lg bg-white p-8 rounded-lg ">

                {/* Page Title */}
                <div className="flex justify-center">
                  <h1 className="text-2xl font-bold text-gray-700 mb-4">Ingresa los datos del nuevo usuario</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                      Nombres
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Correo Electrónico empresarial
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  {/* Info Message */}
                  <div className="mb-6 p-4" style={{ backgroundColor: '#DFF9FF', color: 'gray' }}>
                    <p>El usuario nuevo recibirá un correo para que pueda crear una cuenta.</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                    onClick={enviar}
                  >
                    Enviar invitación
                  </button>
                </form>
              </div>
            </div>
          )}

          {enviado && (
            <div className="flex flex-col items-center justify-center h-screen bg-white">
              <img src="/IconSuccess.png" alt="Success" className="w-16 h-16" />
              <h1 className="text-4xl font-bold text-black mb-4 text-center">
                Usuario creado correctamente
              </h1>
              <div className="flex justify-center">
                <div className="flex space-x-4">
                  <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => redirect()}>
                    Ir a inicio
                  </button>
                </div>
              </div>
            </div>
          )}




        </div>
      </div>
    </div>
  );
};

export default NewUserPage;
