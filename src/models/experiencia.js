import mongoose from 'mongoose'

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor introduce un nombre de usuario"],
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
    logro:Array,
    direccion:String,
    telefono:Number,
    fechaNacimiento: Date,
})
//Logros va como array
//Referencia
const Persona = mongoose.models.personas || mongoose.model("personas", personaSchema)

export default Persona;