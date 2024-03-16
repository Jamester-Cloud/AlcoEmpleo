import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);
        const user = await User.findOne({ email })

        if (!user) return NextResponse.json({ error: "user does not exist" })

        // check if correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) return NextResponse.json({ error: "Invalid password" }, { status: 400 })

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"2h"})

        const response = NextResponse.json({message:'Login successful', success:true})

        response.cookies.set("token", token, {
            httpOnly:true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}