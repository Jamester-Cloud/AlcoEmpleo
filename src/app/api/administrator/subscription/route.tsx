import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Subscripcion from '@/models/subscripcion'
import Candidato from "@/models/candidato";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()

export async function POST(request: NextRequest) {

    const reqJson = await request.json()

    console.log(reqJson);

    const treintaDiasEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

    const fechaActual = new Date();
    //
    const session = await User.startSession();

    let { idUsuario, isPremium } = reqJson;

    let update;
    let filter;

    try {
        session.startTransaction()

        filter = { _id: Types.ObjectId.createFromHexString(idUsuario) }
        // primero debo verificar si ya tiene subscripcion y si no, creo una 
        //aparte de eso debo destacar al candidato
        let isSubscribed: any = await Subscripcion.findOne({ idUsuario: idUsuario }).countDocuments().session(session)
        // no esta suscrito actualmente y no es premium(el estado premium debe solo aprobarse por esta funcion en especifico) 
        //pues se crea una nueva subscripcion para el usuario y se cambia su estado a usuario premium
        if (!isSubscribed && !isPremium) {
            console.log("Creando subscripcion")
            await new Subscripcion({ idUsuario: idUsuario, fechaInicio: fechaActual, fechaFin: fechaActual.setTime(treintaDiasEnMilisegundos), monto: "$5", estatus: true }).save()
            update = { $set: { "isPremium": true } }

        }

        if (!isSubscribed && isPremium) {
            console.log("Creando subscripcion y revocando. Para volver a reactivar manualmente")
            await new Subscripcion({ idUsuario: idUsuario, fechaInicio: fechaActual, fechaFin: fechaActual.setTime(treintaDiasEnMilisegundos), monto: "$5", estatus: false }).save()
            await Subscripcion.updateOne(filter, { estatus: false }).session(session)
            update = { $set: { "isPremium": false } }

        }
        //Esta subscrito y esta activo y su usuario ya es premium (entonces se procede a una revocacion)
        if (isSubscribed && isSubscribed?.estatus && isPremium) {
            console.log("Revocando subscripcion")
            await Subscripcion.updateOne(filter, { estatus: false }).session(session)
            update = { $set: { "isPremium": false } }
        }
        //Esta subscrito pero no esta activa su subscripcion y su usuario no es premium (se procede a una reactivacion)
        if (isSubscribed && !isSubscribed.estatus && !isPremium) {
            console.log("Reactivando subscripcion")
            await Subscripcion.updateOne(filter, { estatus: true }).session(session)
            update = { $set: { "isPremium": true } }
        }
        //actualizando usuario
        await User.updateOne(filter, update).session(session);

        const response = NextResponse.json({
            message: "Succesfull data update",
            success: true,
        })

        await session.commitTransaction();
        session.endSession();

        return response;

    } catch (error: any) {
        session.abortTransaction()
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}