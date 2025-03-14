import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqJson = await request.json();
    
    let { preguntas, email } = reqJson;
    console.log("preguntas: ", preguntas, "Email:", email);

    let filter = { email: email },
      update = { preguntas: preguntas, firstTimeLogin: false };

    await User.updateOne(filter, update);

    return NextResponse.json(
      { message: "Preguntas guardadas" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
