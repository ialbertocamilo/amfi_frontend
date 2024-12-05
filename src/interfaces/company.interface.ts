export interface ICompany {
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
    updatedAt: string;
}


export interface ICheckMaxUsersResponse{
    totalUsers: number;
    maxUsers: number;
    canAddUser: boolean;
}