import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Persona from "@/models/personaModel";
import User from "@/models/userModel";
import Candidato from "@/models/candidato";
import Documento from "@/models/documentos";
connect()


export async function POST(request: NextRequest) {
    const { query } = await request.json()
    let data: any;
    let user;
    let candidatoData;
    let q: any =
    {
        "cedula": query.cedula ? query.cedula : query.riff
    }
    let profilePicture;
    try {

        data = await Persona.findOne(q)

        if(!data) return NextResponse.json({
            message: "No data",
            success: true,
            data,
        })

        user = await User.findOne({ idPersona: data._id })
        
        candidatoData = await Candidato.findOne({ idUsuario: user._id })
        profilePicture = await Documento.findOne({idUsuario: user._id, contentType: { $ne: 'application/pdf' }})
        data = [{ personaData: data, usuarioData: user, candidatoData: candidatoData, documentosData:profilePicture }]
        
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            success: true,
            data,
        })
        
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}

export const revalidate = 0;