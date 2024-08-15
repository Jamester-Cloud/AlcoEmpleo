import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose, { Types } from "mongoose";
import Documento from "@/models/documentos";
import fs from 'fs'

export async function GET(request: NextRequest) {
    try {
        const chunks: any = [];
        let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
        let docInfo = await Documento.findOne({ idArchivo: idArchivo })

        console.log(docInfo)
        const mongodbUrl: any = process.env.MONGO_URI

        await mongoose.connect(mongodbUrl)

        let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'candidateProfilePics' })

        let archivo = await gfs.find({ _id: Types.ObjectId.createFromHexString(idArchivo) }).toArray()

        //let downloadStream = gfs.openDownloadStreamByName(archivo[0].filename).pipe(fs.createWriteStream(`${archivo[0].filename}`))
        let downloadStream: any = gfs.openDownloadStream(Types.ObjectId.createFromHexString(idArchivo))

        return new NextResponse(downloadStream, {
            headers: { "Content-Type": `${docInfo.contentType}` },
        });


        //return NextResponse.json({ file: downloadStream }, { status: 200 })//res.body(downloadStream)
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}