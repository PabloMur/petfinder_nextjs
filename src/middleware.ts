import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ request, secret });

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/api/pet",
};
