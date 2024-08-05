import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { Query, Types } from "mongoose";
import OfertaTrabajo from "@/models/ofertaTrabajo";
connect()


export async function POST(request: NextRequest) {
    const { cargo } = await request.json()
    let data: any;
    let q: any = [
        {
            $search: {
                index: "default",
                text: {
                    query: cargo,
                    path: "tituloOferta"
                },
            }
        },
        {
            $lookup: {
                from: "empresas",
                localField: "idEmpresa",
                foreignField: "_id",
                as: "empresaData"
            }
        },
        {
            $unwind: "$empresaData",
        },
        {
            $project: {
                "ofertaTrabajo": "$$ROOT",
                empresaData: "$empresaData",
            }
        },
    ]

    try {
        data = await OfertaTrabajo.aggregate(q)
        console.log(data);
        return NextResponse.json({ data: data }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}