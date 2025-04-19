import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";
connect()

export async function POST(request: NextRequest) {
  const reqJson = await request.json()
  let { page } = reqJson;
  const PER_PAGE = 5
  page = Number(page) || 1

  try {
    const skip = Math.max(0, (page - 1) * PER_PAGE);

    const pipeline: PipelineStage[] = [
      {
        $match: {
          esDestacado: false
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
        $unwind: {
          path: "$usuarioData",
          preserveNullAndEmptyArrays: false
        }
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
        $unwind: {
          path: "$personaData",
          preserveNullAndEmptyArrays: false
        }
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
        $unwind: {
          path: "$documentosData",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $match: {
          "documentosData.contentType": { $ne: "application/pdf" }
        }
      },
      {
        $project: {
          "Candidato": "$$ROOT",
          usuarioData: "$usuarioData",
          personaData: "$personaData",
          documentosData: {idArchivo:"$documentosData.idArchivo"},
          sortOrder: { 
            $cond: {
              if: { $gt: ["$perfil.calificaciones", null] },
              then: "$perfil.calificaciones",
              else: 0
            }
          },
          _id: 1
        }
      },
      {
        $sort: {
          "sortOrder": -1,
          "_id": 1
        }
      }
    ];

    // Para obtener el conteo total
    const countPipeline: PipelineStage[] = [...pipeline, { $count: "total" }];
    const countResult = await Candidato.aggregate(countPipeline);
    const totalCount = countResult[0]?.total || 0;

    // Para obtener los resultados paginados
    const paginatedPipeline: PipelineStage[] = [
      ...pipeline,
      { $skip: skip },
      { $limit: PER_PAGE }
    ];

    const paginatedQuery = await Candidato.aggregate(paginatedPipeline);

    const pageCount = Math.ceil(totalCount / PER_PAGE);

    const response = NextResponse.json({
      message: "Succesfull data retrieve",
      pagination: {
        count: totalCount,
        pageCount: pageCount,
      },
      data: paginatedQuery,
      success: true,
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;