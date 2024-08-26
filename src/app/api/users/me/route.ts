import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import Documento from "@/models/documentos";
import Persona from '@/models/personaModel';
import Empresa from "@/models/empresas";
import Rol from "@/models/userRolModel";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function GET(request: NextRequest) {
    try {
        //autenticando
        const userData = getDataFromToken(request);

        const user = await User.findOne({ _id: userData.id }).select("-password")

        const empresa = await Empresa.findOne({ idUsuario: userData.id })

        const documentos = await Documento.findOne({ idUsuario: userData.id })

        const persona = await Persona.findOne({ _id: userData.idPersona })

        const rol = await Rol.findOne({ _id: user.idRol })

        return NextResponse.json({ message: 'User found', documentos: documentos, userData: user, personaData: persona, userRol: rol.rol, empresa: empresa });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}