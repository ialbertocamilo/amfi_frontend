import React from 'react';

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    className?: string;
    outlined?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({ onClick, label, className, outlined }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full px-2  ${className} rounded-md  transition duration-300 ease-in-out transform hover:scale-105 ${outlined ? 'bg-transparent border-2 border-red-500 text-red-500' : 'bg-red-500 text-white'}`}
        >
            {label}
        </button>
    );
};

export default SecondaryButton;