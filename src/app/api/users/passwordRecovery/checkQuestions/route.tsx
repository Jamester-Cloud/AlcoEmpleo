import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
connect()
// this route works for updating the user password
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, preguntas } = reqBody
        console.log(email)
        const user = await User.findOne({ email: email})
        
        

        return NextResponse.json({message:"Preguntas correctas"}, {status:200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;
