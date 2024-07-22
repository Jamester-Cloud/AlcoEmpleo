"use server"
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {

        let filter;
        let update;
        let data;

        const formData = await request.json()

        let dataType = formData.dataType

        switch (dataType) {

            case 'idioma':

                data = formData.data

                filter = { idUsuario: formData.idUsuario }
                update = { $set: { idiomas: data } }

                await Candidato.updateOne(filter, update);

                break

            case 'habilidad':
                
                data = formData.data

                filter = { idUsuario: formData.idUsuario }
                update = {
                    $set: {
                        habilidad: data
                    }
                }

                await Candidato.updateOne(filter, update)
                break;

            case 'redes':

                data = formData.data

                filter = { idUsuario: formData.idUsuario }
                update = {
                    $set: {
                        redes: data
                    }
                }

                await Candidato.updateOne(filter, update)
                break;

            case 'exp':
                console.log(formData)
                filter = { idUsuario: formData.idUsuario }
                update =
                {
                    $pull: {
                        experiencias: { _id: formData.id }
                    }
                }

                await Candidato.updateOne(filter, update);
                break
            case 'academics':

                filter = { idUsuario: formData.idUsuario }
                update =
                {
                    $pull: {
                        formacionesAcademicas: { _id: formData.id }
                    }
                }

                await Candidato.updateOne(filter, update);
                break

        }

        const response = NextResponse.json({
            message: "Edicion de datos exitosa",
            success: true,
        })

        return response;

    } catch (error: any) {
        console.log("error is", error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}