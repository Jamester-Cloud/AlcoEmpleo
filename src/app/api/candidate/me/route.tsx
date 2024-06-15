import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import Candidato from "@/models/candidato";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect()
//si pruebo que es el llamado a cookies aca, podria refactorizar esta peticion
export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        let {idPersona, idUsuario} = reqBody
        const persona = await Persona.findOne({ _id: idPersona })
        const candidato = await Candidato.findOne({ idUsuario: idUsuario })
        const usuario = await User.findOne({_id:idUsuario})

        return NextResponse.json({
            message: 'Candidate found',
            dataPersona: persona,
            dataCandidato: candidato,
            idCandidato:candidato._id,
            emailUsuario:usuario.email,
            success:true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}