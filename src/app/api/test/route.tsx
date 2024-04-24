import { connect } from "@/dbConfig/dbConfig";
import Candidato_experiencia from "@/models/candidato_experiencia";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {

        const habilidad = new Candidato_habilidad({
            idExperiencia: "",
            idCandidato: ""
        }).save()

        const experiencia = new Candidato_habilidad({
            idExperiencia: "",
            idCandidato: ""
        }).save()

        const candidato_experiencia = new Candidato_experiencia({
            idExperiencia: "",
            idCandidato: ""
        }).save()

        const candidato_habilidad = new Candidato_habilidad({
            idExperiencia: "",
            idCandidato: ""
        }).save()

        

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false})
    }
}
