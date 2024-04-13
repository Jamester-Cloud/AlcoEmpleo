import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Rol from "@/models/userRolModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {

        //all candidates wihtout premium
        

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}