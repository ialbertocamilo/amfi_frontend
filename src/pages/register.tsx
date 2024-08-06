import { useState, ChangeEvent, FormEvent } from 'react';
import "./globals.css";
import RegistroProductora2 from '../components/registroProductora2';
import DirectorForm from '../components/directorForm';
import { FaCheck } from 'react-icons/fa';
import { AnyNode } from 'postcss';
import AddDirectorModal from '@/components/AddDirectorModal ';
import DirectorsList from '@/components/directorList';
import { Director } from '@/entities/Director';

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
    linkInstagram: string;
    linkLinkedin: string;
    linkPaginaWeb: string;
    name: string;
    lastName: string;
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
        linkInstagram: '',
        linkLinkedin: '',
        linkPaginaWeb: '',
        name: '',
        lastName: ''
    });




    const [isModalOpen, setIsModalOpen] = useState(false);
    const [directors, setDirectors] = useState<Director[]>([]);
    
    let directorsTmp:Director[] = [
        {
            id: 1, name: 'Alfonso Portillo',
            nationality: 'Mexicana',
            residesInMexico: true,
            birthYear: '2025'
        },
        {
            id: 2, name: 'Camilo Vizcarra',
            nationality: 'Mexicana',
            residesInMexico: true,
            birthYear: '2024'
        },
        {
            id: 3, name: 'Sebastian Rodas',
            nationality: 'Mexicana',
            residesInMexico: false,
            birthYear: ''
        }
    ];
    // setDirectors(directorsTmp)

    const handleAddDirector = (director: Director) => {
          const updatedDirectors = [...directors, director];          
          setDirectors(updatedDirectors)

      };


    const [activeTab, setActiveTab] = useState<string>('agencia');
    const [activeTabRegisterProductora, setActiveTabRegisterProductora] = useState<string>('1');


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

    const changeTab = (tab: string) => {
        setActiveTabRegisterProductora(tab);
    }



    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex items-center justify-center bg-gray-800">
                <img src="/camera-setup.png" alt="Camera setup" className="w-full max-h-screen object-cover" />
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
                                <label className="block text-gray-700 mb-2" htmlFor="legalName">Nombres</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="legalName">Apellidos</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
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
                        <div>
                            <div className="tabs flex justify-center space-x-4">
                                <button
                                    onClick={() => setActiveTabRegisterProductora('1')}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {Number(activeTabRegisterProductora) >= 1 ? <FaCheck /> : '1'}
                                </button>
                                <button
                                    onClick={() => setActiveTabRegisterProductora('2')}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {Number(activeTabRegisterProductora) >= 2 ? <FaCheck /> : '2'}
                                </button>

                                <button
                                    onClick={() => setActiveTabRegisterProductora('3')}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {Number(activeTabRegisterProductora) >= 3 ? <FaCheck /> : '3'}
                                </button>
                            </div>

                            {activeTabRegisterProductora === '1' && (
                                <form onSubmit={handleSubmit}>
                                    <br />
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
                                                onClick={() =>
                                                    handleChange({
                                                        target: {
                                                            name: 'isMenberANFI',
                                                            type: 'checkbox',
                                                            checked: !formData.isMenberANFI
                                                        }
                                                    })
                                                }
                                            ></div>
                                            <div
                                                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${formData.isMenberANFI ? 'transform translate-x-full bg-green-500' : ''
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

                                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded" onClick={() => setActiveTabRegisterProductora('2')}>Siguiente</button>

                                </form>
                            )}

                            {activeTabRegisterProductora === '2' && (
                                <RegistroProductora2 formData={formData} handleInputChange={handleChange} handleSubmit={handleSubmit} prev={changeTab} next={changeTab} />
                            )}

                            {activeTabRegisterProductora === '3' && (
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        {/* {directors.map((director, index) => (
                                            <DirectorForm
                                                key={index}
                                                index={index}
                                                formData={director}
                                                handleInputChange={handleInputChange}
                                            />
                                        ))} */}
                                        <br />
                                        <div className="flex justify-between">
                                            <h1>Directores</h1>
                                            <DirectorsList directorsIni={directors} />
                                        </div>
                                        <br />
                                        <div>
                                            <button onClick={() => setIsModalOpen(true)}>Agregar Director</button>
                                            <AddDirectorModal
                                                director={null}
                                                isOpen={isModalOpen}
                                                onClose={() => setIsModalOpen(false)}
                                                onAdd={handleAddDirector}
                                                onUpdate={null}
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <label>
                                                <input type="checkbox" name="terms" required /> He leído y acepto los términos y condiciones.
                                            </label>
                                        </div>
                                        <br />
                                        <div className="flex space-x-4">
                                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded" onClick={() => setActiveTabRegisterProductora('2')}>Atras</button>
                                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Registrar</button>
                                        </div>

                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
