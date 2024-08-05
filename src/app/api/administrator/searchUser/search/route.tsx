import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { Query, Types } from "mongoose";
import Persona from "@/models/personaModel";
import User from "@/models/userModel";
connect()


export async function POST(request: NextRequest) {
    const { query } = await request.json()
    let data: any;
    let user;
    let q: any =
    {
        "cedula": query.cedula ? query.cedula : query.riff
    }
    
    try {
        console.log(query)
        data = await Persona.findOne(q)

        user = await User.findOne({ idPersona: data._id })
        
        data = [{ personaData: data, usuarioData: user }]
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            success: true,
            data
        })
        //console.log("hello world")
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}