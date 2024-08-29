import { connect } from "@/dbConfig/dbConfig";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { NextRequest, NextResponse } from "next/server";
import Empresa from "@/models/empresas";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()


export async function POST(request: NextRequest) {
    const userData = getDataFromToken(request);
    try {
        let empresa = await Empresa.findOne({ idUsuario: userData.id });
        console.log(empresa._id)
        //Consulta desde candidatos hasta personas
        let ofertas = await OfertaTrabajo.find({ idEmpresa: empresa._id })

        const response = NextResponse.json({
            message: "Succesfull login",
            ofertas: ofertas,
            success: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}