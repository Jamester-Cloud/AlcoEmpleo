import { connect } from "@/dbConfig/dbConfig";
import HomePage from '@/models/homepageModel'
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()


export async function POST(request: NextRequest) {

    try {
        let filter;
        let update;

        const reqJson = await request.json()
        console.log(reqJson);

        let { data: { banner, direccion, sliders, secciones, celular, politicaPrivacidad } } = reqJson;

        filter = { _id: Types.ObjectId.createFromHexString('66a576701d7bc081933b2758'), idUsuarioAdministrador: Types.ObjectId.createFromHexString("669fbe254ee5de405072dfcd") }

        update = {
            $set: {
                "banner": banner,
                "direccion": direccion,
                "sliders": sliders,
                "secciones": secciones,
                "celular": celular,
                "politicaPrivacidad": politicaPrivacidad,
            }
        };
        //planeo hacer el paginado aca
        await HomePage.updateOne(filter, update)

        const response = NextResponse.json({
            message: "Succesfull data update",
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}