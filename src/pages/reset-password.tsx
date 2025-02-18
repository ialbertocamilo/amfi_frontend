import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import "./globals.css";

import api from "@/lib/api";
import { Link } from '@mui/material';
import toast from "react-hot-toast";

interface FormData {

    email: string;
    password: string;

}


const Login = () => {

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''

    });
    const router = useRouter();

    const handleChange = (e: any) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/auth/recover-password', {email: formData.email})
            toast.success('Se ha enviado un enlace para recuperar tu contraseña a tu correo electrónico')
        } catch (e: any) {
            if (e.status === 409)
                toast.error(e?.response?.data?.clientMessage)
            else
                toast.error('Ocurrió un error al tratar de restablecer la contraseña')
        }

    };


    return (
        <div className="flex flex-col md:flex-row bg-white">
            <div className="flex-1 flex items-center justify-center  h-screen">
                <img src="/camera-setup.png" alt="Camera setup" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="absolute top-0 right-0 m-4">
                    <Link href="/login" variant="body2" sx={{color: 'blue', textDecoration: 'none'}}>
                        {'Iniciar sesión'}
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white p-8  rounded">

                    <form onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold text-black mb-4 text-center">
                            Reestablecer <br/> contraseña
                        </h1>
                        <p className="text-black">Ingresa tu correo electrónico y enviaremos un enlace para que cambies
                            la contraseña</p>
                        <br/>
                        <div className="mb-4">
                            <label className="block text-black mb-2" htmlFor="email">Correo electrónico</label>
                            <input className="w-full px-3 py-2 border rounded" type="email" id="email"
                                   name="email" value={formData.email} onChange={handleChange}/>
                        </div>


                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Enviar</button>

                    </form>


                </div>
            </div>
        </div>
    );
}

export default Login;
