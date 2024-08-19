import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai'
connect()

export async function POST(request: NextRequest) {
    try {
        const reqJson = await request.json()

        let { idCandidato, dificultad } = reqJson;

        const candidato = await Candidato.findOne({ _id: idCandidato })
        console.log(idCandidato)
        let cargoDeseado = candidato.perfil.puestoDeseado;

        if(!cargoDeseado) return NextResponse.json({ message: 'Error, no hay cargo para generar', success: false }, { status: 500 })

        const genAI = new GoogleGenerativeAI(`${process.env.QUIZ_KEY}`);

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
                                        respuesta: { type: FunctionDeclarationSchemaType.STRING }
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

        let prompt = `
        Dame 5 preguntas importantes que le harias a un ${cargoDeseado} para certificarlo en un cargo dentro empresa, junto con la respuestas correctas y su vez con un grado de dificultad ${dificultad} en español. Cambia las preguntas por cada consulta por favor y asegurate de que la respuesta correcta este entre las respuestas generadas por favor.
        }`;

        let result = await model.generateContent(prompt)
        let preguntas: any = JSON.parse(result.response.text());

        return NextResponse.json({ message: 'Consulta creada exitosamente', preguntas: preguntas, success: true, cargoDeseado: cargoDeseado })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false }, { status: 500 })
    }
}
