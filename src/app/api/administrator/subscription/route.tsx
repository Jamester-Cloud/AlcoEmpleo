import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Subscripcion from '@/models/subscripcion'
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    const reqJson = await request.json()

    const treintaDiasEnMilisegundos = 30 * 24 * 60 * 60 * 1000;

    const fechaActual = new Date();
    //
    const session = await User.startSession();

    let { idUsuario, isPremium } = reqJson;

    let update;
    let filter;

    try {
        session.startTransaction()

        filter = { idUsuario: idUsuario }
        // primero debo verificar si ya tiene subscripcion y si no, creo una 
        let isSubscribed: any = Subscripcion.findOne({ idUsuario: idUsuario }).session(session)
        // no esta suscrito actualmente y no es premium(el estado premium debe solo aprobarse por esta funcion en especifico) 
        //pues se crea una nueva subscripcion para el usuario y se cambia su estado a usuario premium
        if (!isSubscribed && !isPremium) {
            console.log("Creando subscripcion")
            await new Subscripcion({ idUsuario: idUsuario, fechaInicio: fechaActual, fechaFin: fechaActual.setTime(treintaDiasEnMilisegundos), monto: "$5", estatus: true }).save()
            update = { isPremium: true }
            
        }
        //Esta subscrito y esta activo y su usuario ya es premium (entonces se procede a una revocacion)
        if (isSubscribed && isSubscribed?.estatus && isPremium) {
            console.log("Revocando subscripcion")
            await Subscripcion.updateOne(filter, { estatus: true }).session(session)
            update = { isPremium: false }
        }

        //Esta subscrito pero no esta activa su subscripcion y su usuario no es premium (se procede a una reactivacion)
        if (isSubscribed && !isSubscribed.estatus && !isPremium) {
            console.log("Reactivando subscripcion")
            await Subscripcion.updateOne(filter, { estatus: true }).session(session)
            update = { isPremium: true }
        }

        User.updateOne(filter, update).session(session);

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