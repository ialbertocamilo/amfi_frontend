import { getDirector } from "@/api/directorApi";
import Layout from "@/components/Layout";
import { IDirector } from "@/interfaces/director.interface";
import { ProjectMapper } from "@/mappers/project.mapper";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const VerDirector = () => {
    const [director, setDirector] = useState<IDirector>();
    const {id} = useRouter().query;
    useEffect(() => {
        if (id)
        getDirector(id as string).then(fetchedDirectores => setDirector(fetchedDirectores));
    }, [id]);

    return (
        <Layout>
<div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 ">Director</h1>
    <div className="grid md:grid-cols-1 gap-6">
        {director && (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{director.name} {director.lastname}</h2>
                <p className="text-gray-600"><strong>Código Único:</strong> {director.uniqueCode}</p>
                <p className="text-gray-600"><strong>Nacionalidad:</strong> {director.nationality}</p>
                <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {new Date(director.birthDate).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Residente Mexicano:</strong> {director.isMexicanResident ? 'Sí' : 'No'}</p>
                <p className="text-gray-600"><strong>Año de Inicio de Experiencia:</strong> {director.startedExperienceYear}</p>
                <p className="text-gray-600"><strong>Disponible:</strong> {director.isAvailable ? 'Sí' : 'No'}</p>
                <p className="text-gray-600"><strong>Representación:</strong> {ProjectMapper.mapRepresentationType(director.representation)}</p>
            </div>
        )}
    </div>
</div>
        </Layout>
    );
};

export default VerDirector;