import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
    label?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (initialData: any, validationRules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (formData: any): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;
    let firstErrorField = '';

    Object.keys(validationRules).forEach((field) => {
      const value = formData[field];
      const rules = validationRules[field];

      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = rules.message || 'Este campo es requerido';
        isValid = false;
        if (!firstErrorField) firstErrorField = field;
        toast.error(`${rules.message || `El campo ${rules.label || field} es requerido`}`);
      } else if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Formato inválido';
        isValid = false;
        if (!firstErrorField) firstErrorField = field;
        toast.error(`El campo ${rules.label || field}: ${rules.message || 'Formato inválido'}`);
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const validateStep = (formData: any, step: string): boolean => {
    const stepFields = Object.keys(validationRules).filter(field => 
      (validationRules[field] as any).step === step
    );

    const stepValidationRules = stepFields.reduce((acc, field) => {
      acc[field] = validationRules[field];
      return acc;
    }, {} as ValidationRules);

    return validateForm(formData);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field];
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateForm,
    validateStep,
    getFieldError,
    clearErrors
  };
};