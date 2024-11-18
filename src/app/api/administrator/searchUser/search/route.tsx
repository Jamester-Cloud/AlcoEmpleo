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
    let candidatos;
    let q: any =
    {
        "cedula": query.cedula ? query.cedula : query.riff
    }
    let pfp;
    try {

        data = await Persona.findOne(q)

        if(!data) return NextResponse.json({
            message: "No data",
            success: true,
            data,
        })

        user = await User.findOne({ idPersona: data._id })
        

        candidatos = await Candidato.findOne({ idUsuario: user._id })

        pfp = await Documento.findOne({idUsuario: user._id})

        data = [{ personaData: data, usuarioData: user, _id: candidatos._id, documentosData:pfp }]
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            success: true,
            data,
        })
        //console.log("hello world")
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}