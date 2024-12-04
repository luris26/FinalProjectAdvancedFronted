import React from 'react';

interface NumberInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, value, onChange, placeholder, min, max, required }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default NumberInput;
