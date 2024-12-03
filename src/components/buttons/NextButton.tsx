import React from 'react';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
      <button
        type="submit"
        className="w-1/4 bg-red-500 text-white py-2 rounded"
        onClick={onClick}
      >
        Siguiente
      </button>
  );
};

export default NextButton;