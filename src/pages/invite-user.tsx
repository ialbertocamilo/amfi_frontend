import {useEffect, useState} from 'react';
import "./globals.css";
import {useRouter} from 'next/router';
import {checkToken} from "@/api/authenticationApi";
import {toast} from "react-hot-toast";

const NewUserPage = () => {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: ''});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const router = useRouter();

    const {token} = router.query;
    useEffect(() => {
        if (token)
            checkToken(token as string).then((data: { content: { token: string, status: boolean } }) => {
                setStatus(data?.content?.status)
            })
    }, [token]);

    const redirect = () => router.push('/');

    return (<div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
            <div className="space-y-8 p-4">

                {!status ? <div className="flex flex-col items-center justify-center flex-grow bg-white p-4">
                    <img src="/error.png" alt="Success" className="w-16 h-16 mb-4"/>
                    <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 text-center">Token inválido</h1>

                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={redirect}>
                        Ir a inicio
                    </button>

                </div> : (<div className="flex flex-col items-center justify-center flex-grow bg-white p-4">
                    <img src="/IconSuccess.png" alt="Success" className="w-16 h-16 mb-4"/>
                    <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 text-center">Usuario creado
                        correctamente</h1>
                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={redirect}>
                        Ir a inicio
                    </button>
                </div>)}
            </div>
        </div>
    </div>);
};

export default NewUserPage;