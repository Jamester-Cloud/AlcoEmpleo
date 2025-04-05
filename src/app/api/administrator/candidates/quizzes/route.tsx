import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import {deepSeekQuizGenerator} from "@/services/deepsekAI";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqJson = await request.json();

    let { idCandidato, dificultad } = reqJson;

    const candidato = await Candidato.findOne({ _id: idCandidato });
    let cargoDeseado = candidato.perfil.puestoDeseado;
    if (!cargoDeseado)
      return NextResponse.json(
        { message: "Error, no hay cargo para generar", success: false },
        { status: 500 }
      );

          
    let preguntas = await deepSeekQuizGenerator(
      cargoDeseado,
      "Normal",
      dificultad
    );
    console.log("Cargo", cargoDeseado);
    console.log(preguntas);

    return NextResponse.json({
      message: "Consulta creada exitosamente",
      success: true,
      cargoDeseado: cargoDeseado,
    });
  } catch (error: any) {
    console.log(error.statusText);
    if (error.statusText === "Too Many Requests") {
      return NextResponse.json(
        {
          message:
            "Demasiadas peticiones al modelo de ia, por favor reintente mas tarde. Modelo congestionado",
          success: false,
        },
        { status: 204 }
      );
    } else {
      return NextResponse.json(
        { message: "Consulta creada erroneamente", success: false },
        { status: 204 }
      );
    }
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
