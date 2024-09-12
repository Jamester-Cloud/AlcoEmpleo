"use server"
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import User from "@/models/userModel";
import PostulacionesCandidato from "@/models/postulacionesCandidato";
import Empresa from "@/models/empresas";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    const session = await User.startSession();

    try {
        // debo eliminar el usuario , junto con sus solicitudes, perfiles de candidato
        const formData = await request.json()

        let { idUsuario } = formData.dataType

        //primero buscamos un candidato
        let candidato = await Candidato.findOne({ idUsuario: idUsuario })
        let empresa = await Empresa.findOne({ idUsuario: idUsuario })
        //si no esta
        if (!candidato) console.log("el usuario no tiene registro como candidatos")
        if (!empresa) console.log("La empresa no tiene registro como usuario")
        //eliminamos solicitudes
        //candidato
        let postulaciones = await PostulacionesCandidato.find({ idCandidato: candidato._id })

        if (!postulaciones) console.log("El usuario/candidato no tiene postulaciones activas..")
        else await PostulacionesCandidato.deleteMany({ idCandidato: candidato._id }).session(session)

        ///////empresa
        //ofertas anexadas
        let ofertas = await OfertaTrabajo.find({ idEmpresa: empresa._id })

        if (!ofertas) console.log("La empresa no tiene ofertas de trabajo")
        else await OfertaTrabajo.deleteMany({ idEmpresa: empresa._id }).session(session)

        //eliminamos candidato o empresa
        if (candidato) await Candidato.deleteOne({ idUsuario: idUsuario }).session(session)
        if (empresa) await Empresa.deleteOne({ idUsuario: idUsuario }).session(session)

        // finalmente se elimina el usuario si este se encuentra
        let usuario = await User.findOne({ _id: idUsuario })

        if (usuario) await User.deleteOne({ _id: idUsuario }).session(session)
            
        if (!usuario) return NextResponse.json({
            message: "Eliminacion de de datos erronea: No existe el usuario",
            success: false,
        }, { status: 500 })


        const response = NextResponse.json({
            message: "Eliminacion de de datos exitosa",
            success: true,
        })

        //commit a la transaccion si todo fue bien
        await session.commitTransaction();
        session.endSession();

        return response;

    } catch (error: any) {
        console.log("error is", error)
        session.abortTransaction()
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}