import { connect } from "@/dbConfig/dbConfig";
import Empresa from "@/models/empresas";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    let page: any = request.nextUrl.searchParams.get("page")

    const PER_PAGE = 5

    try {
        //Consulta desde candidatos hasta personas. esto es para candidato normal
        const skip = (page - 1) * PER_PAGE;

        const countEnterprises = await Empresa.countDocuments({ esDestacado: false })
        //planeo hacer el paginado aca
        const paginatedEmpresaQuery: any = await Empresa.aggregate([
            {
                $match: {
                    "usuarioData.status": true
                }
            },
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
        ]).skip(skip).limit(PER_PAGE)

        const pageCount = countEnterprises / PER_PAGE;

        const response = NextResponse.json({
            message: "Succesfull login",
            pagination: {
                countEnterprises,
                pageCount,
            },
            paginatedEmpresaQuery,
            success: true,
        })
        //console.log("hello world")

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}