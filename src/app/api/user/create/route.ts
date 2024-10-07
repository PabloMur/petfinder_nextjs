import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@/types/UserData";

export async function POST(request: NextRequest) {
  try {
    const userdata: UserType = await request.json();
    console.log(userdata);
  } catch (error) {
    return NextResponse.json({ error, message: "Error al crear el usuario" });
  }
}
