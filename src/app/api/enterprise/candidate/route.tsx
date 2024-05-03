import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas
    const reqJson =  await request.json()
    
    const candidato: any = await Candidato.aggregate([
      { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: reqJson.id } ] } } },
      {
        $lookup: {
          from: "perfils",
          localField: "idPerfil",
          foreignField: "_id",
          as: "perfilData"
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
        $unwind: "$perfilData"
      },
      {
        $project: {
          idPersona: "$usuarioData.idPersona",
          perfil: "$perfilData"
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
    
    console.log(candidato)
    const response = NextResponse.json({
      message: "Succesfull data retrieving",
      success: true,
      data:candidato
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}