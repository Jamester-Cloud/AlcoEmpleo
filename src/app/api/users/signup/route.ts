
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Persona from '@/models/personaModel'
import Empresa from '@/models/empresas'
import Candidato from '@/models/candidato'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Rol from "@/models/userRolModel";
import uploadImage from "@/helpers/upload";
//import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        let logoPicture: any
        const formData = await request.formData()

        console.log(formData);

        // if (formData.get('type') === 'Empresas' && formData.get('logo[]') != 'noLogo') {
        //     logoPicture = formData.get('logo[]') as File
        //     logoPicture = await uploadImage(logoPicture, 'enterprises')
        // }

        let email, password: any, cedula, nombres, apellidos, direccion, genero, telefono, razonSocial, rif, type, estado

        nombres = formData.get('nombres')
        apellidos = formData.get('apellidos')
        cedula = formData.get('cedula')
        email = formData.get('email');
        password = formData.get('password')?.toString()
        direccion = formData.get('direccion')
        genero = formData.get('genero')
        telefono = formData.get('razonSocial')
        rif = formData.get('rif')
        razonSocial = formData.get('razonSocial')
        type = formData.get('type')
        estado = formData.get('estado')

        let idRol: any;
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
        console.log("Persona registrada en la base de datos")
        //then users table
        const newUser = new User({
            email: email,
            password: hashedPassword, fechaIngreso: new Date(),
            idPersona: savedPersona._id,
            idRol: idRol._id
        })

        const savedUser = await newUser.save()

        console.log("Usuario registrado")

        const newEmpresa = new Empresa({ idUsuario: savedUser._id, logo: { path: logoPicture?.path, dataType: logoPicture?.dataType, size: logoPicture?.size } })
        const newCandidato = new Candidato({
            idUsuario: savedUser._id,
            perfil: {},
            idRegion: estado

        })

        //determina la procedencia del usuario
        type === 'Empresas' ? await newEmpresa.save() : await newCandidato.save()

        //todo Se carga el logo (se debe resolver el problema de almacenamiento de imagenes y archivos primero)
        // if (type === 'Empresas') {

        //     let update = {
        //         logo: { path: logoPicture?.path, dataType: logoPicture?.contentType, size: logoPicture?.size }
        //     }

        //     await Empresa.updateOne({ _id: newEmpresa._id }, update)
        // }

        return NextResponse.json({ message: 'User created succesfully', success: true })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}