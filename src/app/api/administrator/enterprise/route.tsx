import { connect } from "@/dbConfig/dbConfig";
import Empresa from "@/models/empresas";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

   
    const PER_PAGE = 5

    try {
        //Consulta desde candidatos hasta personas. esto es para candidato normal
        //planeo hacer el paginado aca
        const paginatedEmpresaQuery: any = await Empresa.aggregate([

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
                    idPersona: "$usuarioData.idPersona",
                    usuarioData:"$usuarioData"
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
        ])

        const response = NextResponse.json({
            message: "Succesfull login",
            paginatedEmpresaQuery,
            success: true,
        })
        //console.log("hello world")

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}