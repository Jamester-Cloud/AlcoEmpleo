
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Persona from '@/models/personaModel'
import Empresa from '@/models/empresas'
import Candidato from '@/models/candidato'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Rol from "@/models/userRolModel";
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
        let idRol:any;
        //Check if user already exists
        const userEmail = await User.findOne({ email: email })
        const persona = await Persona.findOne({ cedula: type === 'Empresas' ? rif : cedula })
        //Checking the userType
        if (type === 'Empresas') idRol = await Rol.findOne({ rol: type })
        if (type === 'Candidatos') idRol = await Rol.findOne({ rol: type })
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
        const newUser = new User({
            email: email,
            password: hashedPassword, fechaIngreso: new Date(),
            idPersona: savedPersona._id,
            idRol: idRol._id
        })

        const savedUser = await newUser.save()

        const newEmpresa = new Empresa({ idUsuario: savedUser._id })
        const newCandidato = new Candidato({ idUsuario: savedUser._id })
        //determina la procedencia del usuario
        type === 'Empresas' ? await newEmpresa.save() : newCandidato.save()

        return NextResponse.json({ message: 'User created succesfully', success: true, savedUser })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}