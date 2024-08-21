"use server"
import { NextRequest, NextResponse } from "next/server";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {

        const formData = await request.json()

        let { idOferta } = formData
        console.log(idOferta);

        await OfertaTrabajo.deleteOne({ _id: idOferta });

        const response = NextResponse.json({
            message: "Eliminacion de datos exitosa",
            success: true,
        })

        return response;

    } catch (error: any) {
        console.log("error is", error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}