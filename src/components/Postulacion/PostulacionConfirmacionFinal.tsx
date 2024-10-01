
import React, { useState } from 'react';

import { useRouter } from 'next/router';

const PostulacionConfirmacionFinal: React.FC = () => {

    const router = useRouter();
    const redirect = () => {
        router.push('/lista-de-proyectos');
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <img src="/IconSuccess.png" alt="Success" className="w-16 h-16 " />
            <h1 className="text-4xl font-bold text-black mb-4 text-center">
            Propuesta enviada existosamente
            </h1>

            <div className="flex justify-center">
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => redirect()}>Ir a proyectos</button>
          </div>
        </div>
        </div>

    );
}

export default PostulacionConfirmacionFinal;