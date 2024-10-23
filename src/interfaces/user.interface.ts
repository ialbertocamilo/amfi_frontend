export interface IUser {
    birthDate: string; // ISO 8601 date string
    createdAt: string; // ISO 8601 date string
    email: string;
    gender: string;
    id: string; // UUID
    isEnabled: boolean;
    isMexicanResident: boolean;
    isVerified: boolean;
    jobPosition: string;
    lastname: string;
    name: string;
    nationalIdentifierOrRFC: string;
    nationality: string | null;
    role: string;
    updatedAt: string; // ISO 8601 date string
  }