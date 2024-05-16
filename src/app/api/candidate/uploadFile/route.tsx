import multer from 'multer'
import { NextRequest, NextResponse } from "next/server";
import Candidato from '@/models/candidato';
import { connect } from "@/dbConfig/dbConfig";
import fs from 'fs'
import path from 'path'
connect();

export async function POST(request: NextRequest) {
    try {
        const reqJson = await request.json()
        console.log(reqJson)
        // let {id, profile, cv, data} = reqJson

        // let storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, 'uploads')
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, file.fieldname + '-' + Date.now())
        //     }
        // });


        // let upload = multer({ storage: storage });

        // upload.single('image')

        // let img = {
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/candidate/profilesPictures' + reqJson.profile.filename)),
        //     contentType: 'image/png'
        // }
        // let candidateCv = {
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/candidate/cv' + reqJson.cv.filename)),
        //     contentType: 'image/png'
        // }
        // //Consultando al candidato
        // let candidato = Candidato.findById(id);

        const response = NextResponse.json({
            message: "Succesfull data retrieving",
            success: true,
        })

        return response;

    } catch (error:any) {
        console.log(error)
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }

    //Aca debo actualizar la info del candidato con la imagen y el CV
}