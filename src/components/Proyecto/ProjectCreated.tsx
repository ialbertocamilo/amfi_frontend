import { useRouter } from "next/router";
import { FaCheck, FaInfoCircle } from "react-icons/fa";

const CreatedProject = () => {
  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    await router.push("/lista-de-proyectos-admin");
  };

  return (
    <div className="space-y-8 p-4">
      <div className="mb-8 bg-white rounded m-4 p-6">
        <div className="rounded-lg p-8 text-center max-w w-full">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-white text-3xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Proyecto creado exitosamente
          </h2>
          <div className="bg-blue-100 text-blue-700 rounded-lg p-4 flex items-start mb-6 w-1/3 max-w-screen-sm mx-auto">
            <FaInfoCircle className="text-blue-700 text-lg mr-2 mt-1 w-6 h-6" />
            <p className="text-sm text-blue-700">
              Las casas productoras invitadas recibirán un correo para atender a
              la licitación
            </p>

          </div>
          <div className="bg-blue-100 text-blue-700 rounded-lg p-4 flex items-start mb-6 w-1/3 max-w-screen-sm mx-auto">
            <FaInfoCircle className="text-blue-700 text-lg mr-2 mt-1 w-6 h-6" />
            <p className="text-sm text-blue-700">
              El proyecto se ha cambiado a estado en proceso
            </p>
          </div>
          <button
            onClick={(e) => handleClick(e)}
            className="bg-red-500 text-white py-2 px-6 w-1/3 max-w-screen-sm rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Ir a Proyectos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedProject;