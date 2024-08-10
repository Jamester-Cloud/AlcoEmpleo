import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        let filter;
        let update;
        const reqJson = await request.json()

        let { calificacion, respuestasCandidatos, idQuiz } = reqJson;

        console.log(respuestasCandidatos);

        filter = { _id: idQuiz }
        update = { $set: { calificacion: calificacion, respuestasCandidato: respuestasCandidatos, finalizada:true } }
        
        await Cuestionario.updateOne(filter, update)



        return NextResponse.json({ message: 'Cuestionario guardado exitosamente' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
