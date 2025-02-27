import { toast } from "react-hot-toast";

export const validateField = (value: any, fieldName: string) => {
  if (!value || (typeof value === 'number' && value <= 0)) {
    toast.error(`El campo ${fieldName} es requerido`);
    return false;
  }
  return true;
};

export const createSectionValidator = (formData: any, section: string, fields: Record<string, string>) => {
  return () => {
    for (const [key, label] of Object.entries(fields)) {
      if (!validateField(formData[section][key], label)) {
        return false;
      }
    }
    return true;
  };
};

export const createFormValidator = (validators: (() => boolean)[]) => {
  return () => validators.every(validator => validator());
};
