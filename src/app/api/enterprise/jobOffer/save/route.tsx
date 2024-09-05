import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import OfertaTrabajo from '@/models/ofertaTrabajo'
connect()

export async function POST(request: NextRequest) {

    try {
        const reqJson = await request.json()
        let update;
        let filter;
        let {
            data: {
                tituloOferta,
                descripcionOferta,
                beneficios,
                requisitos,
                modalidadTrabajo,
                idEmpresa,
            },
            isUpdate,
            idOferta
        } = reqJson;

        console.log(reqJson);

        console.log(isUpdate);

        if (isUpdate) {

            console.log("Oferta actualizada exitosamente")

            filter = { _id: idOferta }
            console.log(filter);

            update = {
                $set: {
                    tituloOferta: tituloOferta,
                    beneficios: beneficios,
                    requisitos: requisitos,
                    idEmpresa: idEmpresa,
                    modalidadTrabajo: modalidadTrabajo,
                    descripcionOfertaTrabajo: descripcionOferta
                }
            }

            console.log(update)

            await OfertaTrabajo.updateOne(filter, update);

        } else {
            console.log("Oferta guardada exitosamente")
            await new OfertaTrabajo({
                tituloOferta: tituloOferta,
                descripcionOfertaTrabajo: descripcionOferta,
                beneficios: beneficios,
                requisitos: requisitos,
                idEmpresa: idEmpresa,
                modalidadTrabajo: modalidadTrabajo
            }).save()
        }



        const response = NextResponse.json({
            message: "Oferta guardada exitosamente",
            success: true
        })
        return response
    } catch (error: any) {
        console.log(error.lineNumber,);
        return NextResponse.json({ error: error + " and error is:" + error.message + " " + error.lineNumber }, { status: 500 })

    }
}