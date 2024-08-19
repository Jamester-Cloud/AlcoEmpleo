import { connect } from "@/dbConfig/dbConfig";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { NextRequest, NextResponse } from "next/server";
import Documento from "@/models/documentos";
connect()


export async function GET(request: NextRequest) {
    try {
        //Consulta desde candidatos hasta personas
        const ofertas = await OfertaTrabajo.aggregate([
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
                $lookup: {
                    from: "users",
                    localField: "empresaData.idUsuario",
                    foreignField: "_id",
                    as: "usuarioData"
                }
            },
            {
                $unwind: "$usuarioData"
            },
            {
                $lookup: {
                    from: "documentos",
                    localField: "usuarioData._id",
                    foreignField: "idUsuario",
                    as: "documentosData"
                }
            },
            {
                $unwind: "$documentosData"
            },
            {
                $project: {
                    ofertaTrabajo: "$$ROOT",
                    empresaData: "$empresaData",
                    documentosData: "$documentosData.idArchivo"
                }
            },
        ])
        console.log(ofertas)
        //console.log("hello world")
        const response = NextResponse.json({
            message: "Succesfull login",
            ofertas: ofertas,
            success: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}