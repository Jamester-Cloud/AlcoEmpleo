import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()


export async function POST(request: NextRequest) {

    const reqJson = await request.json()

    let { query } = reqJson;
    let page = query.page;
    let q: any = [{
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
            usuarioData: "$usuarioData",
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
    }]

    const PER_PAGE = query.limit

    try {
        const skip = (page - 1) * PER_PAGE;

        const data = await Candidato.aggregate(q).skip(skip).limit(PER_PAGE)

        const count = await Candidato.countDocuments()

        const pageCount = count / PER_PAGE;

        const response = NextResponse.json({
            message: "Succesfull pagination",
            data,
            pagination: {
                pageCount:Math.floor(pageCount),
                count
            }
        })

        return response;

    } catch (error: any) {
        console.log(error.lineNumber,);
        return NextResponse.json({ error: error + " and error is:" + error.message + " " + error.lineNumber }, { status: 500 })
    }
}