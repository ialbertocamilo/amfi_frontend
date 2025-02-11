import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
    label?: string;
    step?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (formData: any,  validationRules: ValidationRules): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Validate each field in the rules
    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = formData[field];

      // Check required fields
      if (rules.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field] = rules.message || ''; 
          isValid = false;
          toast.error(rules.message || `El campo ${rules.label} es requerido`);
          return;
        }
      }

      // Check email pattern if exists
      if (rules.pattern && value) {
        if (!rules.pattern.test(value)) {
          newErrors[field] = rules.message || '';
          isValid = false;
          toast.error(`${rules.label}: ${rules.message}`);
          return;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field];
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validate,
    getFieldError,
    clearErrors
  };
};