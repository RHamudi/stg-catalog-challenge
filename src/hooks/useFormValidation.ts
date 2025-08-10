import { useState, useCallback } from 'react';

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
}

interface FormField {
    value: string;
    error: string | null;
    touched: boolean;
}

interface ValidationRules {
    [key: string]: ValidationRule;
}

export const useFormValidation = <T extends Record<string, string>>(initialValues: T, rules: ValidationRules) => {
    const [fields, setFields] = useState<Record<string, FormField>>(() => {
        const initialFields: Record<string, FormField> = {};
        Object.keys(initialValues).forEach(key => {
            initialFields[key] = {
                value: initialValues[key],
                error: null,
                touched: false
            };
        });
        return initialFields;
    });

    const validateField = useCallback((name: string, value: string): string | null => {
        const rule = rules[name];
        if (!rule) return null;

        // Required validation
        if (rule.required && !value.trim()) {
            return 'Este campo é obrigatório';
        }

        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            return `Mínimo de ${rule.minLength} caracteres`;
        }

        // Max length validation
        if (rule.maxLength && value.length > rule.maxLength) {
            return `Máximo de ${rule.maxLength} caracteres`;
        }

        // Pattern validation
        if (rule.pattern && value && !rule.pattern.test(value)) {
            return 'Formato inválido';
        }

        // Custom validation
        if (rule.custom) {
            return rule.custom(value);
        }

        return null;
    }, [rules]);

    const setFieldValue = useCallback((name: string, value: string) => {
        setFields(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                value,
                error: validateField(name, value),
                touched: true
            }
        }));
    }, [validateField]);

    const validateForm = useCallback((): boolean => {
        let isValid = true;
        const newFields = { ...fields };

        Object.keys(fields).forEach(name => {
            const error = validateField(name, fields[name].value);
            newFields[name] = {
                ...newFields[name],
                error,
                touched: true
            };
            if (error) isValid = false;
        });

        setFields(newFields);
        return isValid;
    }, [fields, validateField]);

    const resetForm = useCallback(() => {
        const resetFields: Record<string, FormField> = {};
        Object.keys(initialValues).forEach(key => {
            resetFields[key] = {
                value: initialValues[key],
                error: null,
                touched: false
            };
        });
        setFields(resetFields);
    }, [initialValues]);

    const getFieldProps = useCallback((name: string) => ({
        value: fields[name]?.value || '',
        onChange: (value: string) => setFieldValue(name, value),
        error: fields[name]?.touched ? fields[name]?.error || undefined : undefined
    }), [fields, setFieldValue]);

    const getFormValues = useCallback(() => {
        const values: Record<string, string> = {};
        Object.keys(fields).forEach(key => {
            values[key] = fields[key].value;
        });
        return values;
    }, [fields]);

    const hasErrors = Object.values(fields).some(field => field.error !== null);
    const isFormTouched = Object.values(fields).some(field => field.touched);

    return {
        fields,
        setFieldValue,
        validateForm,
        resetForm,
        getFieldProps,
        getFormValues,
        hasErrors,
        isFormTouched
    };
};

// Validações pré-definidas comuns
export const validationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value: string) => {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Digite um email válido';
            }
            return null;
        }
    },
    password: {
        required: true,
        minLength: 6,
        custom: (value: string) => {
            if (value && value.length < 6) {
                return 'A senha deve ter pelo menos 6 caracteres';
            }
            return null;
        }
    },
    confirmPassword: (passwordValue: string) => ({
        required: true,
        custom: (value: string) => {
            if (value !== passwordValue) {
                return 'As senhas não coincidem';
            }
            return null;
        }
    })
};