import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()


export async function POST(request: NextRequest) {

    // let page: any = request.nextUrl.searchParams.get("page")
    const reqJson = await request.json()
    let { query } = reqJson;
    console.log(query);
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
    let sort = { _id: -1 }
    let limit = 20
    try {
        // no funciona reinicia
        if (query.prev) {
            q = [
                { $match: { $expr: { $lt: ['$_id', { $toObjectId: query.prev }] } } }, {
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
                }
            ]

            //Funciona
        } else if (query.next) {
            q = [
                { $match: { $expr: { $gt: ['$_id', { $toObjectId: query.next }] } } }, {
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
                }
            ]
            sort._id = 1
        }
        console.log(sort);
        const data = await Candidato.aggregate(q, { sort: sort }).limit(limit)

        //if (query.prev) data.reverse(), console.log("Datos revertidos")

        console.log("Ultimo: ", data.slice(-1)[0]._id)
        console.log("Primero", data[0]._id)


        const response = NextResponse.json({
            message: "Succesfull pagination",
            data,
            last_doc: data.slice(-1)[0]._id,
            first_doc: data[0]._id
        })

        return response;

    } catch (error: any) {
        throw error
        //     return NextResponse.json({ error: error + " and error is:" + error.message + " " + error.lineNumber }, { status: 500 })
    }
}