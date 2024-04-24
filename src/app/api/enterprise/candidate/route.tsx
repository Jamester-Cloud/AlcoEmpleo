import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import Perfil from '@/models/perfilModel'
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas
    console.log(request);
    const candidatosPremiums: any = await Candidato.aggregate([
      {
        $match: {
          "_id": request
        }
      },
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
    //Consultamos los premiums y los mandamos tambien a la vista
    //const candidatosPremiums = await Candidato.aggregate([])
    const response = NextResponse.json({
      message: "Succesfull login",
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}