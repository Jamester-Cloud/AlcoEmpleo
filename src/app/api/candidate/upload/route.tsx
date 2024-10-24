"use server"
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import Persona from "@/models/personaModel";
import { connect } from "@/dbConfig/dbConfig";
import Documento from "@/models/documentos";

import upload from "@/helpers/upload";


export const POST = async (request: NextRequest) => {
    try {

        let filter;
        let update;
        let file: any;
        let data;

        const formData = request.headers.get('content-type') === 'application/json' ? await request.json() : await request.formData()
        let dataType = request.headers.get('content-type') === 'application/json' ? formData.dataType : formData.get('dataType')
        console.log(dataType)
        switch (dataType) {
            //funciona con redes
            case 'datosPersonales':
                console.log(formData)

                const profilePicture = formData.get('profilePicture') as File || formData.get('profilePicture[]') as File

                let idProfilePic = await upload(profilePicture, "candidateProfilePics", 'Foto de perfil del candidatos');
                console.log("Proceso de guardado de documentos finalizado")

                filter = {
                    idUsuario: formData.get('idUsuario'),
                    bucketName: 'candidateProfilePics'
                }

                update = {
                    $set: {
                        idUsuario: formData.get('idUsuario'),
                        filename: profilePicture.name,
                        idArchivo: idProfilePic,
                        originalname: profilePicture.name,
                        contentType: profilePicture.type,
                        size: profilePicture.size,
                        bucketName: "candidateProfilePics",
                    }
                }

                await Documento.updateOne(filter, update, { upsert: true })

                filter = { _id: formData.get('idPersona') }

                update = {
                    $set: {
                        cedula: formData.get('cedula'),
                        nombre: formData.get('nombre'),
                        apellido: formData.get('apellido'),
                        email: formData.get('email'),
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion')
                    }
                }

                await Persona.updateOne(filter, update)
                break;
            case 'perfil':
                console.log(formData);
                let file = formData.get('perfil[CV]') as File;
                let idCv = await upload(file, "candidateDocuments", 'Curriculum Vitae del candidato');

                // //
                filter = {
                    idUsuario: formData.get('idUsuario'),
                    bucketName: 'candidateDocuments'
                }
                //CV
                update = {
                    $set: {
                        idUsuario: formData.get('idUsuario'),
                        filename: file.name,
                        idArchivo: idCv,
                        originalname: file.name,
                        contentType: file.type,
                        size: file.size,
                        bucketName: "candidateDocuments",
                    }
                }
                //actualizamos el documento
                await Documento.updateOne(filter, update, { upsert: true })
                //Perfil Data
                filter = {
                    idUsuario: formData.get('idUsuario'),
                }

                update = {
                    $set: {
                        "perfil.descripcionPersonal": formData.get('perfil[descripcionPersonal]'),
                        "perfil.puestoDeseado": formData.get('perfil[puestoDeseado]'),
                        "perfil.salarioDeseado": formData.get('perfil[salarioDeseado]'),
                        idRegion: formData.get('idRegion[value]')
                    }
                }
                //codigo que maneja las peticiones de idiomas
                await Candidato.updateOne(filter, update);

                //console.log("Proceso de guardado de documentos finalizado")
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
            case 'idiomas':

                console.log(formData.idiomas);
                data = formData.idiomas
                console.log(data, formData.idUsuario);

                filter = { idUsuario: formData.idUsuario }
                update = { $push: { idiomas: data } }

                await Candidato.updateOne(filter, update);

                break
            case 'redes':
                data = formData.redes
                console.log(data, formData.idUsuario);

                filter = { idUsuario: formData.idUsuario }
                update = { $push: { redes: data } }

                await Candidato.updateOne(filter, update);

                break

            case 'newExp':

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
            case 'newEduc':
                data = formData.formacionesAcademicas

                filter = { idUsuario: formData.idUsuario }
                update = { $push: { formacionesAcademicas: data } }

                await Candidato.updateOne(filter, update);
                break;
            case 'editAcademic':
                filter = { idUsuario: formData.idUsuario, "formacionesAcademicas._id": formData.idAcademic }

                update = {
                    $set: {
                        "formacionesAcademicas.$.titulo": formData.formacionesAcademicas[0].titulo,
                        "formacionesAcademicas.$.institucion": formData.formacionesAcademicas[0].institucion,
                        "formacionesAcademicas.$.duracion": formData.formacionesAcademicas[0].duracion,
                        "formacionesAcademicas.$.tipoFormacion": formData.formacionesAcademicas[0].tipoFormacion,
                    }
                }

                await Candidato.updateOne(filter, update);

                break;
            case 'newSkill':
                console.log(formData);
                data = formData.habilidad

                filter = { idUsuario: formData.idUsuario }
                update = {
                    $push: {
                        habilidad: data
                    }
                }

                await Candidato.updateOne(filter, update)
                break;
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