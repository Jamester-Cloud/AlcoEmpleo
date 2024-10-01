import { connect } from "@/dbConfig/dbConfig";
import Empresa from "@/models/empresas";
import User from "@/models/userModel";
import { Types } from "mongoose";

import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    try {
        //Consulta desde candidatos hasta personas
        const reqJson = await request.json()

        const empresa: any = await User.aggregate([
            {
                $match: {
                    "_id": Types.ObjectId.createFromHexString(reqJson.idUsuario)
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
                $lookup: {
                    from: "documentos",
                    localField: "_id",
                    foreignField: "idUsuario",
                    as: "documentosData"
                }
            },
            {
                $unwind: "$documentosData"
            },
            {
                $project: {
                    "documentos": "$documentosData",
                    "personaData": "$personaData",
                    "usersData": "$$ROOT"
                }
            },
        ])

        //console.log(empresa)

        // //console.log(candidato)
        let acta = empresa.filter((item: any) => { if (item.documentos.contentType == 'application/pdf') return item.documentos.idArchivo })
        let logo = empresa.filter((item: any) => { if (item.documentos.contentType != 'application/pdf') return item.documentos.idArchivo })


        const response = NextResponse.json({
            message: "Succesfull data retrieving",
            success: true,
            data: empresa,
            logo: logo,
            acta:acta
        })

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}