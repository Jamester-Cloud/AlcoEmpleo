import { NextRequest, NextResponse } from "next/server";
import { deepSeekQuizGenerator } from "@/services/deepsekAI";

export async function POST(request: NextRequest) {
    try {
        
        const preguntas = await deepSeekQuizGenerator("", "Psicotecnico", "Normal")
        console.log(preguntas);
        
        return NextResponse.json({ message: 'Cuestionario generado exitosamente', preguntas:preguntas.evaluacion, success: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error en la peticion', success: false }, { status: 500 })
    }
}

export const revalidate = 0;
