import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { deepSeekPsychoQuizEvaluator } from "@/services/deepsekAI";
connect();

export async function POST(request: NextRequest) {
  try {
    let filter;
    let update;
    const reqJson = await request.json();

    let { calificacion, respuestasCandidatos, idQuiz, idCandidato } = reqJson;
    const quiz = await Cuestionario.findOne({ _id: idQuiz });
    const candidato = await Candidato.findOne({ _id: idCandidato });

    if (quiz.tipo === "Psicotecnico") {
      const calificationPsicotecnica = await deepSeekPsychoQuizEvaluator(
        respuestasCandidatos
      );

      let califacionCuestionarioNormal = calificacion;
      const calificacionTotal =
        parseInt(califacionCuestionarioNormal) + calificationPsicotecnica;

      console.log("Calificacion psicotecnica", calificationPsicotecnica);
      console.log("Calificacion total: ", calificacionTotal);

      filter = { _id: idQuiz };
      update = {
        $set: {
          calificacion: calificacionTotal,
          respuestasCandidato: respuestasCandidatos,
          finalizada: true,
        },
      };

      await Cuestionario.updateOne(filter, update);

      return NextResponse.json({
        message: "Cuestionario completado exitosamente",
        calificacion: calificacionTotal,
      });
    }
    //Si no, es solo un cuestionario mas a ser guardado y evaluado
    filter = { _id: idQuiz };
    update = {
      $set: {
        calificacion: calificacion,
        respuestasCandidato: respuestasCandidatos,
        finalizada: true,
      },
    };

    await Cuestionario.updateOne(filter, update);

    filter = { _id: candidato.idCandidato };
    update = {
      $set: {
        "perfil.calificaciones": calificacion,
      },
    };

    await Candidato.updateOne(filter, update);
    return NextResponse.json({
      message: "Cuestionario guardado exitosamente",
      calificacion: calificacion,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Consulta creada erroneamente",
      success: false,
    });
  }
}

export const revalidate = 0;
