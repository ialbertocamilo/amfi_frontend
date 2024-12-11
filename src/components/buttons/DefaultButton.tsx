import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    className?: string;
    outlined?: boolean;
    disabled?: boolean;
}

const DefaultButton: React.FC<ButtonProps> = ({ onClick, label, className, outlined, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-1/4 px-2 py-2 rounded-md transition duration-200 ease-in-out transform ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:scale-105'} ${outlined ? 'bg-transparent border border-blue-300 text-blue-400' : 'bg-blue-500 text-white'} ${className}`}
        >
            {label}
        </button>
    );
};

export default DefaultButton;