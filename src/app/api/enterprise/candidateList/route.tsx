import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  //aca trae los candidatos normales
  const reqJson = await request.json();

  let { page } = reqJson;

  const PER_PAGE = 30;
  page = Math.max(0, page);
  try {
    //Consulta desde candidatos hasta personas. esto es para candidato normal
    const skip = (page - 1) * PER_PAGE;

    let count = await Candidato.aggregate([
      {
        $match: {
          esDestacado: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuarioData",
        },
      },
      {
        $unwind: {
          path: "$usuarioData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "personas",
          localField: "usuarioData.idPersona",
          foreignField: "_id",
          as: "personaData",
        },
      },
      {
        $unwind: {
          path: "$personaData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "documentos",
          localField: "usuarioData._id",
          foreignField: "idUsuario",
          as: "documentosData",
        },
      },
      {
        $unwind: {
          path: "$documentosData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "documentosData.contentType": { $ne: "application/pdf" },
        },
      },
      {
        $project: {
          Candidato: "$$ROOT",
          usuarioData: "$usuarioData",
          personaData: "$personaData",
          documentosData: { idArchivo: "$documentosData.idArchivo" },
          sortOrder: {
            $cond: {
              if: { $gt: ["$perfil.calificaciones", null] },
              then: "$perfil.calificaciones",
              else: 0,
            },
          },
          _id: 1,
        },
      },
      {
        $sort: {
          sortOrder: -1,
          _id: 1,
        },
      },
    ]);
    //planeo hacer el paginado aca
    let paginatedQuery = await Candidato.aggregate([
      {
        $match: {
          esDestacado: false,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuarioData",
        },
      },
      {
        $unwind: {
          path: "$usuarioData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "personas",
          localField: "usuarioData.idPersona",
          foreignField: "_id",
          as: "personaData",
        },
      },
      {
        $unwind: {
          path: "$personaData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "documentos",
          localField: "usuarioData._id",
          foreignField: "idUsuario",
          as: "documentosData",
        },
      },
      {
        $unwind: {
          path: "$documentosData",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "documentosData.contentType": { $ne: "application/pdf" },
        },
      },
      {
        $project: {
          Candidato: "$$ROOT",
          usuarioData: "$usuarioData",
          personaData: "$personaData",
          documentosData: { idArchivo: "$documentosData.idArchivo" },
          sortOrder: {
            $cond: {
              if: { $gt: ["$perfil.calificaciones", null] },
              then: "$perfil.calificaciones",
              else: 0,
            },
          },
          _id: 1,
        },
      },
      {
        $sort: {
          sortOrder: -1,
          _id: 1,
        },
      },
    ])
      .skip(skip)
      .limit(PER_PAGE);
      
    const pageCount = count.length / PER_PAGE;

    const response = NextResponse.json({
      message: "Succesfull data retrieve",
      pagination: {
        count: count.length,
        pageCount: pageCount,
      },
      data: paginatedQuery,
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error + " and error is:" + error.message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
