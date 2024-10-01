import React, { useState } from 'react';
import ConfirmacionParticipacion from './ConfirmacionParticipacion';
import ResumenProyecto from './ResumenProyecto';
import { useRouter } from 'next/router';

const ProjectInfo: React.FC = () => {

  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [postulacion, setPostulacion] = useState(false);


  const handleConfirm = () => {
    // Lógica para confirmar la acción
    console.log('Acción confirmada');
    setIsModalOpen(false);
    setPostulacion(true);
  };

  const handleCancel = () => {
    // Lógica para cancelar la acción
    console.log('Acción cancelada');
    setIsModalOpen(false);
  };

  const iniciarPostulacion = () => {
    console.log('Iniciar postulación');
    router.push('/postulacion-proceso');
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Proyecto León</h1>
          <p>Creador: <strong>Luna Rengifo</strong></p>
          <p>Agencia: New Scottsberg</p>
          <p>Estado: <strong>En Proceso</strong></p>
        </div>
        <div className="text-right">
          <p>Creado: 08 de junio 2026</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-sm">
              <span className="text-yellow-500 font-bold">⭐ Créditos disponibles: 16</span>
            </div>
            <button className="bg-white text-red-500 border border-red-500 py-2 px-4 rounded">
              Comprar
            </button>
          </div>
        </div>
      </div>

      {/* Información de proyecto */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Información de proyecto</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Anunciante:</strong> Luna Rengifo</p>
            <p><strong>Marca:</strong> New Scottsberg</p>
            <p><strong>Producto:</strong> New Scottsberg</p>
            <p><strong>Categoría:</strong> Lorem Ipsum</p>
            <p><strong>Campaña:</strong> Dolor Sit Amet</p>
          </div>
          <div>
            <p><strong>Cantidad:</strong> 30</p>
            <p><strong>Duración:</strong> 102 seg</p>
            <p><strong>Aspecto:</strong> Dato de lista</p>
            <p><strong>Formato:</strong> Dato de lista</p>
          </div>
          <div>
            <p><strong>Brief:</strong> 12/12/25</p>
            <p><strong>Visualización:</strong> 01/12/25</p>
          </div>
          <div>
            <p><strong>Entrega de presupuestos y TT:</strong> 23/12/25</p>
            <p><strong>Entrega proyecto:</strong> 12/07/25</p>
          </div>
        </div>
      </div>

      {/* Documentos de proyecto */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Documentos de proyecto</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg bg-gray-100">
            <p className="text-sm">Document1.pdf</p>
            <button className="text-red-500">Descargar</button>
          </div>
          <div className="border p-4 rounded-lg bg-gray-100">
            <p className="text-sm">Document2.pdf</p>
            <button className="text-red-500">Descargar</button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Link</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
          <p>Link 4</p>
        </div>
      </div>

      {/* Casas productoras Licitantes */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Casas productoras Licitantes</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> Grupo Traziente</p>
            <p>Director licitante: Ali Aaker</p>
          </div>
          <div>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> Dr. Communication</p>
            <p>Director licitante: Panos Cosmatos</p>
          </div>
          <div>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> Kuatrix</p>
            <p>Director licitante: Julia Docournea</p>
          </div>
          <div>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> Dr. Communication</p>
            <p>Director licitante: Shane Carruth</p>
          </div>
          <div>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> Filmmaking</p>
            <p>Director licitante: Debra Granik</p>
          </div>
        </div>
      </div>


      {postulacion && (
        <><ResumenProyecto /><button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => iniciarPostulacion()}>Iniciar postulacion</button></>
      )}


      {/* Botones de acción */}
      {!postulacion && (
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <button className="bg-white text-red-500 border border-red-500 py-2 px-4 rounded">No participar</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>Participar</button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ConfirmacionParticipacion onConfirm={handleConfirm} onCancel={handleCancel} />
      )}


    </div>
  );
};

export default ProjectInfo;
