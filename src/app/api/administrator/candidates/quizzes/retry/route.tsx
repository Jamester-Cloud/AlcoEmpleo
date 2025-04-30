import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
import { deepSeekQuizGenerator } from "@/services/deepsekAI";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqJson = await request.json();

    let { idCandidato, idQuizz, dificultad } = reqJson;

    const candidato = await Candidato.findOne({ _id: idCandidato });

    let cargoDeseado = candidato.perfil.puestoDeseado;

    if (!cargoDeseado)
      return NextResponse.json(
        { message: "Error, no hay cargo para generar", success: false },
        { status: 500 }
      );

    let filter = {
      _id: idQuizz,
    };

    const preguntas = await deepSeekQuizGenerator(
      cargoDeseado,
      "Normal",
      dificultad
    );

    //actualizando las nuevas preguntas
    let update = {
      $set: {
        preguntas: preguntas.evaluacion,
      },
    };
    
    //re-generando el cuestionario
    await Cuestionario.updateOne(filter, update);

    return NextResponse.json({
      message: "Consulta creada exitosamente",
      success: true,
      idQuizz: idQuizz,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Consulta creada erroneamente", success: false },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
