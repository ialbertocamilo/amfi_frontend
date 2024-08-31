import { useState, ChangeEvent, FormEvent } from 'react';
import "./globals.css";

import {  Link } from '@mui/material';

interface FormData {
    
    email: string;
    password: string;
    
}


const Login = () => {
    
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
        
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };




    return (
        <div className="flex flex-col md:flex-row bg-white">
            <div className="flex-1 flex items-center justify-center  h-screen">
                <img src="/camera-setup.png" alt="Camera setup" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md bg-white p-8  rounded">

                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-bold mb-4 text-center text-black">Inicio de sesión</h1>
                           
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Usuario</label>
                                <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                            </div>

                            <div className="mb-4 flex items-center justify-end">
                                <Link href="/reset-password" variant="body2" sx={{ color: 'red',  textDecoration: 'none'}}>
                                    {'Restablecer contraseña'}
                                </Link>
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Ingresar</button>
                            <div className="mt-4 mb-4 flex items-center justify-center">
                              <Link href="/register" variant="body2" sx={{ color: 'red',  textDecoration: 'none' }}>
                                  {'Regístrate'}
                              </Link>
                            </div>
                        </form>
                    


                </div>
            </div>
        </div>
    );
}

export default Login;
