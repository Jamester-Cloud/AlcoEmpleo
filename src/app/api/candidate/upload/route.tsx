"use server"
import formidable from "formidable";
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

        const formData = await request.formData()
        let dataType = formData.get('dataType') as String;

        switch (dataType) {
            case 'personales':
                const profilePicture = formData.get('profilePicture[]') as File
                const filter = { _id: formData.get('_id')}
                const update = {
                    nombre: formData.get('nombre'),
                    apellido: formData.get('apellido'),
                    email: formData.get('email'),
                    telefono: formData.get('telefono'),
                    direccion: formData.get('direccion')
                }
                await uploadImage(profilePicture);
                break;
            case 'perfil':

                break;
            case 'habilidades':

                break;
            case 'experiencias':

                break;
        }

        const response = NextResponse.json({
            message: "Succesfull data retrieving",
            success: true,
        })

        return response;

    } catch (error: any) {
        console.log("error is", error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}