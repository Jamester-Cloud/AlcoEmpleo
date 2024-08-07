import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    let reqJson = await request.json()
    let { idUsuario } = reqJson
    console.log(reqJson);
    try {
        //planeo hacer el paginado aca
        const candidato = await Candidato.findOne({ idUsuario: idUsuario })
        const cuestionarios = await Cuestionario.find({ idCandidato: candidato._id.toString() });
        console.log(candidato._id.toString())
        console.log(cuestionarios);
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            cuestionarios:cuestionarios
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}