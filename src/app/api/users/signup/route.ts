
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Persona from '@/models/personaModel'
import UserRol from '@/models/userRolModel'
import Empresa from '@/models/empresas'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
//import { sendEmail } from "@/helpers/mailer";

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
            telefono,
            razonSocial,
            rif,
            type
        } = reqBody
        console.log(reqBody)
        console.log(razonSocial)
        let userType: any
        //Check if user already exists
        const userEmail = await User.findOne({ email: email })
        const persona = await Persona.findOne({ cedula: type === 'Empresas' ? rif : cedula })
        //Checking the userType

        if (type === 'Empresas') userType = await UserRol.findOne({ rol: "Empresa" })

        if (type === 'Candidatos') userType = await UserRol.findOne({ rol: "Candidato" })

        //Validations
        if (userEmail) return NextResponse.json({ error: "Email duplicado en la base de datos" }, { status: 400 })

        if (persona) return NextResponse.json({ error: "cedula/rif duplicado en la base de datos" }, { status: 400 })
        //hash passwords
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        //storing abstract table first
        const newPersona = new Persona({
            nombre: type === 'Candidatos' ? nombres : razonSocial,
            apellido: type === 'Candidatos' ? apellidos : razonSocial,
            genero: genero,
            cedula: type === 'Empresas' ? rif : cedula,
            direccion: direccion,
            telefono: telefono
        })

        const savedPersona = await newPersona.save()
        //then users table
        const newUser = new User({ email: email, password: hashedPassword, fechaIngreso: new Date(), idPersona: savedPersona._id, idRol: type === 'Candidatos' ? '660f1b3850acc4e6daa6892f' : '660f191afb05f2fdf4eafeb4' })

        const savedUser = await newUser.save()

        const newEmpresa = new Empresa({ idUsuario: savedUser._id })
        
        await newEmpresa.save()
        //send the confirmation email
       // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({ message: 'User created succesfully', success: true, savedUser })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}