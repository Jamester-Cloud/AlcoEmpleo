import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()


export async function POST(request: NextRequest) {

  const { cargo, location, page } = await request.json()

  console.log(page);

  let objectLocationId;
  if (location) objectLocationId = Types.ObjectId.createFromHexString(location)
  const PER_PAGE = 4
  const skip = (page - 1) * PER_PAGE;
  try {

    const candidatePremiums: any = await Candidato.aggregate([
      {
        $search: {
          index: "testDinamicSearch",
          text: {
            query: cargo,
            path: "perfil.puestoDeseado"
          },
        }
      },
      {
        $match: {
          "perfil.puestoDeseado": { $regex: new RegExp(cargo, 'i') },
          "idRegion": objectLocationId,
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

    const paginatedQuery: any = await Candidato.aggregate([
      {
        $search: {
          index: "testDinamicSearch",
          text: {
            query: cargo,
            path: "perfil.puestoDeseado"
          },
        }
      },
      {
        $match: {
          "perfil.puestoDeseado": { $regex: new RegExp(cargo, 'i') },
          "idRegion": objectLocationId,
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

    const count = await Candidato.countDocuments({ esDestacado: false })

    const pageCount = count / PER_PAGE;

    //let mappedData = mapper(candidato);
    console.log("Consulta paginada: ",paginatedQuery);
    console.log("Consulta para premiums", candidatePremiums);



    const response = NextResponse.json({
      message: "Succesfull data retrieve",
      success: true,
      candidatePremiums,
      pagination: {
        count,
        pageCount,
      },
      paginatedQuery,
    })
    //console.log("hello world")

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}