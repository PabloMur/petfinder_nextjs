import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
  //the routes that requires a token are at the matcher const
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
    "/api/user/delete/:path*",
  ],
};
