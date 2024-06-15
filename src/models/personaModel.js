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
    genero: {
        type: String,
    },
    cedula: {
        type: String,
        required: [true, "Introduce tu cedula de identidad"],
        unique: true
    },
    fotoPerfil: {
        size:{type:Number},
        dataType:{type:String},
        path:{type:String}
    },
    direccion: String,
    telefono: Number,
    fechaNacimiento: Date,
})

const Persona = mongoose.models.personas || mongoose.model("personas", personaSchema)

export default Persona;