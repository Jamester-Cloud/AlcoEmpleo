import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from '@/models/cuestionarios'
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai'
connect()

export async function GET(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(`${process.env.QUIZ_KEY}`);

    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt = `
    Dame 5 preguntas importantes que le harias a un programador web, en forma de preguntas de opcion multiple, junto con la opcion correcta en español, en el 
    siguiente formato:
    [{pregunta:"", opciones:[{respuesta:""}], correcta:{}}]
    }`;

    let result = await model.generateContent(prompt)
    console.log(result.response);
    try {
        // await new Cuestionario({
        //     idCandidato: "669e8937da1662e525b8eaf3",
        //     idEmpresa: "66201f868ffc58933694e0ab",
        //     preguntas: [
        //         { pregunta: "Que debe de Saber un ING?" },
        //         { pregunta: "¿Es Necesario conocer sobre el Internet?" }
        //     ],
        //     respuestas: [
        //         { respuesta: "Matematicas" },
        //         { respuesta: "Si" }
        //     ],
        //     calificacion: 5,
        //     createadAt: new Date("2024-07-31T00:00:00Z")
        // }).save()

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true, result: result })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
