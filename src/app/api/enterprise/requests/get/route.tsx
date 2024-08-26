
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
        //console.log(idUsuario)
        //necesito reemplazar esto y incluirlo en la consulta principal, formatear los datos como oferta: informacion oferta
        //candidatos : array de candidatos postulados
        //Primero empezamos identificando la empresa
        //luego identificamos las ofertas ligadas a esa empresa
        let empresa = await Empresa.findOne({ idUsuario: idUsuario })

        // let oferta = await OfertaTrabajo.findOne({ idEmpresa: empresa._id })

        // console.log(empresa);
        let postulaciones = await PostulacionesCandidato.aggregate([
            {
                $lookup: {
                    from: "ofertatrabajos",
                    localField: "idOferta",
                    foreignField: "_id",
                    as: "ofertaData"
                }
            },
            {
                $lookup: {
                    from: "candidatoperfils",
                    localField: "idCandidato",
                    foreignField: "_id",
                    as: "candidatoData"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "candidatoData.idUsuario",
                    foreignField: "_id",
                    as: "usuarioData"
                }
            },
            {
                $lookup: {
                    from: "personas",
                    localField: "usuarioData.idPersona",
                    foreignField: "_id",
                    as: "personaData"
                }
            },

            {
                $unwind: {
                    path: "$candidatoData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "ofertaData.idEmpresa": empresa._id
                }
            },
            {
                $group: {
                    _id: "$ofertaData._id",
                    oferta: { $first: "$ofertaData" },
                    candidatos: {
                        $push: {
                            idCandidato: "$candidatoData._id",
                            nombre: "$personaData.nombre",
                            apellido: "$personaData.apellido",
                            cargoDeseado: "$candidatoData.perfil.puestoDeseado"
                        }
                    }
                }
            }
        ])

        console.log("Postulaciones son:", postulaciones);

        //console.log(oferta);
        //console.log(postulaciones);
        return NextResponse.json({ postulaciones: postulaciones }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}