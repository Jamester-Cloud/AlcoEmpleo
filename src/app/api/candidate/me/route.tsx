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
        const candidato = await Candidato.findOne({ idUsuario: idUsuario })
        const usuario = await User.findOne({ _id: idUsuario })
        const pdfDoc = await Documento.findOne({ idUsuario: idUsuario, contentType: "application/pdf" })
        const imageDoc = await Documento.findOne({ $or: [{ idUsuario: idUsuario }, { contentType: "image/jpeg" }, { contentType: 'image/jpg' }, { contentType: 'image/png' }] })


        console.log("Documentos", pdfDoc)
        console.log("Imagenes", imageDoc)

        return NextResponse.json({
            message: 'Candidate found',
            dataPersona: persona,
            dataCandidato: candidato,
            idCandidato: candidato._id,
            emailUsuario: usuario.email,
            cv: pdfDoc,
            profilePic: imageDoc,
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}