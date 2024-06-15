import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import OfertaTrabajo from '@/models/ofertaTrabajo'
connect()

export async function POST(request: NextRequest) {

    const reqJson = await request.json()
    
    let {
        data: {
            tituloOferta,
            descripcionOferta,
            beneficios,
            requisitos,
            modalidadTrabajo,
            idEmpresa
        }
    } = reqJson;

    await new OfertaTrabajo({
        tituloOferta: tituloOferta,
        descripcionOfertaTrabajo: descripcionOferta,
        beneficios: beneficios,
        requisitos: requisitos,
        idEmpresa: idEmpresa,
        modalidadTrabajo: modalidadTrabajo
    }).save()


    const response = NextResponse.json({
        message: "Oferta guardada exitosamente",
        success: true
    })
    return response
}