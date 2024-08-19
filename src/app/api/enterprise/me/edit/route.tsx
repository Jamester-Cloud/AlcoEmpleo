import { NextRequest, NextResponse } from "next/server";
import Documento from "@/models/documentos";
import Persona from "@/models/personaModel";
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
        //primero persona, luego documentos si existen
        console.log(formData);
        let logo = formData.get('logo[]') as File
        let acta = formData.get('actaConstitutiva[]') as File
        //acta
        idDocumento = await upload(acta, 'enterprisesLegalDocumentsBucket', 'Acta constitutiva')
        //logo
        idLogo = await upload(logo, 'enterprisesBucket', 'Logo de la empresa')
        //actualizando documento acta
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
        //actualizando Logo
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

        //Actualizando datos de persona
        filter = { _id: formData.get('idPersona') }
        console.log(filter)
        update = {
            nombre: formData.get('razonSocial'),
            apellido: formData.get('razonSocial'),
            cedula: formData.get('riff'),
            telefono: formData.get('telefono'),
            direccion: formData.get('direccionFiscal'),
        }
        await Persona.updateOne(filter, update);

        return NextResponse.json({ message: 'Succesfull request' });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}