import { NextRequest, NextResponse } from "next/server";
import Documento from "@/models/documentos";
import imageVisor from "@/helpers/imageVisor";

export async function GET(request: NextRequest) {
    let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
    let docInfo = await Documento.findOne({ idArchivo: idArchivo })
    
    let viewerStream = await imageVisor(idArchivo, 'enterprisesLegalDocumentsBucket')
    try {

        return new NextResponse(viewerStream, {
            headers: { "Content-Type": `${docInfo.contentType}` },
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}