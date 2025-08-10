import React from 'react';
import { IButtonProps } from '@/types';

const Button: React.FC<IButtonProps> = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    onClick,
    className = ''
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 active:bg-green-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 active:bg-red-700'
    };

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg'
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';
    const loadingStyles = 'cursor-wait';

    const combinedClassName = `
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${(disabled || loading) ? disabledStyles : ''}
        ${loading ? loadingStyles : ''}
        ${className}
    `.trim();

    return (
        <button
            type={type}
            className={combinedClassName}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    {typeof children === 'string' ? 'Carregando...' : children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;