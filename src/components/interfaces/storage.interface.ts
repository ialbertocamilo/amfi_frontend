export interface StorageUser {
  access_token: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: "super-admin" | "admin" | "user";
    createdAt: string;
    company: {
      id: string; // UUID
      name: string;
      type: "advertiser" | "agency";
      additionalInfo: string | null;
      amfiId: string;
      certificationId: string;
      createdAt: string; // ISO date string
      facebook_url: string;
      foundingYear: number;
      instagram_url: string;
      legalName: string;
      linkedin_url: string;
      maxUsers: number;
      nationalIdentifierOrRFC: string;
      slug: string;
      updatedAt: string;
      web_url: string;
    };
  };
}
