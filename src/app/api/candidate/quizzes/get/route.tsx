import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    let reqJson = await request.json()
    let { idQuizz } = reqJson
    try {
        //planeo hacer el paginado aca
        const cuestionario = await Cuestionario.findById(idQuizz);

        //console.log(cuestionario)
        let quiz = cuestionario.preguntas.map((item: any, key: number) => {
            return { page: key + 1, pregunta: item.pregunta, respuestas: item.respuestas, respuestaCorrecta: item.respuestaCorrecta }
        })

        quiz.idCandidato = cuestionario.idCandidato

        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            quiz: quiz
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}