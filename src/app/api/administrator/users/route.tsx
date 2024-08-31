import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
connect()

export async function POST(request: NextRequest) {

    const reqJson = await request.json()


    const session = await User.startSession();

    let { idUsuario, requestType } = reqJson;

    console.log(reqJson);

    let update;
    let filter;

    try {
        //session.startTransaction()
        filter = { _id: idUsuario };

        update = { $set: { estatus: requestType ? true : false } }
        await User.updateOne(filter, update);

        const response = NextResponse.json({
            message: "Succesfull data update",
            success: true,
        })

        // await session.commitTransaction();
        // session.endSession();

        return response;

    } catch (error: any) {
        session.abortTransaction()
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}