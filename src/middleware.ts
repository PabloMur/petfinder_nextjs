import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acceso sin token para rutas dinámicas de mascotas: /api/pet/[petId]
  const isPetRoute = /^\/api\/pet\/[\w-]+$/.test(pathname);

  if (isPetRoute) {
    // Si la ruta es /api/pet/[petId], permitir el acceso sin token
    return NextResponse.next();
  }

  // Para todas las otras rutas, requerir el token
  const token = await getToken({ req, secret });

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

// Definir las rutas protegidas
export const config = {
  matcher: [
    "/api/pet",
    "/api/pet/update/:path*",
    "/api/pet/delete/:path*",
    "/api/user",
  ], // Todas las rutas que empiecen con /api/pet y /api/user serán evaluadas
};
