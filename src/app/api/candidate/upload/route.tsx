"use server"
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import Persona from "@/models/personaModel";
import { connect } from "@/dbConfig/dbConfig";
import uploadImage from "@/helpers/uploadImage";
import { Console } from "console";

connect();

export async function POST(request: NextRequest) {
    try {

        let filter;
        let update;
        let file: any;
        let data;

        const formData = request.headers.get('content-type') === 'application/json' ? await request.json() : await request.formData()

        let dataType = request.headers.get('content-type') === 'application/json' ? formData.dataType : formData.get('dataType')

        switch (dataType) {
            //funciona con redes
            case 'Datos personales':

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

                }


                break;
            //idiomas funciona con perfil
            case 'perfil':
                console.log(formData);
                let cv = formData.get('perfil[CV]') as File

                file = await uploadImage(cv)

                filter = {
                    idUser: formData.get('idUsuario')
                }

                update = {
                    perfil: {
                        descripcionPersonal: formData.get('perfil[descripcionPersonal]'),
                        puestoDeseado: formData.get('perfil[puestoDeseado]'),
                        salario: formData.get('perfil[salarioDeseado]'),
                        cv: { size: file.size, path: file.path, dataType: file.contentType }
                    }
                }
                //codigo que maneja las peticiones de idiomas

                await Candidato.updateOne(filter, update);

                break;
            case 'habilidades':

                break;
            case 'exp':

                filter = { idUsuario: formData.idUsuario, "experiencias._id": formData.idExp }

                update = {
                    $set: {
                        "experiencias.$.nombreEmpresa": formData.nombreEmpresa,
                        "experiencias.$.descripcion": formData.descripcion,
                        "experiencias.$.duracion": formData.duracion,
                        "experiencias.$.logros": formData.logros,
                        "experiencias.$.referencias": formData.referencias,
                    }
                }

                await Candidato.updateOne(filter, update);

                break
            case 'academics':

                break
            case 'idiomas':
                console.log("Entre a editar idiomas")
                data = formData.idiomas
                console.log(data);
                filter = { idUsuario: formData.idUsuario }
                update = { $push: { idiomas: data } }

                await Candidato.updateOne(filter, update);

                break
            case 'expnew':

                data = {
                    nombreEmpresa: formData.nombreEmpresa,
                    descripcion: formData.descripcion,
                    duracion: formData.duracion,
                    logros: formData.logros,
                    referencias: formData.referencias
                }

                filter = { idUsuario: formData.idUsuario }
                update = { $push: { experiencias: data } }

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