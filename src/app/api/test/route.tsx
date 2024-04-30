import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";

import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {

    try {

        await new Candidato({
            idUsuario: "66201f4f8ffc58933694e09f",
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
                        { referencia: "Alivensa" }
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
            perfil: 
                {
                    descripcionPersonal: "Soy alguien muy emprendedor",
                    puestoDeseado: "Ingeniero en jefe de desarrollo",
                    salarioDeseado: 2500,
                    calificacion: 4.5,
                    esDestacado:true
                }
            ,
            redes: [{ enlace: "facebook" }, { enlace: "Instagram" }, { enlace: "linkID" }],
            formacionesAcademicas: [
                {
                    titulo: "Ingeniero en informatica",
                    institucion: 'Iutepi'
                }
            ]
        }).save()

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
