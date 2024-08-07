import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqJson = await request.json()

        let { idCandidato, dificultad, preguntas } = reqJson;

        console.log(reqJson);
        await new Cuestionario({
            idCandidato:idCandidato,
            preguntas:preguntas,
            dificultad:dificultad,
            finalizada:false
        }).save()

        return NextResponse.json({ message: 'Cuestionario guardado exitosamente' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
