import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    try {
        //planeo hacer el paginado aca
        const cuestionario = await Cuestionario.aggregate([
            {
                $lookup: {
                    from: "candidatoperfils",
                    localField: "idCandidato",
                    foreignField: "_id",
                    as: "candidatoData"
                },
            },
            {
                $unwind: "$candidatoData"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "candidatoData.idUsuario",
                    foreignField: "_id",
                    as: "usuarioData"
                },
            },
            {
                $unwind: "$usuarioData"
            },
            {
                $lookup: {
                    from: "personas",
                    localField: "usuarioData.idPersona",
                    foreignField: "_id",
                    as: "personaData"
                },
            },
            {
                $unwind: "$personaData"
            },
            {
                $project: {
                    candidatoData: "$candidatoData",
                    nombreCandidato: "$personaData.nombre",
                    apellidoCandidato: "$personaData.apellido",
                    cuestionario: "$$ROOT",
                }
            },
        ]);
        //console.log(cuestionario);
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            quiz: cuestionario,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}