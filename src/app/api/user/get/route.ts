import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/controllers/UserController"; // Unificar la llamada a la base de datos

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email no proporcionado" },
        { status: 400 }
      );
    }

    // Obtener al usuario directamente
    const userData = await getUserByEmail(email);

    if (!userData) {
      return NextResponse.json(
        { error: "No se encontró el usuario con el email especificado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ userData });
  } catch (error: any) {
    console.error(error); // Más claro que console.log
    return NextResponse.json(
      {
        error: error.message || "Error desconocido",
        message: "Error al intentar obtener la información del usuario.",
      },
      { status: 500 }
    );
  }
}
