import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqJson = await request.json();
    let { email } = reqJson;
    
    const user = await User.findOne({ email: email });
    
    if (!user) {
        return NextResponse.json({ error: "No se encontro usuario" }, { status: 400 })
    }

    return NextResponse.json(
      { message: "Usuario encontrado", user:user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
