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
    genero:{
        type:String,
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

const Persona = mongoose.models.personas || mongoose.model("personas", personaSchema)

export default Persona;