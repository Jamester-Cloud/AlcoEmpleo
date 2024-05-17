import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import Candidato from "@/models/candidato";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function GET(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);
        const persona = await Persona.findOne({ _id: userData.idPersona })
        const candidato = await Candidato.findOne({ idUsuario: userData.id })
        const usuario = await User.findOne({_id:userData.id})

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