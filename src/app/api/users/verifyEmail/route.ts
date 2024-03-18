import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        const user:any = User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        /// user not found
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(user);
        user.isVerified= true
        user.verifyToken= undefined
        user.verifyTokenExpiry= undefined
        await user.save();

        return NextResponse.json({message:"Email verify is success"}, {status:200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

