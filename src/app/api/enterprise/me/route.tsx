import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import User from "@/models/userModel";
import Empresa from "@/models/empresas";
import { connect } from "@/dbConfig/dbConfig";
import Documento from "@/models/documentos";
connect()

export async function GET(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);
        const persona = await Persona.findOne({ _id: userData.idPersona })
        const user = await User.findOne({ _id: userData.id })
        const empresa = await Empresa.findOne({ idUsuario: userData.id })
        const documentos = await Documento.find({ idUsuario: userData.id })
        
        let acta = documentos.find((item: any) => item.contentType == 'application/pdf')
        let logo = documentos.find((item: any) => item.contentType != 'application/pdf')
        
        return NextResponse.json({ logo: logo, acta: acta, userData: user, personaData: persona, empresa: empresa, idEmpresa:empresa._id });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}