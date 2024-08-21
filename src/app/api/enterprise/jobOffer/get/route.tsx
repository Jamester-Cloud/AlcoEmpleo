import { connect } from "@/dbConfig/dbConfig";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { NextRequest, NextResponse } from "next/server";
import Empresa from "@/models/empresas";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()


export async function POST(request: NextRequest) {
    const reqJson = await request.json()

    let { id } = reqJson;
    console.log(id);
    try {
        //Consulta desde candidatos hasta personas
        let oferta = await OfertaTrabajo.findOne({ _id: id })

        console.log(oferta);

        const response = NextResponse.json({
            message: "Succesfull login",
            ofertas: oferta,
            success: true
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}