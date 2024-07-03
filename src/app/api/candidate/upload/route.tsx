"use server"
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import Persona from "@/models/personaModel";
import { connect } from "@/dbConfig/dbConfig";
import uploadImage from "@/helpers/uploadImage";

connect();

export async function POST(request: NextRequest) {
    try {
        //hago una estructuracion de los datos que se enviaran 
        //perfil
        //experiencias
        //habilidades
        //Formaciones academicas
        let filter;
        let update;
        let file: any;

        const formData = await request.formData()

        let dataType = formData.get('dataType') as String;

        switch (dataType) {
            //funciona con redes
            case 'datosPersonales':

                const profilePicture = formData.get('profilePicture[]') as File

                filter = { _id: formData.get('idPersona') }

                file = await uploadImage(profilePicture)

                if (file == 'extension de archivo invalida. Rectifique') return NextResponse.json({ error: "Archivo con extension invalida" }, { status: 500 })


                if (file !== 'extension de archivo invalida. Rectifique') {

                    update = {
                        nombre: formData.get('nombre'),
                        apellido: formData.get('apellido'),
                        email: formData.get('email'),
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion'),
                        fotoPerfil: { size: file.size, path: file.path, dataType: file.contentType }
                    }

                    await Persona.updateOne(filter, update)

                    const response = NextResponse.json({
                        message: "Edicion de datos personales exitosa",
                        success: true,
                    })

                    return response;
                }


                break;
            //idiomas funciona con perfil
            case 'perfil':
                console.log(formData);
                let cv = formData.get('cv[]') as File

                file = await uploadImage(cv)

                filter = {
                    idUser: formData.get('idUsuario')
                }

                update = {
                    perfil: {
                        descripcionPersonal: formData.get('descripcionPersonal'),
                        puestoDeseado: formData.get('puestoDeseado'),
                        salario: formData.get('descripcionPersonal'),
                        cv: { size: file.size, path: file.path, dataType: file.contentType }
                    }
                }
                //codigo que maneja las peticiones de idiomas

                await Candidato.updateOne(filter, update);
                break;
            case 'habilidades':

                break;
            case 'exp':

                break;
            case 'academics':

                break;
            case 'idiomas':
                

                break

        }

    } catch (error: any) {
        console.log("error is", error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}