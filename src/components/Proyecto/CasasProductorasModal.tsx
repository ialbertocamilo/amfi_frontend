
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  casas:any[]
  onSave: ()=>void
}

const CasasProductorasModal: React.FC<ModalProps> = ({ isOpen, onClose,casas,onSave }) => {

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-30"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">Casas Productoras</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            &#x2715;
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-700 mb-4">
          Estás invitando a la licitación del proyecto a las siguientes Casas productoras:
        </p>

        <ul className="space-y-2 mb-6">
          {casas.map((casa, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-500">&#x2714;</span>
              <span>{casa}</span>
            </li>
          ))}
        </ul>
        {/* Footer */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-1/2 bg-white border border-red-500 text-red-500 py-2 rounded-md mr-2 hover:bg-red-100"
          >
            Regresar
          </button>
          <button
            onClick={onSave}
            className="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};



export default CasasProductorasModal;
