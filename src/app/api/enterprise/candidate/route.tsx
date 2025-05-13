import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import Cuestionario from "@/models/cuestionarios";
connect();

export async function POST(request: NextRequest) {
  try {
    //Consulta desde candidatos hasta personas
    const reqJson = await request.json();

    const candidato: any = await Candidato.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: reqJson.id }] } } },
      {
        $lookup: {
          from: "users",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuarioData",
        },
      },
      {
        $unwind: "$usuarioData",
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
        $unwind: "$personaData",
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
        $unwind: "$documentosData",
      },
      {
        $project: {
          candidato: "$$ROOT",
          documentos: "$documentosData",
          personaData: "$personaData",
        },
      },
    ]);
    //No tiene documentos
    const candidatoNoDocs: any = await Candidato.aggregate([
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: reqJson.id }] } } },
      {
        $lookup: {
          from: "users",
          localField: "idUsuario",
          foreignField: "_id",
          as: "usuarioData",
        },
      },
      {
        $unwind: "$usuarioData",
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
        $unwind: "$personaData",
      },
      {
        $project: {
          usuarioData: "$usuarioData",
          candidato: "$$ROOT",
          personaData: "$personaData",
        },
      },
    ]);

    //const cuestionarios: any = await Cuestionario.findOne({idCandidato: reqJson.id});
    const cuestionarios: any = await Cuestionario.find({
      idCandidato: reqJson.id,
      //tipo: { $in: ["psicotecnico", "normal"] }, // Asegúrate que coincida con el valor exacto en la BD
    });
    console.log(cuestionarios);
    //el candidato puede ser uno sin documentos disponibles
    if (!candidato) {
      const response = NextResponse.json({
        message: "Succesfull data retrieving",
        success: true,
        noDocs: true,
        data: candidatoNoDocs,
      });

      return response;
    } else {
      //console.log(candidato)
      let pdf = candidato.filter((item: any) => {
        if (item.documentos.contentType == "application/pdf")
          return item.documentos.idArchivo;
      });
      let profilePicture = candidato.filter((item: any) => {
        if (item.documentos.contentType != "application/pdf")
          return item.documentos.idArchivo;
      });

      const response = NextResponse.json({
        message: "Succesfull data retrieving",
        success: true,
        candidate: candidato,
        cv: pdf,
        profilePicture: profilePicture,
      });

      return response;
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error + " and error is:" + error.message },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
