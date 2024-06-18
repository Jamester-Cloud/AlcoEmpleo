import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

  const { perPage, page } = await request.json()
  console.log(perPage)
  console.log(page);

  try {
    //Consulta desde candidatos hasta personas. esto es para candidato normal
    const skip = (page - 1) * perPage;

    const countCandidate = await Candidato.estimatedDocumentCount({ esDestacado: false })
    //planeo hacer el paginado aca
    const paginatedQuery: any = await Candidato.aggregate([
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
        $project: {
          "Candidato": "$$ROOT",
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
    ]).skip(skip).limit(perPage)

    const pageCount = countCandidate / perPage;

    const response = NextResponse.json({
      message: "Succesfull login",
      pagination: {
        countCandidate,
        pageCount,
      },
      paginatedQuery,
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}