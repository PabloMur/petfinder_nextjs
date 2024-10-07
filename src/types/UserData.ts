export type UserType = {
  name: string;
  email: string;
  image: string;
  phoneNumber?: string; // Opcional
  address?: string; // Opcional
  pets: string[]; // IDs de mascotas
  joinedAt: Date; // Fecha de registro del usuario
  createdWith: string; // examples: google, manual, github
};
