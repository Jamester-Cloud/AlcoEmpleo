import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import Candidato from "@/models/candidato";
import User from "@/models/userModel";
import Documento from "@/models/documentos";
import { connect } from "@/dbConfig/dbConfig";
import { fileValidator, filePdfValidator } from "@/helpers/fileValidator";
connect()
//si pruebo que es el llamado a cookies aca, podria refactorizar esta peticion
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        let { idPersona, idUsuario } = reqBody

        const persona = await Persona.findOne({ _id: idPersona })
        const candidatoData = await Candidato.findOne({ idUsuario: idUsuario })

        const candidato = await Candidato.aggregate([
            { $match: { $expr: { $eq: ['$idUsuario', { $toObjectId: idUsuario }] } } },
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
                    "documentos": "$documentosData",
                }
            },
        ])
        let pic;
        let cv;
        let emailUsuario;

        candidato.map((item) => {
            item.documentos.contentType === "application/pdf" ? cv = item.documentos : pic = item.documentos
            emailUsuario = item.usuarioData.email
        })
        return NextResponse.json({
            message: 'Candidate found',
            dataPersona: persona,
            dataCandidato: candidatoData,
            profilePicture: pic,
            cv: cv,
            emailUsuario: emailUsuario,
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}