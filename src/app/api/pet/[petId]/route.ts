import { NextResponse, NextRequest } from "next/server";
import { getPetById } from "@/controllers/PetController";

export async function GET(
  request: NextRequest,
  { params }: { params: { petId?: string } }
) {
  try {
    const petId = params.petId; // Obtener el petId de los parámetros dinámicos de la URL

    if (petId) {
      // Si se recibe un petId, obtener la información de esa mascota en particular
      const pet = await getPetById(petId);

      if (!pet) {
        return NextResponse.json(
          {
            response: `No se encontró la mascota con el ID: ${petId}`,
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        response: `Información de la mascota con ID: ${petId}`,
        pet, // Retorna la información de la mascota específica
      });
    } else {
      return NextResponse.json(
        {
          response: "Se requiere un 'petId' en la ruta.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        response: "Error al obtener la/s mascota/s",
        error,
      },
      { status: 500 }
    );
  }
}
