import { connect } from "@/dbConfig/dbConfig";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(request: NextRequest) {
    try {
        //Consulta desde candidatos hasta personas
        const ofertas = await OfertaTrabajo.find()
        //console.log("hello world")
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