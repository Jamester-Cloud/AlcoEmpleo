import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqJson = await request.json();

    let { preguntas, email, password } = reqJson;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    console.log(preguntas, email, password);

    let filter = { email: email },
      update = { preguntas: preguntas, firstTimeLogin: false, password: hashedPassword };

    await User.updateOne(filter, update);

    return NextResponse.json(
      { message: "Preguntas guardadas"},
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
