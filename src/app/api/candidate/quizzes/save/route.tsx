import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        let filter;
        let update;
        const reqJson = await request.json()

        let { calificacion, respuestasCandidato, idQuiz } = reqJson;

        filter = { idQuiz: idQuiz }
        update = { calificacion: calificacion, respuestasCandidato: respuestasCandidato }

        await Candidato.updateOne(filter, update)
        console.log(reqJson);


        return NextResponse.json({ message: 'Cuestionario guardado exitosamente' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
