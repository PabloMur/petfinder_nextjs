import { NextRequest, NextResponse } from "next/server";
import { deletePetById } from "@/controllers/PetController";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { petId?: string } }
) {
  try {
    const petId = params.petId;

    if (!petId) {
      return NextResponse.json(
        {
          response: "El parámetro 'petId' es obligatorio.",
        },
        { status: 400 }
      );
    }

    // Llamar a la función para eliminar la mascota
    const result = await deletePetById(petId);

    return NextResponse.json(
      {
        response: result, // Retornar el mensaje de éxito de la función deletePetById
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        response: "Error al eliminar la mascota.",
        error: (error as Error).message, // Retorna el mensaje de error si ocurre alguno
      },
      { status: 500 }
    );
  }
}
