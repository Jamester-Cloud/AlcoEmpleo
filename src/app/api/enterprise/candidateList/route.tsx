import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas. esto es para candidato normal
    const candidato: any = await Candidato.aggregate([
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
    ])
    
    const countCandidate = await Candidato.countDocuments({ esDestacado: false })
    const countCandidatePremium = await Candidato.countDocuments({ esDestacado: true })

    console.log(countCandidate);
    console.log(countCandidatePremium)

    const candidatosPremiums: any = await Candidato.aggregate([
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

    const response = NextResponse.json({
      message: "Succesfull login",
      dataCandidatos: candidato,
      dataCandidatosPremium: candidatosPremiums,
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}