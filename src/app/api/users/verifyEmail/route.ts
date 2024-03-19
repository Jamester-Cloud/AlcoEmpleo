import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        /// user not found
        if (!user) {
            return NextResponse.json({ error: "Invalid token, user not found with this token" }, { status: 400 })
        }
        
        //We update the user info
        user.isVerified= true
        user.verifyToken= undefined
        user.verifyTokenExpiry= undefined
        user.save()
        

        return NextResponse.json({message:"Email verify is success"}, {status:200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

