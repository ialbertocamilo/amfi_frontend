import { Evaluation } from "@/api/interface/api.interface";
import { ProjectStatus } from "@/mappers/project.mapper";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateInputs = (formData: Record<string, any>, requiredFields: string[], fieldLabels: Record<string, string>): string | null => {
  for (const field of requiredFields) {
    if (!formData[field]) {
      const label = fieldLabels[field] || field;
      return `Debes llenar ${label}`;
    }
  }
  return null;
};

export const validateFormData = (
  obj: Record<string, any>,
  excludeFields: string[] = [],
): boolean => {
  for (const [key, value] of Object.entries(obj)) {
    if (value === "" && !excludeFields.includes(key)) {
      console.warn(`Field ${key} is empty`);
      return false;
    }
  }
  return true;
};

export const validateFormData2 = (formData: Record<string, any>): boolean => {
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      console.warn("Field is empty ", key);
      const value = formData[key];
      if (typeof value === "object" && value !== null) {
        if (!validateFormData(value)) {
          return false;
        }
      } else if (!value) {
        return false;
      }
    }
  }
  return true;
};

export const formatToLocalTime = (isoDate: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const utcOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - utcOffset);
  return localDate.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getObjectLength = (obj: Record<string, any>): number => {
  return obj ? Object.keys(obj).length : 0;
};

export const calculateEvaluationScore = (
  evaluation: Evaluation,
  creativeProposalPercentage: number /*entre 0.3 - 0.5*/,
): {
  creativeProposal: number;
  experience: number;
} => {
  const experiencePercentage = 0.2;

  const experienceQuestionsNumber =
    getObjectLength(evaluation.experience.company) +
    getObjectLength(evaluation.experience.support) +
    getObjectLength(evaluation.experience.director);

  const creativeProposalWeight =
    creativeProposalPercentage /
    (getObjectLength(evaluation.creativeProposal) * 5);
  const experiencelWeight = experiencePercentage / experienceQuestionsNumber;

  let score = {
    creativeProposal: 0,
    experience: 0,
  };

  score.creativeProposal = Object.values(evaluation.creativeProposal).reduce(
    (acc, value) => acc + value * creativeProposalWeight,
    0,
  );

  score.experience += Object.values(evaluation.experience.company).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0,
  );

  score.experience += Object.values(evaluation.experience.support).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0,
  );

  score.experience += Object.values(evaluation.experience.director).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0,
  );

  return {
    creativeProposal: Math.round(score.creativeProposal * 100),
    experience: Math.round(score.experience * 100),
  };
};

export const calculateBudgetScore = (
  budget: number,
  baselineBudget: number | null,
  creativeProposalPercentage: number,
): { budget: number } => {
  if (!baselineBudget) {
    return {
      budget: 0,
    };
  }

  let firstCalc = budget / baselineBudget - 1;
  const creativeProposalPercentageNormalized = creativeProposalPercentage * 100;
  let secondCalc = creativeProposalPercentageNormalized * firstCalc;
  const resultScore = (prevCalc: number, unitaryValue: number) => {
    if (prevCalc === -unitaryValue) {
      return 0;
    } else if (prevCalc < 0) {
      return unitaryValue;
    } else if (prevCalc > 0) {
      return unitaryValue - prevCalc;
    } else if (prevCalc === 0) {
      return unitaryValue;
    }
    return 0;
  };

  const budgetScore = resultScore(
    secondCalc,
    creativeProposalPercentageNormalized,
  );
  return {
    budget: Math.round(budgetScore),
  };
};

export const manageLogicError = (err: any, redirectUrl?: string) => {
  if (err?.status === 400)
    err?.response?.data?.message?.forEach((value: any) => toast.error(value));
  if (err?.status === 409)
    toast.error(err?.response?.data?.clientMessage);
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

export const formatUtcToLocalDate = (isoDate: string): string => {
  // Funcion usada para recibir del backend
  moment.locale("es");
  if (!moment(isoDate, moment.ISO_8601, true).isValid()) {
    console.warn(`Invalid ISO date: ${isoDate}`);
    return "-";
  }

  return moment.utc(isoDate).local().format("DD/MM/YYYY HH:mm");
};

export const formatToUtcBackend = (isoDate: string): Date => {
  // Funcion usada para enviar al backend
  moment.locale("es");
  return new Date(moment(isoDate).format("YYYY-MM-DDTHH:mm:ss"));
};

export const formatToCurrency = (value?: number) => {
  if (value === undefined || value === null) {
    return "-";
  }
  return new Intl.NumberFormat("es-MX", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatToMxn = (value?: number) => {
  if (value === undefined || value === null) {
    return "-";
  }
  return (
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(value) + " MXN"
  );
};

export const validateInputs2 = (
  formData: any,
  inputNames: string[],
  fieldLabels,
) => {

  for (const name of inputNames) {
    if (!formData[name]) {
      return `Por favor, complete el campo: ${fieldLabels[name]}`;
    }
  }
  return null;
};

export const checkProjectReadonly = (status: ProjectStatus): boolean => {
  return (
    status === ProjectStatus.Closed ||
    status === ProjectStatus.InProgress ||
    status === ProjectStatus.Finished
  );
};

export const fixYesNo = (value: string) => {
  switch (value?.toLowerCase()) {
    case "si":
      return "Sí";
    case "no":
      return "No";
    default:
      return "";
  }
};
