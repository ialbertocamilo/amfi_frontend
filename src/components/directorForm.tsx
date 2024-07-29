// components/DirectorForm.js

import React from 'react';
import "../pages/globals.css";



interface DirectorFormProps {
    formData: {
        name: string;
        nationality: string;
        residesInMexico: string;
        birthYear: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => void;
    index: number;
}

const DirectorForm = ({ formData, handleInputChange, index , handleSubmit}: DirectorFormProps) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Registro del Director</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor={`directorName${index}`}>Nombre del Director Representado</label>
                    <input
                        className="w-full px-3 py-2 border rounded"
                        type="text"
                        id={`directorName${index}`}
                        name={`directors[${index}].name`}
                        value={formData.name}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor={`nationality${index}`}>Nacionalidad</label>
                    <select
                        className="w-full px-3 py-2 border rounded"
                        id={`nationality${index}`}
                        name={`directors[${index}].nationality`}
                        value={formData.nationality}
                        onChange={(e) => handleInputChange(e, index)}
                    >
                        <option value="Mexicana">Mexicana</option>
                        <option value="Otra">Otra</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">¿Reside en México?</label>
                    <div className="flex items-center">
                        <input
                            className="mr-2"
                            type="radio"
                            id={`residesInMexicoSi${index}`}
                            name={`directors[${index}].residesInMexico`}
                            value="Si"
                            checked={formData.residesInMexico === 'Si'}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                        <label htmlFor={`residesInMexicoSi${index}`} className="mr-4">Si</label>
                        <input
                            className="mr-2"
                            type="radio"
                            id={`residesInMexicoNo${index}`}
                            name={`directors[${index}].residesInMexico`}
                            value="No"
                            checked={formData.residesInMexico === 'No'}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                        <label htmlFor={`residesInMexicoNo${index}`}>No</label>
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor={`birthYear${index}`}>Año de nacimiento del Director</label>
                    <input
                        className="w-full px-3 py-2 border rounded"
                        type="date"
                        id={`birthYear${index}`}
                        name={`directors[${index}].birthYear`}
                        value={formData.birthYear}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                </div>
                
                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded">Guardar</button>
            </form>
        </div>
    );
};

export default DirectorForm;
