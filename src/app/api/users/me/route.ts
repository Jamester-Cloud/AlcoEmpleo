import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import Persona from '@/models/personaModel'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userData = await getDataFromToken(request);
        console.log(request);
        const user = await User.findOne({ _id: userData.id }).select("-password")
        const persona = await Persona.findOne({_id: userData.idPersona})
        return NextResponse.json({message:'User found', userData:user, personaData:persona});
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}