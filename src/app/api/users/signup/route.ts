import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Persona from '@/models/personaModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {
            email,
            password,
            cedula,
            nombres,
            apellidos,
            direccion,
            genero,
            telefono
        } = reqBody
        //Check if user already exists
        const persona = await Persona.findOne({ email })

        if (persona) return NextResponse.json({ error: "User already exists" }, { status: 400 })
        //hash passwords
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        //storing abstract table first
        const newPersona = new Persona({nombres:nombres, apellidos:apellidos, email:email, genero:genero, cedula:cedula, direccion:direccion, telefono:telefono})

        const savedPersona = await newPersona.save()
        //then users table
        const newUser = new User({password: hashedPassword, fechaIngreso: new Date(), idPersona:savedPersona._id})
        
        const savedUser = await newUser.save()
        //send the confirmation email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: 'User created succesfully', success: true, savedUser })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}