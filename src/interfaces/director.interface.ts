export interface DirectorEntity {
    id: string;
    uniqueCode: string;
    name: string;
    lastname: string;
    nationality: string;
    birthDate: string;
    isMexicanResident: boolean;
    startedExperienceYear: number;
    nationalIdentifierOrRFC: string | null;
    isAvailable: boolean;
    createdAt: string;
    representation: string;
}