import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import { sendEmail } from "@/helpers/mailer";
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email)
        const user = await User.findOne({ email: email})
        /// user not found
        if (!user) {
            return NextResponse.json({ error: "Message for email" }, { status: 400 })
        }
        const userInfo = {
            email:user.email,
            emailType:'RESET',
            userId:user._id
        }

        await sendEmail(userInfo);
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
export const dynamic = 'force-dynamic';
export const revalidate = 0;
