import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {

  const { cargo, location } = await request.json()

  console.log(cargo, location);

  try {
    //Consulta filtrada para busqueda
    const candidato: any = await Candidato.aggregate([
      {
        $search: {
          index: "testDinamicSearch",
          text: {
            query: cargo,
            path: {
              wildcard: "*"
            }
          }
        }
      },
      {
        $lookup: {
          from: "regiones",
          localField: "idRegion",
          foreignField: "_id",
          as: "region"
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
    console.log(candidato);
    // const countCandidate = await Candidato.countDocuments({ esDestacado: false })

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