import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import mongoose, { Types } from "mongoose";
import Documento from "@/models/documentos";
import fs from 'fs'
import imageVisor from "@/helpers/imageVisor";

export async function GET(request: NextRequest) {
    try {

        let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
        let docInfo = await Documento.findOne({ idArchivo: idArchivo })

        let downloadStream = await imageVisor(idArchivo, 'enterprisesBucket')

        return new NextResponse(downloadStream, {
            headers: { "Content-Type": `${docInfo.contentType}` },
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}