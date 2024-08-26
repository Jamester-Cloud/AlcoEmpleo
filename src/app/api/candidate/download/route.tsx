import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose, { Types } from "mongoose";
import fs from 'fs'

export async function GET(request: NextRequest) {
    let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
    const mongodbUrl: any = process.env.MONGO_URI

    await mongoose.connect(mongodbUrl)
    try {
        console.log(idArchivo)


        let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'candidateDocuments' })

        let archivo = await gfs.find({ _id: Types.ObjectId.createFromHexString(idArchivo) }).toArray()

        //let downloadStream = gfs.openDownloadStreamByName(archivo[0].filename).pipe(fs.createWriteStream(`${archivo[0].filename}`))
        let downloadStream: any = gfs.openDownloadStream(Types.ObjectId.createFromHexString(idArchivo))

        return new NextResponse(downloadStream, {
            headers: { "Content-Type": 'application/pdf', 'Content-Disposition': `attachment; filename="${archivo[0].filename}"` },
        });


        //return NextResponse.json({ file: downloadStream }, { status: 200 })//res.body(downloadStream)
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}