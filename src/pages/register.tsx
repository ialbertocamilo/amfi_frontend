"use client";

import createCompanyUser from "@/api/companyApi";
import { createTransaction } from "@/api/transactionApi";
import AddDirectorModal from "@/components/AddDirectorModal ";
import styles from "@/components/AddDirectorModal.module.css";
import DirectorsList from '@/components/directorList';
import ApiService from "@/lib/api";
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import toast from "react-hot-toast";
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import '../app/globals.css';
import RegistroProductora2 from '../components/registroProductora2';

export interface Director {
    id: string | null;
    name?: string;
    lastName?: string;
    nationality: string;
    birthYear?: string;
    directionYear: string;
    typeRepresentative?: number;
    residesInMexico?: boolean;
    startedExperienceYear?: number;
    nationalIdentifierOrRFC?: string;
    isAvailable?: boolean;
    createdAt?: string;
}

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
    linkFacebook: string;
    linkLinkedin: string;
    linkPaginaWeb: string;
    name: string;
    lastName: string;
    type: string
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
        linkFacebook: '',
        linkLinkedin: '',
        linkPaginaWeb: '',
        name: '',
        lastName: '',
        type: ''
    });


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [directors, setDirectors] = useState<Director[]>([]);


    const handleAddDirector = (director: Director) => {
        const updatedDirectors = [...directors, director];
        setDirectors(updatedDirectors)
    };


    const [activeTab, setActiveTab] = useState<string>('agencia');
    const [activeTabRegisterProductora, setActiveTabRegisterProductora] = useState<string>('1');


    const handleChange = (e: any) => {
        const {name, value, type, checked} = e.target;
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
    const router = useRouter();

    const [type, setType] = useState('')

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return false;
        }

        const requiredFields = [
            {name: 'Nombre comercial de la empresa', field: 'companyName', label: 'Nombre comercial de la empresa'},
            {name: 'Razón Social', field: 'legalName', label: 'Razón Social'},
            {name: 'Correo electrónico', field: 'email', label: 'Correo electrónico'},
            {name: 'Cargo o Puesto', field: 'jobTitle', label: 'Cargo o Puesto'},
            {name: 'Contraseña', field: 'password', label: 'Contraseña'},
            {name: 'Repetir Contraseña', field: 'confirmPassword', label: 'Repetir Contraseña'},
            {name: 'Nombres', field: 'name', label: 'Nombres'},
            {name: 'Apellidos', field: 'lastName', label: 'Apellidos'}
        ];

        for (const {name, field} of requiredFields) {
            if (!formData[field]) {
                toast.error(`El campo ${name} es obligatorio`);
                return false;
            }
        }
        if (!formData.termsAccepted) {
            toast.error('Debe aceptar los términos y condiciones');
            return false;
        }

        return true;
    };
    const goPlan = (transactionId: string) => router.push(`/planes?register=true&email=${formData.email}&transactionId=${transactionId}`)
    const registerAnuncerOrAgency = async (type: string, formData) => {

        const response = await createCompanyUser(type, formData)
        if (response) {
            toast.success('Registro exitoso, debe confirmar su cuenta, revise su bandeja de entrada.');
        }
    }
    const registerProductionStudio = async (directors, formData) => {
        try {
            const companyData = {
                comercialName: formData.companyName,
                legalName: formData.legalName,
                name: formData.name,
                lastname: formData.lastName,
                jobPosition: formData.jobTitle,
                email: formData.email,
                password: formData.password,
                nationalIdentifierOrRFC: formData.rfc,
                fundingYear: formData.anio ? Number(formData.anio) : null,
                certificationId: formData.idCertificacion,
                instagramUrl: formData.linkInstagram,
                facebookUrl: formData.linkFacebook,
                linkedinUrl: formData.linkLinkedin,
                webUrl: formData.linkPaginaWeb
            };

            const companyResult = await ApiService.post(`/company/production-studio`, companyData);
            const productionStudioId = companyResult?.data?.content?.company?.id;

            if (directors.length > 0 && productionStudioId) {
                const directorPromises = directors.map(value => {
                    const representation = value.typeRepresentative === 1 ? 'freelance' : value.typeRepresentative === 2 ? 'represented' : 'co-represented';
                    return ApiService.post(`/director/${productionStudioId}`, {
                        name: value.name,
                        lastname: value.lastName,
                        nationality: value.nationality,
                        birthDate: value.birthYear,
                        isMexicanResident: value.residesInMexico,
                        representation: representation,
                    });
                });
                await Promise.all(directorPromises);
            }

            toast.success('Registro exitoso, debe confirmar su cuenta, revise su bandeja de entrada.');
        } catch (error: any) {
            if (error.status === 400) {
                error.response?.data?.message.forEach((value: any) => toast.error(value));
            } else if (error.status === 409) {
                toast.error(error.response?.data?.clientMessage);
            }
        }
    };
    const validateFormProductora = () => {
        if (!formData.companyName) {
          toast.error('El nombre comercial de la empresa es obligatorio');
          return false;
        }
        if (!formData.legalName) {
          toast.error('La razón social es obligatoria');
          return false;
        }
        if (!formData.name) {
          toast.error('El nombre es obligatorio');
          return false;
        }
        if (!formData.lastName) {
          toast.error('El apellido es obligatorio');
          return false;
        }
        if (!formData.jobTitle) {
          toast.error('El cargo o puesto es obligatorio');
          return false;
        }
        if (!formData.email) {
          toast.error('El correo electrónico es obligatorio');
          return false;
        }
        if (!formData.password) {
          toast.error('La contraseña es obligatoria');
          return false;
        }
        if (formData.password.length < 6 || formData.password.length > 20) {
          toast.error('La contraseña debe tener entre 6 y 20 caracteres');
          return false;
        }
        if (!/\d/.test(formData.password)) {
          toast.error('La contraseña debe contener al menos un número');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Las contraseñas deben coincidir');
          return false;
        }
        if (!formData.termsAccepted) {
          toast.error('Debe aceptar los términos y condiciones');
          return false;
        }
        return true;
      };
    
    const registrar = async () => {

        try {
            if (activeTab == 'agencia') {
                if (!validateForm()) return;
                if (!type) {
                    toast.error('Debe seleccionar el tipo: Agencia o Anunciante')
                    return
                }
                await registerAnuncerOrAgency(type, formData)
            } else {
                if (!validateFormProductora()) return;
                if (!formData.termsAccepted) {
                    toast.error('Debe aceptar los términos y condiciones');
                    return false;
                }
                await registerProductionStudio(directors, formData)
            }
            const transactionResponse = await createTransaction({email: formData.email})
            if (transactionResponse)
                goPlan(transactionResponse.id)
        } catch (error: any) {
            console.error("Unexpected error:", error);
            toast.error('Ocurrió un error inesperado');
        }

    }

    return (
        <div className="flex h-screen">
            <div className="flex-1 h-screen">
                <img src="/camera-setup.png" alt="Camera setup" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 h-screen overflow-y-auto flex justify-center">
                <div className="h-max w-screen max-w-md bg-white p-8 shadow-md rounded">
                    <h1 className="text-3xl text-black font-bold text-center">Registro</h1>
                    <div className="flex justify-between mb-4">
                        <button
                            className={`flex-1 text-center py-2 text-black ${activeTab === 'agencia' ? 'border-b-2 border-red-500' : ''}`}
                            onClick={() => setActiveTab('agencia')}
                        >
                            Agencia o Anunciante
                        </button>
                        <button
                            className={`flex-1 text-center py-2 text-black ${activeTab === 'productora' ? 'border-b-2 border-red-500' : ''}`}
                            onClick={() => setActiveTab('productora')}
                        >
                            Productora
                        </button>
                    </div>

                    {activeTab === 'agencia' && (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Tipo</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="agency">Agencia</option>
                                    <option value="advertiser">Anunciante</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="companyName">Nombre comercial de la
                                    empresa</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="companyName"
                                       name="companyName" value={formData.companyName} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="legalName">Razón Social</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="legalName"
                                       name="legalName" value={formData.legalName} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="name">Nombres</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="name" name="name"
                                       value={formData.name} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="lastName">Apellidos</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="lastName"
                                       name="lastName" value={formData.lastName} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="jobTitle">Cargo o Puesto</label>
                                <input className="w-full px-3 py-2 border rounded" type="text" id="jobTitle"
                                       name="jobTitle" value={formData.jobTitle} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico
                                    corporativo</label>
                                <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email"
                                       value={formData.email} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="password"
                                       name="password" value={formData.password} onChange={handleChange}/>
                                <p className="text-xs text-gray-500 mt-1">Debe tener entre 6 y 10 caracteres. Debe
                                    contener al menos un número. Debe contener al menos un carácter especial.</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Repetir
                                    Contraseña</label>
                                <input className="w-full px-3 py-2 border rounded" type="password" id="confirmPassword"
                                       name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                                <p className="text-xs text-gray-500 mt-1">Las contraseñas deben coincidir.</p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <input type="checkbox" id="termsAccepted" name="termsAccepted"
                                       checked={formData.termsAccepted} onChange={handleChange} className="mr-2"/>
                                <label htmlFor="termsAccepted" className="text-gray-700">He leído y acepto los términos
                                    y condiciones.</label>
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded mb-4"
                                    onClick={() => registrar()}>Registrarme
                            </button>
                            <button type="button" className="w-full text-red-500 py-2 rounded"
                                    onClick={() => router.push('/login')}>Ir a Login
                            </button>
                        </form>
                    )}

                    {activeTab === 'productora' && (
                        <div>
                            <div className="tabs flex justify-center space-x-4 mb-4">
                                <button onClick={() => setActiveTabRegisterProductora('1')}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {Number(activeTabRegisterProductora) >= 1 ? <FaCheck/> : '1'}
                                </button>
                                <button onClick={() => setActiveTabRegisterProductora('2')}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {Number(activeTabRegisterProductora) >= 2 ? <FaCheck/> : '2'}
                                </button>
                                <button onClick={() => setActiveTabRegisterProductora('3')}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTabRegisterProductora) >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {Number(activeTabRegisterProductora) >= 3 ? <FaCheck/> : '3'}
                                </button>
                            </div>

                            {activeTabRegisterProductora === '1' && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="companyName">Nombre
                                            comercial de la empresa</label>
                                        <input className="w-full px-3 py-2 border rounded" type="text" id="companyName"
                                               name="companyName" value={formData.companyName} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="rfc">RFC</label>
                                        <input className="w-full px-3 py-2 border rounded" type="text" id="rfc"
                                               name="rfc" value={formData.rfc} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="legalName">Razón
                                            Social</label>
                                        <input className="w-full px-3 py-2 border rounded" type="text" id="legalName"
                                               name="legalName" value={formData.legalName} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="anio">Año de construcción
                                            de la empresa</label>
                                        <input className="w-full px-3 py-2 border rounded" type="number" id="anio"
                                               name="anio" value={formData.anio} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="nroSocio">No. Socio</label>
                                        <input className="w-full px-3 py-2 border rounded" type="text" id="nroSocio"
                                               name="nroSocio" value={formData.nroSocio} onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="idCertificacion">ID
                                            Certificación</label>
                                        <input className="w-full px-3 py-2 border rounded" type="text"
                                               id="idCertificacion" name="idCertificacion"
                                               value={formData.idCertificacion} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded"
                                            onClick={() => setActiveTabRegisterProductora('2')}>Siguiente
                                    </button>
                                </form>
                            )}

                            {activeTabRegisterProductora === '2' && (
                                <RegistroProductora2 formData={formData} handleInputChange={handleChange}
                                                     handleSubmit={handleSubmit} prev={changeTab} next={changeTab}/>
                            )}

                            {activeTabRegisterProductora === '3' && (
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <br/>
                                        <div className="flex justify-between">
                                            {directors.length > 0 ? (
                                                <DirectorsList directorsIni={directors}/>
                                            ) : (
                                                <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                                                    <FaExclamationCircle className="mr-2" style={{color: '#4B9AA5'}}/>
                                                    Puedes agregar más directores posteriormente.
                                                </div>
                                            )}
                                        </div>
                                        <br/>
                                        <div className="flex justify-end">
                                            <button onClick={() => setIsModalOpen(true)}>+ Agregar Director</button>
                                            <AddDirectorModal
                                                director={null}
                                                isOpen={isModalOpen}
                                                onClose={() => setIsModalOpen(false)}
                                                onAdd={handleAddDirector}
                                                onUpdate={null}
                                            />
                                        </div>
                                        <br/>
                                        <div className="mb-4 flex items-center">
                                            <input type="checkbox" id="termsAccepted" name="termsAccepted"
                                                   checked={formData.termsAccepted} onChange={handleChange}
                                                   className="mr-2"/>
                                            <label htmlFor="termsAccepted" className="text-gray-700">He leído y acepto
                                                los términos y condiciones.</label>
                                        </div>
                                        <br/>
                                        <div className="flex space-x-4">
                                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded"
                                                    onClick={() => setActiveTabRegisterProductora('2')}>Atras
                                            </button>
                                            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded"
                                                    onClick={() => registrar()}>Registrar
                                            </button>
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
