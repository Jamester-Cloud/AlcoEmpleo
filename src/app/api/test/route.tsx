import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from '@/models/cuestionarios'
import { NextRequest, NextResponse } from "next/server";
connect()

export async function GET(request: NextRequest) {
    try {
        await new Cuestionario({
            idCandidato: "669e8937da1662e525b8eaf3",
            preguntas: [
                {
                    pregunta: "¿Cuál es la capital de Francia?",
                    respuestaCorrecta: "París",
                    respuestas: [
                        { respuesta: "París" },
                        { respuesta: "Londres" },
                        { respuesta: "Roma" },
                        { respuesta: "Madrid" }
                    ]
                },
                {
                    pregunta: "¿Cuántos continentes hay en el mundo?",
                    respuestaCorrecta: "Siete",
                    respuestas: [
                        { respuesta: "Cinco" },
                        { respuesta: "Seis" },
                        { respuesta: "Siete" },
                        { respuesta: "Ocho" }
                    ]
                }
            ],
            respuestasCandidato: [
                { respuesta: "París" },
                { respuesta: "Siete" }
            ],
            dificultad: "Media",
            calificacion: 5,
            createdAt: new Date(),
            finalizada: true
        }).save()
        
        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true, })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
