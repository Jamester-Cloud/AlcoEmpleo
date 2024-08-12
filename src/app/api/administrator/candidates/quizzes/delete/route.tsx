import { connect } from "@/dbConfig/dbConfig";
import Cuestionario from "@/models/cuestionarios";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function POST(request: NextRequest) {
    let reqJson = await request.json()
    let { idQuiz } = reqJson

    try {
        await Cuestionario.findByIdAndDelete({_id:idQuiz})
        const response = NextResponse.json({
            message: 'Record deleted',
        })

        return response;
    } catch (error) {
        console.log(error);
    }
}