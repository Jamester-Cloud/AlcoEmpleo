import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from '@google/generative-ai'


export async function POST(request: NextRequest) {
    try {
        
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
                        },
                    },
                },
            }
        });

        let prompt = `
        Crea un instrumento de evaluación con 10 preguntas de  selección múltiple que sirva para medir con fines corporativos las habilidades blandas, 
        en forma precisa, específicamente que nos permita precisar el nivel que posee una persona en cuanto a sus habilidades de:
        comunicación efectiva, 
        liderazgo, 
        trabajo en equipo, 
        resolución de conflictos, 
        empatía, 
        adaptabilidad 
        y honestidad
        `;

        let result = await model.generateContent(prompt)
        console.log(result)
        let preguntas: any = JSON.parse(result.response.text());
        console.log(preguntas)
        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false }, { status: 500 })
    }
}
