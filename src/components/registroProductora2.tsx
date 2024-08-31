import React from 'react';
import "../pages/globals.css";

interface registroEntity {
    formData: any,
    handleInputChange: any;
    handleSubmit: any
    prev: any | undefined;
    next: any | undefined;
}


const RegistroProductora2 = ({ formData, handleInputChange, handleSubmit, prev, next }: registroEntity) => {
    return (
        <div >
            <br />
            <form onSubmit={handleSubmit} >


                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico corporativo</label>
                    <input className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="jobTitle">Cargo o Puesto</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="legalName">Nombres</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="legalName">Apellidos</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="linkInstagram">Link de Instagram</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="linkInstagram" name="linkInstagram" value={formData.linkInstagram} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="linkFacebook">Link de Facebook</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="linkFacebook" name="linkFacebook" value={formData.linkFacebook} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="linkLinkedin">Link de Linkedin</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="linkLinkedin" name="linkLinkedin" value={formData.linkLinkedin} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="linkPaginaWeb">Link de Página web</label>
                    <input className="w-full px-3 py-2 border rounded" type="text" id="linkPaginaWeb" name="linkPaginaWeb" value={formData.linkPaginaWeb} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                    <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                    <p className="text-xs text-gray-500 mt-1">Debe tener entre 6 y 10 caracteres. Debe contener al menos un número. Debe contener al menos un carácter especial.</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Repetir Contraseña</label>
                    <input className="w-full px-3 py-2 border rounded" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                    <p className="text-xs text-gray-500 mt-1">Las contraseñas deben coincidir.</p>
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded" onClick={() => prev('1')}>Atras</button>
                    <button type="submit" className="w-full bg-red-500 text-white py-2 rounded" onClick={() => next('3')}>Siguiente</button>
                </div>
            </form>
        </div>
    );
};

export default RegistroProductora2;
