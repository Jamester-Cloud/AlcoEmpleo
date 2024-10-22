import { NextRequest, NextResponse } from "next/server";
import Documento from "@/models/documentos";
import Persona from "@/models/personaModel";
import User from "@/models/userModel";
import upload from "@/helpers/upload";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        let idDocumento;
        let idLogo;
        let update;
        let filter;

        console.log(formData);
        switch (formData.get('dataType')) {
            case 'Acta':

                let acta = formData.get('acta') as File
                //acta
                idDocumento = await upload(acta, 'enterprisesLegalDocumentsBucket', 'Acta constitutiva')
                // //actualizando documento acta
                filter = { idUsuario: formData.get('idUsuario'), bucketName: 'enterprisesLegalDocumentsBucket' }

                update = {
                    $set: {
                        idUsuario: formData.get('idUsuario'),
                        filename: acta.name,
                        idArchivo: idDocumento,
                        originalname: acta.name,
                        contentType: acta.type,
                        size: acta.size,
                        bucketName: "enterprisesLegalDocumentsBucket",
                    }
                }

                await Documento.updateOne(filter, update, { upsert: true })
                break;

            case 'Logo':
                let logo = formData.get('logo') as File

                console.log(logo);

                idLogo = await upload(logo, 'enterprisesBucket', 'Logo de la empresa')

                filter = { idUsuario: formData.get('idUsuario'), bucketName: 'enterprisesBucket' }

                update = {
                    $set: {
                        idUsuario: formData.get('idUsuario'),
                        filename: logo.name,
                        idArchivo: idLogo,
                        originalname: logo.name,
                        contentType: logo.type,
                        size: logo.size,
                        bucketName: "enterprisesBucket",
                    }
                }

                await Documento.updateOne(filter, update, { upsert: true })

                break;


            case 'Personas':

                filter = { _id: formData.get('data[idPersona]') }

                update = {
                    nombre: formData.get('data[razonSocial]'),
                    apellido: formData.get('data[razonSocial]'),
                    cedula: formData.get('data[riff]'),
                    telefono: formData.get('data[telefono]'),
                    direccion: formData.get('data[direccionFiscal]'),
                }


                await Persona.updateOne(filter, update);

                update = {
                    email : formData.get('data[email]')
                }

                await User.updateOne(filter, update)

                break;

        }

        // //Actualizando datos de persona


        return NextResponse.json({ message: 'Succesfull request' });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}