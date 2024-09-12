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
    try {

        // debo eliminar el usuario , junto con sus solicitudes, perfiles de candidato
        const formData = await request.json()
        let { idUsuario } = formData
        // //primero buscamos un candidato
        let candidato = await Candidato.findOne({ idUsuario: idUsuario })
        let empresa = await Empresa.findOne({ idUsuario: idUsuario })
        //si no esta
        if (!candidato) console.log("el usuario no tiene registro como candidatos")
        if (!empresa) console.log("La empresa no tiene registro como usuario")

        //eliminamos candidato o empresa
        if (candidato) {
            console.log("Buscando postulaciones");
            let postulaciones = await PostulacionesCandidato.find({ idCandidato: candidato._id })
            //
            console.log("Eliminando postulaciones");
            if (!postulaciones) console.log("El usuario/candidato no tiene postulaciones activas..")
            else await PostulacionesCandidato.deleteMany({ idCandidato: candidato._id })

            await Candidato.deleteOne({ idUsuario: idUsuario })
        }

        if (empresa) {
            let ofertas = await OfertaTrabajo.find({ idEmpresa: empresa._id })
            if (!ofertas) console.log("La empresa no tiene ofertas de trabajo")
            else await OfertaTrabajo.deleteMany({ idEmpresa: empresa._id })
            await Empresa.deleteOne({ idUsuario: idUsuario })
        }
        // finalmente se elimina el usuario si este se encuentra
        let usuario = await User.findOne({ _id: idUsuario })

        if (usuario) await User.deleteOne({ _id: idUsuario })

        if (!usuario) return NextResponse.json({
            message: "Eliminacion de de datos erronea: No existe el usuario",
            success: false,
        }, { status: 500 })


        const response = NextResponse.json({
            message: "Eliminacion de de datos exitosa",
            success: true,
        })

        // //commit a la transaccion si todo fue bien
        // await session.commitTransaction();
        // session.endSession();

        return response;

    } catch (error: any) {
        console.log("error is", error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}