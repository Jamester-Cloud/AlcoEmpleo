import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  FunctionDeclarationSchemaType,
} from "@google/generative-ai";
connect();
const genAI = new GoogleGenerativeAI(`${process.env.QUIZ_KEY}`);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.NUMBER,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          calificacion: {
            type: FunctionDeclarationSchemaType.NUMBER,
          },

        },
      },
    },
  },
});

export async function POST(request: NextRequest) {
  try {
    let filter;
    let update;
    const reqJson = await request.json();

    let { calificacion, respuestasCandidatos, idQuiz, idCandidato } = reqJson;
    const quiz = await Cuestionario.findOne({ _id: idQuiz });
    const candidato = await Candidato.findOne({ _id: idCandidato });
    console.log(quiz);
    console.log(candidato);
    console.log(respuestasCandidatos);

    if (quiz.tipo === "Psicotecnico") {

      // al guardar, se debe evaluar las respuestas del candidato, por el cuestionario
      // el modelo debe hacer esto
      let prompt = `Tomando como base el perfil ideal de  una persona para el cargo de  analiza las  respuestas de desarrollo de este candidato  y en una escala del 1 al 5, determina cuál es satisfactoria y cual no. Recuerda dar una calificacion numerica solamente, no necesitamos mas nada `
      let result = await model.generateContent(prompt)
      let calificacionFinal: any = JSON.parse(result.response.text());
      
      filter = { _id: candidato.idCandidato }
      update = {
        $set: {
          "perfil.calificaciones": calificacionFinal
        }
      }

      await Candidato.updateOne(filter, update)
      return NextResponse.json({ message: "Cuestionario guardado exitosamente" });
    }
    //Si no es solo un cuestionario mas a ser guardado y evaluado
    filter = { _id: idQuiz }
    update = { $set: { calificacion: calificacion, respuestasCandidato: respuestasCandidatos, finalizada: true } }

    await Cuestionario.updateOne(filter, update);

    filter = { _id: candidato.idCandidato }
    update = {
      $set: {
        "perfil.calificaciones": calificacion
      }
    }
    console.log(filter)
    console.log(update)
    await Candidato.updateOne(filter, update)
    return NextResponse.json({ message: "Cuestionario guardado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Consulta creada erroneamente",
      success: false,
    });
  }
}

export const revalidate = 0;
