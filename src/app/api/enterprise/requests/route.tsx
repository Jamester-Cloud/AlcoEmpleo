import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PostulacionesCandidato from '@/models/postulacionesCandidato';
import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqJson = await request.json()
        let { idUsuario, idOferta } = reqJson;

        const candidato = await Candidato.findOne({ idUsuario: idUsuario });

        console.log(candidato)

        const postulacion = await PostulacionesCandidato.findOne({ idCandidato: candidato._id })

        if (postulacion) return NextResponse.json({ message: "Ya se postulo a esta oferta" }, { status: 200 });

        await new PostulacionesCandidato({
            idCandidato: candidato._id,
            idOferta: idOferta,
            fechaPostulacion: new Date()
        }).save()

        //const userData = getDataFromToken(request);
        return NextResponse.json({ msg: "peticion correcta" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}