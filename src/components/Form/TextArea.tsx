// src/components/Form/TextArea.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  name,
  rows = 4
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
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        {...register(name, { 
          required: required ? `${label} is required` : false 
        })}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-vertical
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