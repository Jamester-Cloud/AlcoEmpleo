import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import PostulacionesCandidato from '@/models/postulacionesCandidato';
import { connect } from "@/dbConfig/dbConfig";
import OfertaTrabajo from "@/models/ofertaTrabajo";
import Empresa from "@/models/empresas";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqJson = await request.json()
        let { idUsuario } = reqJson;

        let empresa = await Empresa.findOne({ idUsuario: idUsuario })
        let oferta = await OfertaTrabajo.findOne({ idEmpresa: empresa._id })

        let postulaciones = await PostulacionesCandidato.aggregate([
            { $match: { $expr: { $eq: ['$_id', { $toObjectId: oferta._id }] } } },
            {
                $lookup: {
                    from: "candidatoperfils",
                    localField: "idCandidato",
                    foreignField: "_id",
                    as: "candidatoData"
                },
            },
            {
                $unwind: "$candidatoData"
            },
            {
                $project: {
                    candidatoData: "$candidatoData",
                    cuestionario: "$$ROOT",
                }
            },

        ]).sort({ idOferta: 1 })

        console.log(oferta);
        console.log(postulaciones);
        //const userData = getDataFromToken(request);
        return NextResponse.json({ postulaciones: postulaciones }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}