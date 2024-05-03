import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import Persona from '@/models/personaModel'
import Rol from "@/models/userRolModel";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function GET(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);

        const user = await User.findOne({ _id: userData.id }).select("-password")

        const persona = await Persona.findOne({ _id: userData.idPersona })

        const rol = await Rol.findOne({ _id: user.idRol})
        
        return NextResponse.json({ message: 'User found', userData: user, personaData: persona, userRol: rol.rol });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}