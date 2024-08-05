import { connect } from "@/dbConfig/dbConfig";
import HomePage from '@/models/homepageModel'
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    try {
         //planeo hacer el paginado aca
        const homePage = await HomePage.find()
        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            homePage:homePage
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}