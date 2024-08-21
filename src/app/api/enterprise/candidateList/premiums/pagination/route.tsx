import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Documento from "@/models/documentos";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {

    const reqJson = await request.json()
    let { page } = reqJson;
    //console.log(page)

    const PER_PAGE = 5
    const skip = (page - 1) * PER_PAGE;

    try {
        let count = await Candidato.aggregate([
            {
                $match: {
                    "esDestacado": true
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
                $lookup: {
                    from: "personas",
                    localField: "usuarioData.idPersona",
                    foreignField: "_id",
                    as: "personaData"
                }
            },

            {
                $unwind: "$personaData"
            },
            {
                $project: {
                    "candidato": "$$ROOT",
                    personaData: "$personaData",
                    "documentosData": "$documentosData"
                }
            },

        ])
        // debo traer aca las paginas de los candidatos
        let candidatosPremiums: any = await Candidato.aggregate([
            {
                $match: {
                    "esDestacado": true,
                },
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
                $lookup: {
                    from: "personas",
                    localField: "usuarioData.idPersona",
                    foreignField: "_id",
                    as: "personaData"
                }
            },
            {
                $unwind: "$personaData"
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
                    "Candidato": "$$ROOT",
                    usuarioData: "$usuarioData",
                    personaData: "$personaData",
                    documentos: "$documentosData"
                }
            },
        ]).skip(skip).limit(PER_PAGE)

        // trae solo los candidatos que tengan foto de perfil
     

        //filtros para solo traerme los candidatos y sus fotos de perfil
        candidatosPremiums = candidatosPremiums.filter((filter:any) => filter.documentosData.contentType != "application/pdf")
        //  aplicando el mismo filtro para count
        count = count.filter((filter) => filter.documentosData.contentType != "application/pdf")


        const pageCount = count.length / PER_PAGE;

        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            pagination: {
                count: count.length,
                pageCount:pageCount,
              },
              data: candidatosPremiums,
              success: true,
        })
        //console.log("hello world")

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}