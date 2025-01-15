import React from "react";

interface InputProps {
  label: string;
  type?: string;
  className?: string;
  name?: string;
  value?: string;
  placeholder?:string;
  posText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  className = "",
  name,
  value,
  posText,
  onChange,
  placeholder,
  disabled
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        className={`border p-2 w-full rounded-lg ${className}`}
        name={name}
        value={value}
        placeholder={placeholder || "Ingrese " + label}
        onChange={onChange}
        disabled={disabled}
      />
      {posText && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">{posText}</span>
      )}
    </div>
  );
};

export default Input;