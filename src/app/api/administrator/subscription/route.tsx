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

    let { idUsuario, isPremium, userType, requestType } = reqJson;

    let update;
    let filter;

    try {
        session.startTransaction()
        console.log(reqJson);
        filter = { _id: Types.ObjectId.createFromHexString(idUsuario) }
        // primero debo verificar si ya tiene subscripcion y si no, creo una 
        //aparte de eso debo destacar al candidato
        let isSubscribed: any = await Subscripcion.findOne({ idUsuario: idUsuario })
        // si hay subscripcion
        if (isSubscribed) {
            console.log(isSubscribed)
            //Esta subscrito y esta activo y su usuario ya es premium (entonces se procede a una revocacion)
            if (!requestType) {
                console.log("Revocando subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": false } })
                await Subscripcion.updateOne(filter, { estatus: false }).session(session)
                update = { $set: { "isPremium": false } }
            }

            if (requestType) {
                console.log("Subscripcion existente. Reactivandp subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": true } })
                await Subscripcion.updateOne(filter, { estatus: true }).session(session)
                update = { $set: { "isPremium": true } }
            }

        }
        //no hay subscripcion
        else {
            if (requestType) {
                console.log("Creando subscripcion")
                if (userType == 'candidato') await Candidato.findOneAndUpdate({ idUsuario: idUsuario }, { $set: { "esDestacado": true } })
                await new Subscripcion({ idUsuario: idUsuario, fechaInicio: fechaActual, fechaFin: fechaActual.setTime(treintaDiasEnMilisegundos), monto: "$5", estatus: true }).save()
                update = { $set: { "isPremium": true } }
            }
        }
        // no esta suscrito actualmente y no es premium(el estado premium debe solo aprobarse por esta funcion en especifico) 
        //pues se crea una nueva subscripcion para el usuario y se cambia su estado a usuario premium

        // //Esta subscrito pero no esta activa su subscripcion y su usuario no es premium (se procede a una reactivacion)
        // // console.log(filter);
        // // console.log(update)
        // //actualizando usuario
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