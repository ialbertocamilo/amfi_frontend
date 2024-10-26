import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import "./globals.css";
import {Link} from '@mui/material';
import {useRouter} from "next/router";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface FormData {
    email: string;
    password: string;
    password2: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        password2: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const router = useRouter();
    const {token} = router.query;

    useEffect(() => {
        if (token) {
            api.get(`/auth/check-token?token=${token}`).then(data => {
                if (!data?.data?.content?.status) {
                    toast.error('Enlace erróneo o expirado')
                    router.push('/login')
                    return
                }

            }).catch(err => {
                toast.error('Enlace erróneo o expirado')
                router.push('/login')
            })
        }
    }, [token]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        try {

             await api.post('auth/change-password', {
                token, password: formData.password
            })
            setIsSubmitted(true);
        } catch (e: any) {
            if (e?.status == 400)
                e.response.data.message.forEach((value: any) => toast.error(value))
            else
                toast.error('Error no se pudo cambiar la contraseña.')
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white">
            <div className="flex-1 flex items-center justify-center h-screen">
                <img src="/camera-setup.png" alt="Camera setup" className="w-full h-full object-cover"/>
            </div>
            <div id="contenido-derecho" className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="absolute top-0 right-0 m-4">
                    <Link href="/login" variant="body2" sx={{color: 'red', textDecoration: 'none'}}>
                        {'Iniciar sesión'}
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white p-4 rounded">
                    {isSubmitted ? (

                        <div className="flex flex-col items-center justify-center h-screen bg-white">
                            <img src="/IconSuccess.png" alt="Success" className="w-16 h-16 "/>
                            <h1 className="text-4xl font-bold text-black mb-4 text-center">
                                Contraseña cambiada <br/> exitosamente.
                            </h1>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-4xl font-bold text-black mb-4 text-center">
                                Reestablecer <br/> contraseña
                            </h1>
                            <p className="text-black">Ingresa tu nueva contraseña</p>
                            <br/>
                            <div className="mb-4">
                                <label className="block text-black mb-2" htmlFor="password">Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="password"
                                       name="password" value={formData.password} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-black mb-2" htmlFor="password">Vuelve a ingresar la nueva
                                    contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="password2"
                                       name="password2" value={formData.password2} onChange={handleChange}/>
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Cambiar
                                contraseña
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;