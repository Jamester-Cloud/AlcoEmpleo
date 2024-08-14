import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect()
import mongoose from "mongoose";
let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
//si pruebo que es el llamado a cookies aca, podria refactorizar esta peticion
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()

        let { idPersona, idUsuario } = reqBody

        // return NextResponse.json({
        //     message: 'Candidate found',
        //     dataPersona: persona,
        //     success: true
        // });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}