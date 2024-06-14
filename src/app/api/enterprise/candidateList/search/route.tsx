import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {

  const { puestoDeseado, estado } = await request.json()

  try {
    //Consulta filtrada para busqueda
    const candidato: any = await Candidato.aggregate([
      {
        $match: {
          "esDestacado": false,
          "perfil.puestoDeseado":puestoDeseado,
          "region.estado":estado
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
    ])
    //.skip(perPage*(page - 1)).limit(8)

    const countCandidate = await Candidato.countDocuments({ esDestacado: false })


    const response = NextResponse.json({
      message: "Succesfull login",
      dataCandidatos: candidato,
      totalCandidates: countCandidate,
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}