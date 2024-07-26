import { connect } from "@/dbConfig/dbConfig";
import HomePage from '@/models/homepageModel'
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    try {
        let filter;
        let update;

        const reqJson = await request.json()
        
        let {data} = reqJson;
        //planeo hacer el paginado aca
        const homePage = await HomePage.updateOne()

        const response = NextResponse.json({
            message: "Succesfull data retrieve",
            homePage: homePage
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}