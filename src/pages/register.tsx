import { useState, ChangeEvent, FormEvent } from 'react';
import "./globals.css";

interface FormData {
    companyName: string;
    legalName: string;
    email: string;
    jobTitle: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    isMenberANFI: boolean;
    anio: number;
    idCertificacion: string;
    rfc: string;
    nroSocio: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        legalName: '',
        email: '',
        jobTitle: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        idCertificacion: '',
        rfc: '',
        isMenberANFI: true,
        anio: 2024,
        nroSocio: '',
    });

    const [activeTab, setActiveTab] = useState<string>('agencia');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
       // console.log('formData', formData)
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center bg-gray-800">
                <img src="/camera-setup.png" alt="Camera setup" className="object-cover h-full" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
                    <div className="flex justify-between mb-4">
                        <button
                            className={`flex-1 text-center py-2 ${activeTab === 'agencia' ? 'border-b-2 border-red-500' : ''}`}
                            onClick={() => setActiveTab('agencia')}
                        >
                            Agencia o Anunciante
                        </button>
                        <button
                            className={`flex-1 text-center py-2 ${activeTab === 'productora' ? 'border-b-2 border-red-500' : ''}`}
                            onClick={() => setActiveTab('productora')}
                        >
                            Casa Productora
                        </button>
                    </div>

                    {activeTab === 'agencia' && (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-bold mb-4">Registro Agencia o Anunciante</h1>
                            {/* Resto de los campos de formulario para Agencia o Anunciante */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="companyName">Nombre comercial de la empresa</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="legalName">Razón Social</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="legalName" name="legalName" value={formData.legalName} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico corporativo</label>
                                <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="jobTitle">Cargo o Puesto</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                                <p className="text-xs text-gray-500 mt-1">Debe tener entre 6 y 10 caracteres. Debe contener al menos un número. Debe contener al menos un carácter especial.</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Repetir Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                <p className="text-xs text-gray-500 mt-1">Las contraseñas deben coincidir.</p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <input type="checkbox" id="termsAccepted" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" />
                                <label htmlFor="termsAccepted" className="text-gray-700">He leído y acepto los términos y condiciones.</label>
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Registrarme</button>
                        </form>
                    )}

                    {activeTab === 'productora' && (
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-bold mb-4">Registro Casa Productora</h1>
                            {/* Resto de los campos de formulario para Casa Productora */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="companyName">Nombre comercial de la empresa</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="legalName">Razón Social</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="legalName" name="legalName" value={formData.legalName} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="anio">Año de construcción de la empresa</label>
                                <input className="w-full px-3 py-2 border rounded" type="number" id="anio" name="anio" value={formData.anio} onChange={handleChange} />
                            </div>
                            <div className="mb-4 flex items-center">
                              <label className="mr-2" htmlFor="isMenberANFI">Soy socio</label>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="isMenberANFI"
                                  name="isMenberANFI"
                                  checked={formData.isMenberANFI || false}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div
                                  className="block bg-gray-300 w-14 h-8 rounded-full cursor-pointer"
                                  onClick={() => handleChange({ target: { name: 'isMenberANFI', type: 'checkbox', checked: !formData.isMenberANFI } })}
                                ></div>
                                <div
                                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                                    formData.isMenberANFI ? 'transform translate-x-full bg-green-500' : ''
                                  }`}
                                ></div>
                              </div>
                              <input
                                className="w-full px-3 py-2 border rounded"
                                type="text"
                                id="nroSocio"
                                name="nroSocio"
                                value={formData.nroSocio || ''}
                                onChange={handleChange}
                                placeholder="Nro Socio"
                              />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="idCertificacion">ID Certificación</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="idCertificacion" name="idCertificacion" value={formData.idCertificacion} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="rfc">RFC</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="rfc" name="rfc" value={formData.rfc} onChange={handleChange} />
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Registrarme</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
