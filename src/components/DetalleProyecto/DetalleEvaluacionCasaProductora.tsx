import React, { useState } from 'react';
import Evaluacion from './Evaluacion';
import Comparacion from './Comparacion';





const DetalleEvaluacionCasaProductora: React.FC = () => {

  const [showEvaluacion, setShowEvaluacion] = useState(true);

  return (

    <div className="w-full p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">

        <header className="mb-6">
          <h2 className="text-2xl font-bold">Proyecto: Grupo Triaxende</h2>
          <p>Creado: 08 de junio 2024</p>
          <p>Agencia: New Southburg</p>
        </header>
      </div>
      <div>

        {/* Conditional Rendering */}
        {showEvaluacion ? (
          <Evaluacion setShowEvaluacion={setShowEvaluacion} />
        ) : (
          <Comparacion setShowEvaluacion={setShowEvaluacion} />
        )}
      </div>

    </div>
  );
};

export default DetalleEvaluacionCasaProductora;