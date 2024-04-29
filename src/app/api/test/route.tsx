import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {

        const candidato_test = new Candidato({
            idUsuario: "66201f4f8ffc58933694e09f",
            cargoActual: "Programador de software",
            esDestacado: true,
            experiencias: [
                {
                    nombreEmpresa: "Arroz Mary",
                    duracion: "3 años",
                    logros: [
                        { descripcionLogro: "Instale un software de monitoreo" },
                        { descripcionLogro: "Logre realizar una conexion de camaras de circuito cerrado" }
                    ],
                    referencias: [
                        { referencia: "Luis" },
                        { referencia: "Jenny" },
                        { referencia: "Alivensa"}
                    ],
                    descripcion: "Fue una experiencia muy enriquecedora en cuanto a conocimientos",
                    estatus: true
                },
            ],
            habilidad: [
                {
                    nombreHabilidad: "React",
                    nivelHabilidad: "Experto"
                },
                {
                    nombreHabilidad: "Star UML",
                    nivelHabilidad: "Novato"
                }
            ],
            perfil: {
                // CV: {
                //     file: { type: Buffer, required: true },
                //     filename: { type: String, required: true },
                //     ext: { type: String, required: true }
                // },
                descripcionPersonal: "Soy alguien muy emprendedor",
                // videoPresentacion: {
                //     file: { type: Buffer, required: true },
                //     filename: { type: String, required: true },
                //     ext: { type: String, required: true }
                // },
                puestoDeseado: "Ingeniero en jefe de desarrollo",
                salarioDeseado: Number,
                redes: [{ enlace: "facebook" }, { enlace: "Instagram" }, { enlace: "linkID" }],
                calificacion:Number
            }
        }).save()

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
