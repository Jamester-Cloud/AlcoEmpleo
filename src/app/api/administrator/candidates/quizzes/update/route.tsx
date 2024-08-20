import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    let reqJson = await request.json()
    let { idQuiz } = reqJson
    try {
        //planeo hacer el paginado aca
        //todos los cuestionarios pertenecientes a este candidato
        const cuestionario: any = await Cuestionario.aggregate([
            { $match: { $expr: { $eq: ['$_id', { $toObjectId: idQuiz }] } } },
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
                $project: {
                    candidatoData: "$candidatoData",
                    cuestionario: "$$ROOT",
                }
            },

        ]);

        const response = NextResponse.json({
            quiz: cuestionario[0].cuestionario,
            idCandidato: cuestionario[0].candidatoData._id,
            cargoDeseado: cuestionario[0]?.candidatoData?.perfil?.puestoDeseado ? cuestionario[0].candidatoData.perfil.puestoDeseado : null
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}