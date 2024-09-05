import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Persona from '@/models/personaModel'
import User from "@/models/userModel";
import Empresa from "@/models/empresas";
import { connect } from "@/dbConfig/dbConfig";
import Documento from "@/models/documentos";
connect()

export async function POST(request: NextRequest) {
    try {


        const reqJson = await request.json()
        let { idUsuario, idPersona } = reqJson;
        // TODO centralizar en una consulta
        const persona = await Persona.findOne({ _id: idPersona })
        const user = await User.findOne({ _id: idUsuario })
        const empresa = await Empresa.findOne({ idUsuario: idUsuario })
        const documentos = await Documento.find({ idUsuario: idUsuario })

        let acta = documentos.find((item: any) => item.contentType == 'application/pdf')
        let logo = documentos.find((item: any) => item.contentType != 'application/pdf')

        return NextResponse.json({ logo: logo, acta: acta, userData: user, personaData: persona, empresa: empresa, idEmpresa: empresa._id });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}