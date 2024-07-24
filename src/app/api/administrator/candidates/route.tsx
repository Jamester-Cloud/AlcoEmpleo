import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    // let page: any = request.nextUrl.searchParams.get("page")

    // const PER_PAGE = 5

    try {
        //Consulta desde candidatos hasta personas. esto es para candidato normal
        // const skip = (page - 1) * PER_PAGE;

        // const countCandidates = await Candidato.countDocuments({ esDestacado: false })
        //planeo hacer el paginado aca
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
        ]).limit(5)


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