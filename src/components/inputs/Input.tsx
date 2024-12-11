import React from "react";

interface InputProps {
  label: string;
  type?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  className = "",
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        className={`border p-2 w-full rounded-lg ${className}`}
        name={name}
        value={value}
        placeholder={"Ingrese " + label}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;