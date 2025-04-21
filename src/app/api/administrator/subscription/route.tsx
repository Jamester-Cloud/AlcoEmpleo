import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Subscripcion from '@/models/subscripcion'
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()

export async function POST(request: NextRequest) {

    const reqJson = await request.json()

    const treintaDiasEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

    const fechaActual = new Date();
    //
    const session = await User.startSession();

    let { idUsuario, userType, requestType } = reqJson;

    let update = { $set: { "isPremium": false }};
    let filter;

    try {
        session.startTransaction()
        filter = { _id: Types.ObjectId.createFromHexString(idUsuario) }
        // primero debo verificar si ya tiene subscripcion y si no, creo una 
        //aparte de eso debo destacar al candidato
        let isSubscribed: any = await Subscripcion.findOne({ idUsuario: idUsuario })
        // si hay subscripcion
        if (isSubscribed && isSubscribed.estatus == true) {

            //Esta subscrito y esta activo y su usuario ya es premium (entonces se procede a una revocacion)
            if (requestType == false) {
                console.log("Revocando subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": false } })
                await Subscripcion.updateOne(filter, { estatus: false }).session(session)
                update = { $set: { "isPremium": false } }
            }

            if (requestType == true) {
                console.log("Subscripcion existente. Reactivando subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": true } })
                await Subscripcion.updateOne(filter, { estatus: true }).session(session)
                update = { $set: { "isPremium": true } }
            }

        }
        //no hay subscripcion
        else {
            if (requestType == true) {
                console.log("Creando subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": true } })
                await new Subscripcion({ idUsuario: idUsuario, fechaInicio: fechaActual, fechaFin: fechaActual.setTime(treintaDiasEnMilisegundos), monto: "$5", estatus: true }).save()
                update = { $set: { "isPremium": true } }
            }
        }

        await User.updateOne(filter, update).session(session);

        const response = NextResponse.json({
            message: "Succesfull data update",
            success: true,
        })

        await session.commitTransaction();
        session.endSession();

        return response;

    } catch (error: any) {
        console.log(error);
        session.abortTransaction()
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}

export const revalidate = 0;
export const dynamic = 'force-dynamic'