import { NextRequest, NextResponse } from "next/server";
import downloader from "@/helpers/downloader";

export async function GET(request: NextRequest) {
    try {

        let idArchivo: any = request.nextUrl.searchParams.get("idArchivo")

        let archive: any = await downloader(idArchivo, 'enterprisesLegalDocumentsBucket')

        return new NextResponse(archive.downloadStream, {
            headers: { "Content-Type": 'application/pdf', 'Content-Disposition': `attachment; filename="${archive.fileName}"` },
        });
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}