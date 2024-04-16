import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(request: NextRequest) {
  try {
    //Primera consulta a la coleccion de datos en donde
    //Ambos ids estan juntos
    //Segunda seria a candidato/perfil
    //tecerca a usuario/persona
    // const datos= await PerfilCandidato.find()

    const candidato: any = await Candidato.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuarioData"
        }
      },
      {
        $unwind: "$usuarioData" // Deshacer el array generado por $lookup
      },
      {
        $project: {
          idPersona: "$usuarioData.idPersona"
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
        $unwind: "$personaData" // Deshacer el array generado por el segundo $lookup
      }
    ])
    console.log(candidato)
    // console.log(user);
    const response = NextResponse.json({
      message: "Succesfull login",
      data: candidato.usuario,
      success: true,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}