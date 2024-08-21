import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
  //aca trae los candidatos normales
  const reqJson = await request.json()

  let { page } = reqJson;

  const PER_PAGE = 10

  try {
    //Consulta desde candidatos hasta personas. esto es para candidato normal
    const skip = (page - 1) * PER_PAGE;

    console.log(skip)

    let count = await Candidato.aggregate([
      {
        $match: {
          "esDestacado": false
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
    //planeo hacer el paginado aca
    let paginatedQuery = await Candidato.aggregate([
      {
        $match: {
          "esDestacado": false
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

    ]).skip(skip).limit(PER_PAGE)
    //filtros para solo traerme los candidatos y sus fotos de perfil
    paginatedQuery = paginatedQuery.filter((filter) => filter.documentosData.contentType != "application/pdf")
    //  aplicando el mismo filtro para count
    count = count.filter((filter) => filter.documentosData.contentType != "application/pdf")

    const pageCount = count.length / PER_PAGE;

    console.log("Hay un total de:", count.length, "Candidatos sin destacar")
    console.log("Candidatos despues de los filtros y el paginado: ", paginatedQuery, "en la pagina:", page)

    const response = NextResponse.json({
      message: "Succesfull data retrieve",
      pagination: {
        count: count.length,
        pageCount: Math.floor(pageCount),
      },
      data: paginatedQuery,
      success: true,
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}