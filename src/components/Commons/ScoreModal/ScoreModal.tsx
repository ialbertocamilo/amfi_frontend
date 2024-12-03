import React, { useState } from "react";

interface ScoreModalProps {
  children: React.ReactNode;
  score: number;
}

function ScoreModal({ children, score }: ScoreModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute right-3/4 top-3/4 flex items-center justify-center bg-black bg-opacity-0 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex justify-end items-center">
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            <div className="flex items-center justify-between text-xl font-bold">
              <h2 className="whitespace-nowrap text-gray-700 mr-16">
                Puntaje final de sección
              </h2>
              <span className="text-gray-800">{score}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={changeView}
          className="text-sm text-red-500 hover:underline focus:outline-none"
        >
          {children}
        </button>
      </div>
    </div>
  );
}

export default ScoreModal;
