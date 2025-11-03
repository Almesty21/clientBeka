// src/components/Form/Input.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  name
}) => {
  const { register, formState: { errors } } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, { 
          required: required ? `${label} is required` : false 
        })}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder-gray-400 text-gray-900
          ${error 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 bg-white hover:border-gray-400'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <span>•</span>
          {error}
        </p>
      )}
    </div>
  );
};