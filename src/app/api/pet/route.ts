import { NextResponse, NextRequest } from "next/server";
import {
  createPet,
  getPetById,
  getPetsByOwnerEmail,
} from "@/controllers/PetController";
import { PetData } from "@/types/PetData"; // Importar el tipo PetData
import { validatePetData } from "@/lib/tools";

//Este endpoint lo que hace es crear una mascota
// AVISO: se debe hacer el circuito correspondiente para que se pueda adjuntar una o mas fotos de la mascota
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

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email") as string;

    if (!email) {
      // Si no se recibe un email, retorna un error
      return NextResponse.json(
        {
          response: "El parámetro 'email' es obligatorio.",
        },
        { status: 400 }
      );
    }

    // Obtener todas las mascotas del usuario por su email
    const pets = await getPetsByOwnerEmail(email);

    if (pets.length === 0) {
      return NextResponse.json({
        response: `No se encontraron mascotas para el email: ${email}`,
      });
    }

    return NextResponse.json({
      response: `Se encontraron ${pets.length} mascota(s) para el email: ${email}`,
      pets, // Devuelve el array de mascotas
    });
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
