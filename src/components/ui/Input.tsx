import React from 'react';
import { IInputProps } from '@/types';

const Input: React.FC<IInputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon: Icon,
    required = false,
    error
}) => {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                {Icon && (
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                        <Icon />
                    </span>
                )}

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-gray-700 ${error
                        ? 'border-red-300 focus:ring-red-500 bg-red-50'
                        : 'border-gray-300 focus:ring-green-500'
                        }`}
                    required={required}
                />
            </div>

            {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;