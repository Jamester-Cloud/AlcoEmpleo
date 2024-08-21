import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Documento from "@/models/documentos";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function GET(request: NextRequest) {
  try {
    // debo traer aca las paginas de los candidatos
    const candidatosPremiums: any = await Candidato.aggregate([
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
    ])

    // trae solo los candidatos que tengan foto de perfil
    let filtrados = candidatosPremiums.filter((item: any) => { return item.documentos.contentType != 'application/pdf' })
    
    //console.log(filtrados)
    
    const response = NextResponse.json({
      message: "Succesfull data retrieve",
      dataCandidatosPremium: filtrados,
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}