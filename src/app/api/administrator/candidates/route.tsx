import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    try {

        const paginatedCandidateQuery: any = await Candidato.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "idUsuario",
                    foreignField: "_id",
                    as: "usuarioData"
                }
            },
            {
                $unwind: "$usuarioData"
            },
            {
                $project: {
                    usuarioData:"$usuarioData",
                    idPersona: "$usuarioData.idPersona",
                }
            },
            {
                $lookup: {
                    from: "personas",
                    localField: "idPersona",
                    foreignField: "_id",
                    as: "personaData"
                }
            },
            {
                $unwind: "$personaData"
            }
        ]).limit(10)


        const response = NextResponse.json({
            message: "Succesfull login",
            // pagination: {
            //     countCandidates,
            //     pageCount,
            // },
            paginatedCandidateQuery,
            success: true,
        })
        //console.log("hello world")

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}