import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CasaProductora {
  nombre: string;
  seleccionada: boolean;
  directores: string[];
  detallesVisible: boolean;
}
interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;

}

const ProyectoSteep5 = ({
  formData,
  handleChange,
  handleSubmit,
  activeTab,
  setactiveTab,

}: registroEntity) => {
  const [casasProductoras, setCasasProductoras] = useState<CasaProductora[]>([
    { nombre: 'Grupo Traziende', seleccionada: false, directores: ['Ari Aster', 'Barry Jenkins'], detallesVisible: false },
    { nombre: 'Ikarus', seleccionada: false, directores: [], detallesVisible: false },
    { nombre: 'Filmmaking', seleccionada: false, directores: [], detallesVisible: false },
    { nombre: 'Dr. Comunication', seleccionada: true, directores: [], detallesVisible: false },
    { nombre: 'Grupo de León', seleccionada: false, directores: [], detallesVisible: false },
  ]);

  const [buscar, setBuscar] = useState('');
  const [revisarPropuesta, setRevisarPropuesta] = useState(false);

  const toggleSeleccion = (index: number) => {
    const updatedCasas = [...casasProductoras];
    updatedCasas[index].seleccionada = !updatedCasas[index].seleccionada;
    setCasasProductoras(updatedCasas);
  };

  const toggleDetalles = (index: number) => {
    const updatedCasas = [...casasProductoras];
    updatedCasas[index].detallesVisible = !updatedCasas[index].detallesVisible;
    setCasasProductoras(updatedCasas);
  };

  return (

    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
      <div className="text-sm text-gray-500 mb-8">
        <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
      </div>

      <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
        <div className="space-y-8 p-4">
          {/* Navegación de pestañas */}
          <div className="tabs flex justify-center space-x-10 mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setactiveTab(step.toString())}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= step
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
                  }`}
              >
                {Number(activeTab) >= step ? <FaCheck /> : step}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4">Invitar Casas Productoras</h2>

          {/* Buscar productora */}
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Buscar productora"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>

          {/* Lista de casas productoras */}
          <div className="space-y-4">
            {casasProductoras
              .filter((casa) => casa.nombre.toLowerCase().includes(buscar.toLowerCase()))
              .map((casa, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={casa.seleccionada}
                        onChange={() => toggleSeleccion(index)}
                        className="form-checkbox h-5 w-5 text-red-500"
                      />
                      <span className="text-lg font-medium">{casa.nombre}</span>
                    </div>
                    <button
                      className="text-red-500 font-semibold"
                      onClick={() => toggleDetalles(index)}
                    >
                      {casa.detallesVisible ? 'Ocultar detalle' : 'Ver detalle'}
                    </button>
                  </div>
                  {casa.detallesVisible && (
                    <div className="mt-4 space-y-2">
                      {casa.directores.length > 0 ? (
                        casa.directores.map((director, i) => (
                          <div key={i} className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-red-500 mr-2"
                            />
                            <span>{director}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">Sin directores disponibles</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Mensaje informativo */}
          <div className="mt-6 p-4 text-black-700 rounded-lg" style={{ backgroundColor: '#DFF9FF' }}>
            Te recomendamos que solo invites a 5 Casas Productoras como máximo.
          </div>

          {/* Revisar propuesta creativa */}
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-medium">Revisión de propuesta creativa</span>
            <input
              type="checkbox"
              checked={revisarPropuesta}
              onChange={() => setRevisarPropuesta(!revisarPropuesta)}
              className="form-checkbox h-5 w-5 text-red-500"
            />
          </div>
          <p className="text-sm text-gray-500">
            De activar esta opción la evaluación de propuesta creativa será incluida en este proyecto.
          </p>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded" onClick={() => handleSubmit('5')}>
              Atras
            </button>
            <button className="w-1/4 bg-red-500 text-white py-2 rounded" onClick={() => handleSubmit('6')}>
              Crear proyecto
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProyectoSteep5;
