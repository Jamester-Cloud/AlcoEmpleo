import { connect } from "@/dbConfig/dbConfig";
import Candidato_Experiencia from "@/models/candidato_experiencia";
import Candidato_Habilidad from "@/models/candidato_habilidad";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {

   
  
        const candidato_Experiencia = new Candidato_Experiencia({
            idExperiencia: "6605d365abb908d9c89c2aef",
            idCandidato: "66201f1b8ffc58933694e08e"
        }).save()
        const candidato_Experiencia2 = new Candidato_Experiencia({
            idExperiencia: "6605d365abb908d9c89c2aef",
            idCandidato: "66201f1b8ffc58933694e08e"
        }).save()
        const candidato_Experiencia3 = new Candidato_Experiencia({
            idExperiencia: "6605d391abb908d9c89c2af0",
            idCandidato: "66201f4f8ffc58933694e0a2"
        }).save()

        const candidato_Habilidad = new Candidato_Habilidad({
            idHabilidad: "66047972c52af02c78202a36",
            idCandidato: "66201efc8ffc58933694e084"
        }).save()
        const candidato_Habilidad2 = new Candidato_Habilidad({
            idHabilidad: "66047aebc52af02c78202a3a" ,
            idCandidato: "66201f1b8ffc58933694e08e"
        }).save()
        const candidato_Habilidad3 = new Candidato_Habilidad({
            idHabilidad: "66048507c52af02c78202a45",
            idCandidato: "66201f4f8ffc58933694e0a2"
        }).save()

        

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false})
    }
}
