import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose, { Types } from "mongoose";
import Documento from "@/models/documentos";
import fs from 'fs'

export async function GET(request: NextRequest) {
    let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
    try {


        let docInfo = await Documento.findOne({ idArchivo: idArchivo })

        const mongodbUrl: any = process.env.MONGO_URI

        await mongoose.connect(mongodbUrl)

        let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'candidateProfilePics' })

        let downloadStream: any = gfs.openDownloadStream(Types.ObjectId.createFromHexString(idArchivo))

        return new NextResponse(downloadStream, {
            headers: { "Content-Type": `${docInfo.contentType}` },
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}