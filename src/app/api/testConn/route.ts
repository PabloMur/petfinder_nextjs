import { firestore } from "@/lib/FirebaseConn";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Intentamos obtener las colecciones para verificar si Firestore está conectado
    const collections = await firestore.listCollections();

    // Si Firestore devuelve una lista de colecciones (aunque esté vacía), consideramos la conexión exitosa
    if (collections) {
      return NextResponse.json({
        response: "Backend conectado y base de datos conectada correctamente!",
        databaseStatus: "Conectado",
      });
    } else {
      throw new Error("No se pudieron obtener las colecciones.");
    }
  } catch (error) {
    return NextResponse.json({
      response:
        "API responde, pero hay un problema con la conexión a la base de datos.",
      error,
    });
  }
}
