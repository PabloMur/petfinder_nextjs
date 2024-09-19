// Definición del tipo PetData
export type PetData = {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  description?: string;
  isLost: boolean;
  location: string;
  dateLostOrFound: Date | string; // Puede ser un string o un objeto Date
  ownerContact?: string;
  ownerEmail?: string;
};
