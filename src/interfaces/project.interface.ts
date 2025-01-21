import { ICompany } from '@/interfaces/company.interface';

export interface IProject {
    id: string;
    brand: string;
    product: string;
    name: string;
    versions: {
      name: string;
      number: string;
    };
    guidelines: Record<string, any>;
    extra: Record<string, any>;
    budget: number | null;
    isFinancialInfoUnlocked: boolean;
    maxProducers: number;
    bidDeadline: string;
    status: string;
    step: number;
    agency?: ICompany;
    advertiser?:ICompany
    createdAt: string;
    updatedAt?: Date;
    unlockedForAgency?:boolean;
    creator: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      isVerified: boolean;
      isEnabled: boolean;
      jobPosition: string;
      nationalIdentifierOrRFC: string;
      gender: string;
      nationality: string | null;
      isMexicanResident: boolean;
      birthDate: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    creativeProposalWeight: number
  }