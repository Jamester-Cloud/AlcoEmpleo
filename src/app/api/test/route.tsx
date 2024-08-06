import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from '@/models/cuestionarios'
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai'
connect()

export async function GET(request: NextRequest) {
    const genAI = new GoogleGenerativeAI(`${process.env.QUIZ_KEY}`);

    let cargoDeseado = "Ingeniero de software";
    let dificultad = "media";

    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: FunctionDeclarationSchemaType.ARRAY,
                items: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        pregunta: {
                            type: FunctionDeclarationSchemaType.STRING,
                        },
                        respuestas: {
                            type: FunctionDeclarationSchemaType.ARRAY,
                            items: {
                                type: FunctionDeclarationSchemaType.OBJECT,
                                properties: {
                                    respuesta: { type: FunctionDeclarationSchemaType.STRING },
                                }
                            }
                        },
                        correcta: {
                            type: FunctionDeclarationSchemaType.STRING,
                        },
                    },
                },
            },
        }
    });

    let prompt = `Dame 5 preguntas importantes de seleccion multiple, que le harias a un ${cargoDeseado} para certificarlo en un cargo dentro de una empresa, junto con la respuesta correcta y su vez con un grado de dificultad alto, en español, tambien que sean preguntas diferentes no me generes las mismas si te lo pregunto varias veces, y no cambies la estructura de los datos.`;

    let result = await model.generateContent(prompt)
    let preguntas: any = JSON.parse(result.response.text());
    preguntas.map((item: any, key: number) => {
        console.log(item)
    })
    // preguntas?.map((item:any, key:Number)=>{
    //     console.log(item)
    // })
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
