import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Rol from "@/models/userRolModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(typeof (email));

        //check if user exists
        const user = await User.findOne({ email })


        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");
        console.log(user.isAdmin);
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        const rol = user.isAdmin ? 'admin' : await Rol.findOne({ _id: user.idRol })
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            idPersona: user.idPersona,
            rol: rol == 'admin' ? rol : rol.rol
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            idPersona: user.idPersona,
            idUsuario: user._id,
            userRol: rol == 'admin' ? rol : rol.rol
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error + " and error is:" + error.message }, { status: 500 })
    }
}