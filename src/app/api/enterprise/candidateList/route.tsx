import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(request: NextRequest) {

  let page:any = request.nextUrl.searchParams.get("page")
  const PER_PAGE = 4

  try {

    //Consulta desde candidatos hasta personas. esto es para candidato normal
    const skip = (page - 1) * PER_PAGE;

    const count = await Candidato.countDocuments({ esDestacado: false })
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
    ]).skip(skip).limit(PER_PAGE)

    const pageCount = count / PER_PAGE;

    console.log(count)
    const response = NextResponse.json({
      message: "Succesfull login",
      pagination: {
        count,
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