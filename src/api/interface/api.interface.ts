import { IProjectInvitation } from "@/interfaces/project-director.interface";

export interface InvitedDirectorsResponse {
    message: string;
    result: IProjectInvitation[];
}

export interface ProjectInvitation {
    id: string;
    brand: string;
    product: string;
    name: string;
    versions: string | null;
    guidelines: string | null;
    extra: ProjectExtra;
    budget: number | null;
    isFinancialInfoUnlocked: boolean;
    maxProducers: number;
    bidDeadline: string | null;
    status: string;
    step: number;
    createdAt: string;
}

interface ProjectExtra {
    brand: string;
    product: string;
    category: string;
    projectName: string;
    versionName: string;
    quantity: string;
    agencyName: string;
    agencyEmail: string;
    agencyCreativeDirector: string;
    contactoFinanzas: string;
    agencyAccountDirector: string;
    productorAgencia: string;
    odtNumber: string;
    buyerContact: string;
}

interface Director {
    id: string;
    uniqueCode: string;
    name: string;
    lastname: string;
    nationality: string;
    birthDate: string;
    isMexicanResident: boolean;
    startedExperienceYear: number;
    nationalIdentifierOrRFC: string;
    isAvailable: boolean;
    createdAt: string;
}

export interface ProductionHouse {
    id: string;
    slug: string;
    name: string;
    legalName: string;
    nationalIdentifierOrRFC: string;
    foundingYear: number;
    additionalInfo: string | null;
    type: string;
    instagram_url: string;
    facebook_url: string;
    linkedin_url: string;
    web_url: string;
    amfiId: string;
    certificationId: string;
    createdAt: string;
    updatedAt: string;
    maxUsers: number;
}


export interface CreativeProposal {
    uniquenessLevel: number;
    productionQuality: number;
    originality: number;
    messageClarity: number;
    relevance: number;
    structureType: number;
    creativity: number;
    visualImpact: number;
    innovation: number;
    technicalExecution: number;
  }

export interface Evaluation {
    // Creative Proposal (Scale 1-5)
    creativeProposal: CreativeProposal;
    experience: {
      company: {
        hasPreviousExperienceWithProductionCompany: boolean | null;
        companyLegallyEstablished: boolean | null;
        companyHasRelevantProjects: boolean | null;
        companyTaxCompliance: boolean | null;
      };
      support: {
        companyAffiliatedWithAssociation: boolean | null;
        negativeReportsExist: boolean | null;
        companyHasMoreThanXYearsInMarket: boolean | null;
        goodSocialMediaReputation: boolean | null;
      };
      director: {
        hasPreviousExperienceWithDirector: boolean | null;
        isYoungTalent: boolean | null;
        reelContainsRelevantPieces: boolean | null;
      };
    }
  }


  export interface Budget {
    crew: number;
    preAndPro: number;
    talent: number;
    equipment: number;
    location: number;
    travel: number;
    stillPhotography: number;
    postProduction: number;
    financing: number;
    insurance: number;
    overhead: number;
    markUp: number;
  }
  