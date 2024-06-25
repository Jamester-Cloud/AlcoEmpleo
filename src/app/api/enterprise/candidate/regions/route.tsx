import Region from "@/models/regiones";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect()
export async function GET(request: NextRequest) {


    try {
        const regiones: any = await Region.find({});

        let data: any = [];
        
        regiones.map((item: any) => {
            data.push({ label: item.estado, value: item._id })
        })

        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            regiones: data,
            success: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}