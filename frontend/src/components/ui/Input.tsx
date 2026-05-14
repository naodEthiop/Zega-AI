import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600',
          'transition-colors duration-200',
          error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
