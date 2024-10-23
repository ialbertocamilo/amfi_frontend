export interface IPlan {
    active: boolean;
    createdAt: string; // ISO 8601 date string
    credits: number;
    description: string;
    features: string[]; // Array of strings
    id: string; // UUID
    name: string;
    price: string; // Assuming price is a string
    title: string;
  }