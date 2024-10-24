export interface IUser {
    birthDate: string; // ISO 8601 date string
    createdAt: string; // ISO 8601 date string
    email: string;
    gender: string;
    id?: string; // UUID
    isEnabled: boolean;
    isMexicanResident: boolean;
    isVerified: boolean;
    jobPosition: string;
    lastname: string;
    name: string;
    nationalIdentifierOrRFC: string;
    nationality: string | null;
    role: string;
    updatedAt: string;
    company?: {
      id: string;
      slug: string;
      name: string;
      legalName: string;
      nationalIdentifierOrRFC: string | null;
      foundingYear: string | null;
      additionalInfo: string | null;
      type: string;
      instagram_url: string | null;
      facebook_url: string | null;
      linkedin_url: string | null;
      web_url: string | null;
      amfiId: string | null;
      certificationId: string | null;
      createdAt: string;
    };
  }