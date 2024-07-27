import { connect } from "@/dbConfig/dbConfig";
import HomePage from '@/models/homepageModel'
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {

    try {
        let filter;
        let update;

        const reqJson = await request.json()

        let { data: { banners, direccion, sliders, secciones, telefonos, politicaPrivacidad, idUsuario } } = reqJson;

        filter = { idUsuarioAdministrador: idUsuario }

        update = {
            $set: {
                "banner": banners,
                "direccion": direccion,
                "sliders": sliders,
                "secciones": secciones,
                "celular": telefonos,
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