import { NextResponse, NextRequest } from "next/server";
import { createPet } from "@/controllers/PetController";
import { PetData } from "@/types/PetData"; // Importar el tipo PetData

// Validación de los campos del request basados en el modelo de la clase Pet
// esta funcion debe migrarse al archivo tools, ya que es una funcion auxiliar -> para que quede un codigo mas limpio
function validatePetData(petData: PetData) {
  const requiredFields = [
    "id",
    "name",
    "species",
    "isLost",
    "location",
    "dateLostOrFound",
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

  if (petData.ownerContact && typeof petData.ownerContact !== "string") {
    throw new Error(
      "El campo 'ownerContact' debe ser una cadena de texto si se proporciona."
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la petición
    const petData: PetData = await request.json();

    // Validar los datos de la mascota
    validatePetData(petData);

    // Llamar al controlador para crear la nueva mascota
    const newPetId = await createPet(petData);

    // Respuesta de éxito
    return NextResponse.json({
      response: "Mascota creada con éxito",
      petId: newPetId,
    });
  } catch (error) {
    // Respuesta en caso de error
    return NextResponse.json({
      response: "Error al crear la mascota",
      error: error,
    });
  }
}
