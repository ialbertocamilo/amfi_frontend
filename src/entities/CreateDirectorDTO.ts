export interface CreateDirectorDTO {
    id: string | null,
    name?: string;
    lastName?: string;
    nationality: string;
    birthDate?: string;
    directionYear: string;
    representation?: string;
    isMexicanResident?:boolean
    startedExperienceYear?:number;
    nationalIdentifierOrRFC?:string;
    isAvailable?:boolean
    createdAt?:string
}