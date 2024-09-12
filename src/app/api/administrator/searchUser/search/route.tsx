import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Persona from "@/models/personaModel";
import User from "@/models/userModel";
import Candidato from "@/models/candidato";
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

    try {
        console.log(query)

        data = await Persona.findOne(q)

        user = await User.findOne({ idPersona: data._id })

        candidatos = await Candidato.findOne({ idUsuario: user._id })

        data = [{ personaData: data, usuarioData: user, _id: candidatos._id }]
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