import { updatePetById } from "@/controllers/PetController";
import { PetData } from "@/types/PetData";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { petId?: string } }
) {
  try {
    const petId = params.petId;

    if (!petId) {
      return NextResponse.json(
        {
          response: "El 'petId' es obligatorio para actualizar una mascota.",
        },
        { status: 400 }
      );
    }

    // Obtener los datos del cuerpo de la solicitud
    const petData: Partial<PetData> = await request.json();

    // Llamar al controller para actualizar la mascota
    const updateMessage = await updatePetById(petId, petData);

    // Respuesta exitosa
    return NextResponse.json({
      response: updateMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        response: "Error al actualizar la mascota",
        error: error,
      },
      { status: 500 }
    );
  }
}
