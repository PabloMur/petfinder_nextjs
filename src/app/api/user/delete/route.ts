import { NextResponse, NextRequest } from "next/server";
import { deleteUserByEmail, doesUserExist } from "@/controllers/UserController";

export async function DELETE(request: NextRequest) {
  try {
    // Obtener el email de la query string
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email no proporcionado" },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe
    const userExists = await doesUserExist(email);

    if (!userExists) {
      return NextResponse.json(
        { error: "No se encontró el usuario con el email especificado." },
        { status: 404 }
      );
    }

    // Eliminar el usuario
    await deleteUserByEmail(email);

    return NextResponse.json(
      { message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
