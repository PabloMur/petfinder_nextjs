import { PetData } from "@/types/PetData";

export function validatePetData(petData: PetData) {
  const requiredFields = [
    "id",
    "name",
    "species",
    "isLost",
    "location",
    "dateLostOrFound",
    "ownerContact", // Añadido como campo requerido
  ];

  // Verificar que todos los campos requeridos están presentes
  for (const field of requiredFields) {
    if (!petData[field as keyof PetData]) {
      throw new Error(`El campo ${field} es obligatorio.`);
    }
  }

  // Validaciones específicas de los tipos de datos
  if (typeof petData.id !== "string") {
    throw new Error("El campo 'id' debe ser una cadena de texto.");
  }

  if (typeof petData.name !== "string") {
    throw new Error("El campo 'name' debe ser una cadena de texto.");
  }

  if (typeof petData.species !== "string") {
    throw new Error("El campo 'species' debe ser una cadena de texto.");
  }

  if (typeof petData.isLost !== "boolean") {
    throw new Error("El campo 'isLost' debe ser un valor booleano.");
  }

  if (typeof petData.location !== "string") {
    throw new Error("El campo 'location' debe ser una cadena de texto.");
  }

  if (isNaN(Date.parse(petData.dateLostOrFound.toString()))) {
    throw new Error("El campo 'dateLostOrFound' debe ser una fecha válida.");
  }

  // Validar el campo 'ownerContact' como requerido y tipo string
  if (typeof petData.ownerContact !== "string") {
    throw new Error("El campo 'ownerContact' debe ser una cadena de texto.");
  }

  // Validar campos opcionales
  if (petData.breed && typeof petData.breed !== "string") {
    throw new Error(
      "El campo 'breed' debe ser una cadena de texto si se proporciona."
    );
  }

  if (petData.age && typeof petData.age !== "number") {
    throw new Error("El campo 'age' debe ser un número si se proporciona.");
  }

  if (petData.description && typeof petData.description !== "string") {
    throw new Error(
      "El campo 'description' debe ser una cadena de texto si se proporciona."
    );
  }
}
