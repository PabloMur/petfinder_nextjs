class User {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string; // Número de teléfono (opcional)
  address?: string; // Dirección del usuario (opcional)
  pets: string[]; // Lista de mascotas asociadas al usuario (IDs de las mascotas)
  joinedAt: Date; // Fecha en la que se unió el usuario

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    pets: string[] = [],
    phoneNumber?: string,
    address?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.pets = pets;
    this.joinedAt = new Date(); // Establece la fecha de creación al momento actual
  }

  // Método para actualizar el número de teléfono
  updatePhoneNumber(newPhoneNumber: string): void {
    this.phoneNumber = newPhoneNumber;
  }

  // Método para actualizar la dirección
  updateAddress(newAddress: string): void {
    this.address = newAddress;
  }

  // Método para cambiar la contraseña
  changePassword(newPassword: string): void {
    this.password = newPassword;
  }

  // Método para añadir una nueva mascota a la lista de mascotas del usuario
  addPet(petId: string): void {
    if (!this.pets.includes(petId)) {
      this.pets.push(petId);
    }
  }

  // Método para remover una mascota de la lista de mascotas del usuario
  removePet(petId: string): void {
    this.pets = this.pets.filter((id) => id !== petId);
  }

  // Método para mostrar información del usuario
  getUserInfo(): string {
    return `Usuario: ${this.name}, Email: ${this.email}, Número de mascotas: ${this.pets.length}`;
  }
}

export { User };
