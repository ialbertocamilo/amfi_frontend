export interface InvitedDirectorsResponse {
    message: string;
    result: InvitedDirector[];
}

export interface InvitedDirector {
    id: string;
    accepted: boolean | null;
    proposalUploaded: boolean;
    createdAt: string;
    updatedAt: string;
    project: ProductionHouse;
    director: Director;
    productionHouse: ProductionHouse;
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
