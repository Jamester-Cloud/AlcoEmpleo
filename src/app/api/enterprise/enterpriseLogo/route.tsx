import { NextRequest, NextResponse } from "next/server";
import Documento from "@/models/documentos";
import imageVisor from "@/helpers/imageVisor";

export async function GET(request: NextRequest) {
    let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")
    console.log(idArchivo)
    let docInfo = await Documento.findOne({ idArchivo: idArchivo })
    let downloadStream = await imageVisor(idArchivo, 'enterprisesBucket')
    try {

        return new NextResponse(downloadStream, {
            headers: { "Content-Type": `${docInfo.contentType}` },
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;