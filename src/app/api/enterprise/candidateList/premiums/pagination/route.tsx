import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Documento from "@/models/documentos";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {

    const reqJson = await request.json()
    let { page } = reqJson;

    const PER_PAGE = 6
    const skip = (parseInt(page) - 1) * PER_PAGE;

    try {
        let count = await Candidato.aggregate([
            {
                $match: {
                    "esDestacado": true,
                },
            },
            {
                $sort: {
                    "perfil.calificaciones": -1
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
                    "documentos": "$documentosData"
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
                $sort: {
                    "perfil.calificaciones": -1
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
                    "documentos": "$documentosData"
                }
            },
        ]).skip(skip).limit(10)


        //filtros para solo traerme los candidatos y sus fotos de perfil
        candidatosPremiums = candidatosPremiums.filter((item: any) => { return item.documentos.contentType != 'application/pdf' })
        console.log(candidatosPremiums.length)
        //  aplicando el mismo filtro para count
        count = count.filter((item: any) => { return item.documentos.contentType != 'application/pdf' })

        const pageCount = count.length / PER_PAGE;

        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            pagination: {
                count: count.length,
                pageCount: pageCount,
            },
            dataCandidatosPremium: candidatosPremiums,
            success: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;