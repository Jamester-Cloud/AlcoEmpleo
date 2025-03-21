import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();
// this route works for updating the user password
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, preguntas } = reqBody;
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return NextResponse.json(
        { error: "No se encontro el usuario" },
        { status: 400 }
      );
    }

    let isNotCorrect;
    isNotCorrect = user.preguntas.some((pregunta: any, i:number) => {
        return preguntas[i].respuesta.toLowerCase() !== pregunta.respuesta.toLowerCase();
    });

    if(isNotCorrect){
        return NextResponse.json(
            { message: "Preguntas erradas"},
            { status:203}
          );
    }

    return NextResponse.json(
        { message: "Peticion exitosa, preguntas correctas" },
        { status: 200 }
      );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
