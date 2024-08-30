import { useState, ChangeEvent, FormEvent } from 'react';
import "./globals.css";

import { Link } from '@mui/material';

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
        // console.log('formData', formData)
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
                <div className="absolute top-0 right-0 m-4">
                    <Link href="/login" variant="body2" sx={{ color: 'red', textDecoration: 'none' }}>
                        {'Iniciar sesión'}
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white p-8  rounded">

                    <form onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold text-black mb-4 text-center">
                            Reestablecer <br /> contraseña
                        </h1>
                        <p className="text-black">Ingresa tu correo electrónico y enviaremos una liga para que cambies la contraseña</p>
                        <br />
                        <div className="mb-4">
                            <label className="block text-black mb-2" htmlFor="password">Contraseña</label>
                            <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>


                        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Enviar</button>

                    </form>



                </div>
            </div>
        </div>
    );
}

export default Login;
