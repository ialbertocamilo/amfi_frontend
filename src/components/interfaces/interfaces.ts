export interface Advertiser {
  id: string;
  slug: string;
  name: string;
  legalName: string;
  nationalIdentifierOrRFC: string;
  foundingYear: number;
  additionalInfo?: any;
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

export interface Agency {
    id: string;
    slug: string;
    name: string;
    legalName: string;
    nationalIdentifierOrRFC: string;
    foundingYear: number;
    additionalInfo?: any;
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
  
  export interface ProductionStudioCompany {
    nombre: string;
    seleccionada: boolean;
    directores: string[];
    detallesVisible: boolean;
  }
  