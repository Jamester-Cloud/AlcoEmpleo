import { connect } from "@/dbConfig/dbConfig";
import Empresa from "@/models/empresas";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    const reqJson = await request.json();
    let { query } = reqJson;

    let page = query.page
    const PER_PAGE = query.limit;

    let q = [
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
                usuarioData: "$usuarioData"
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
    ]

    try {

        const skip = (page - 1) * PER_PAGE;

        const data: any = await Empresa.aggregate(q).skip(skip).limit(PER_PAGE);
        const count: number = await Empresa.countDocuments();
        console.log(count);

        const pageCount: any = count / PER_PAGE;

        const response = NextResponse.json({
            message: "Succesfull login",
            data,
            pagination: {
                pageCount: Math.floor(pageCount),
                count
            },
            success: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}