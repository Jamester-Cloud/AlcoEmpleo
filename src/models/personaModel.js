import mongoose from 'mongoose'

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor introduce un nombre de usuario"],
        unique: true
    },
    apellido: {
        type: String,
        required: [true, "Por favor introduce un apellido"]
    },
    correoElectronico: {
        type: String,
        required: [true, "Correo electronico requerido"],
        unique: true
    },
    genero:{
        type:String,
        required:[true, "Introduce un genero"],
    },
    cedula:{
        type:String,
        required:[true, "Introduce tu cedula de identidad"],
        unique:true
    },
    direccion:String,
    telefono:String,
    fechaNacimiento: Date,
})

const Persona = mongoose.models.personas || mongoose.model("personas", user, personaSchema)

export default Persona;