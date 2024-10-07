import { NextResponse, NextRequest } from "next/server";
import { doesUserExist } from "@/controllers/UserController";

export async function GET(request: NextRequest) {
  try {
    // Obtener el email de la query string
    const email = request.nextUrl.searchParams.get("email");
    console.log(email);

    if (!email) {
      return NextResponse.json(
        { error: "Email no proporcionado" },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe por email
    const userExists = await doesUserExist(email);
    console.log(userExists);
    // Retornar true o false dependiendo de si existe el usuario
    return NextResponse.json({ exists: userExists, email });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
