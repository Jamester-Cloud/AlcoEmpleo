import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas
    const reqJson = await request.json()
    console.log(reqJson)
    const candidato: any = await Candidato.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: reqJson.id }] } } },
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
          usuarioData: "$usuarioData",
          "candidato": "$$ROOT",
          "documentos": "$documentosData",
          "personaData":"$personaData"
        }
      },
    ])

    //console.log(candidato)
    let pdf = candidato.filter((item: any) => { if (item.documentos.contentType == 'application/pdf') return item.documentos.idArchivo })
    let profilePicture = candidato.filter((item: any) => { if (item.documentos.contentType != 'application/pdf') return item.documentos.idArchivo })

    console.log("Cv ", pdf);
    console.log("ProfilePicture ", profilePicture);

    const response = NextResponse.json({
      message: "Succesfull data retrieving",
      success: true,
      data: candidato,
      cv: pdf,
      profilePicture: profilePicture
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}