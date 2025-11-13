import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  className = '',
  icon,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 outline-none focus:ring-2',
            icon && 'pl-10',
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
