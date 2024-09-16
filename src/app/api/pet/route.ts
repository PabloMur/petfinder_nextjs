import { NextResponse, NextRequest } from "next/server";
import { createPet } from "@/controllers/PetController";
import { PetData } from "@/types/PetData"; // Importar el tipo PetData
import { validatePetData } from "@/lib/tools";

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
