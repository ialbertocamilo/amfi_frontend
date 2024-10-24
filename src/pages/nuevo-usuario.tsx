import {useState} from 'react';
import "./globals.css";
import Navbar from '@/components/Navbar';
import {FaBars} from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import {toast} from "react-hot-toast";
import {sendInvitationEmail} from "@/api/notificationApi";
import {useRouter} from 'next/router';

const NewUserPage = () => {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: ''});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const {firstName, lastName, email} = formData;

        if (!firstName || !lastName || !email) {
            toast.error('Por favor, complete todos los campos.');
            return;
        }

        setLoading(true);

        sendInvitationEmail({email, name: `${firstName} ${lastName}`}).then((data) => {
            if (!data) return
            else
            setTimeout(() => {
                setLoading(false);
                toast.success('¡Datos del usuario enviados con éxito!');
                router.push('/usuarios');
            }, 2000);
        });
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
                <Sidebar/>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button className="p-2 focus:outline-none focus:bg-gray-200 z-40" onClick={toggleSidebar}>
                        <FaBars className="w-6 h-6"/>
                    </button>
                    <Navbar/>
                </div>
                <div className="space-y-8 p-4">
                    <h1 className="text-2xl font-bold mb-6">Nuevo proyecto</h1>
                    <div className="text-sm text-gray-500 mb-8">
                        <span>Usuarios</span> {">"} <span>Usuario Nuevo</span>
                    </div>

                    <div className="mb-8 bg-white shadow-md rounded m-4 p-6 flex flex-col items-center justify-center">
                        <div className="w-full max-w-lg bg-white p-8 rounded-lg">
                            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Ingresa los datos del
                                nuevo usuario</h1>
                            <form onSubmit={handleSubmit}>
                                {['firstName', 'lastName', 'email'].map((field, idx) => (
                                    <div className="mb-4" key={idx}>
                                        <label htmlFor={field} className="block text-gray-700 font-semibold mb-2">
                                            {field === 'firstName' ? 'Nombres' : field === 'lastName' ? 'Apellidos' : 'Correo Electrónico empresarial'}
                                        </label>
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            id={field}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        />
                                    </div>
                                ))}
                                <div className="mb-6 p-4 bg-blue-100 text-gray-700">
                                    <p>El usuario nuevo recibirá un correo para que pueda crear una cuenta.</p>
                                </div>
                                <button type="submit"
                                        className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
                                    {loading ? 'Enviando...' : 'Enviar invitación'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUserPage;