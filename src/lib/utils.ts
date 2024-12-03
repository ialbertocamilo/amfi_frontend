import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { Budget, Evaluation } from "@/api/interface/api.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateFormData = (
  formData: Record<string, any>,
  inputNames: string[]
): boolean => {
  for (const name of inputNames) {
    if (!formData[name]) {
      console.warn(`Missing field: ${name}`);
      return false;
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
    0
  );

  score.experience += Object.values(evaluation.experience.company).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0
  );

  score.experience += Object.values(evaluation.experience.support).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0
  );

  score.experience += Object.values(evaluation.experience.director).reduce(
    (acc, value) => acc + (value ? experiencelWeight : 0),
    0
  );

  return {
    creativeProposal: Math.round(score.creativeProposal * 100),
    experience: Math.round(score.experience * 100),
  };
};

export const calculateBudgetScore = (
  budget: number,
  baselineBudget: number,
  creativeProposalPercentage: number
): { budget: number } => {
  let budgetScore = 0;
  const experiencePercentage = 0.2;

  const budgetPercentage =
    1 - creativeProposalPercentage - experiencePercentage;

  const budgetVariation = budget / baselineBudget - 1;
  console.log("budgetVariation", budgetVariation);
  if (budgetPercentage> budgetVariation && budgetVariation> 0) {
    budgetScore = budgetPercentage - budgetVariation;
  }

  return {
    budget: Math.round(budgetScore * 100),
  };
};

export const manageLogicError = (err: any) => {
  if (err?.status === 400)
    err?.response?.data?.message?.forEach((value: any) => toast.error(value));
  if (err?.status === 409) toast.error(err?.response?.data?.clientMessage);
};
