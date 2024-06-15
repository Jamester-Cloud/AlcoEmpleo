import Region from "@/models/candidato";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect()
export async function GET(request: NextRequest) {


    try {
        const regiones = Region.find();

        const response = NextResponse.json({
            message: "Succesfull login",
            regiones: regiones,
            success: true,
        })
        //console.log("hello world")

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}