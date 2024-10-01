import React from 'react';

interface ConfirmacionParticipacionProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmacionParticipacion: React.FC<ConfirmacionParticipacionProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center">
          <div className="text-blue-500 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m0-4h.01M12 22a10 10 0 110-20 10 10 0 010 20z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Confirmar participación</h2>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
              No, volver
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sí, continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionParticipacion;
