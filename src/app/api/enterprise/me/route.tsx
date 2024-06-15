import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import Empresa from "@/models/empresas";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function POST(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);
        const persona = await Persona.findOne({ _id: userData.idPersona })
        const empresa = await Empresa.findOne({ idUsuario: userData.id })
        
        return NextResponse.json({ message: 'User found', empresaNombre: persona.nombre, idEmpresa: empresa._id });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}