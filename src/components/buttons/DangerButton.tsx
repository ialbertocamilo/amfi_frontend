import React from 'react';

interface ButtonProps {
    onClick: (e) => void;
    label: string;
    className?: string;
    outlined?:boolean;
}

const DangerButton: React.FC<ButtonProps> = ({ onClick, label, className,outlined }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full px-2 text-sm sm:w-auto ${className} py-2 rounded-md mb-4 transition duration-300 ease-in-out transform hover:scale-105 ${outlined ? 'bg-transparent border-2 border-red-500 text-red-500' : 'bg-red-500 text-white' }`}
        >
            {label}
        </button>
    );
};

export default DangerButton