export class Pet {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  description?: string;
  isLost: boolean;
  location: string;
  dateLostOrFound: Date;
  ownerEmail: string | undefined;
  ownerContact: string;

  constructor(
    name: string,
    species: string,
    isLost: boolean,
    location: string,
    dateLostOrFound: Date,
    ownerContact: string,
    ownerEmail: string,
    breed?: string,
    age?: number,
    description?: string
  ) {
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.age = age;
    this.description = description;
    this.isLost = isLost;
    this.location = location;
    this.dateLostOrFound = dateLostOrFound;
    this.ownerContact = ownerContact;
    this.ownerEmail = ownerEmail;
  }

  // Método para cambiar el estado de 'perdido/encontrado'
  toggleLostStatus(): void {
    this.isLost = !this.isLost;
  }

  // Método para actualizar la ubicación
  updateLocation(newLocation: string): void {
    this.location = newLocation;
  }

  // Método para mostrar una breve descripción de la mascota
  getPetInfo(): string {
    return `${this.name} es un ${this.species}${
      this.breed ? " de raza " + this.breed : ""
    } ${this.isLost ? "perdido" : "encontrado"} en ${this.location}.`;
  }
}
