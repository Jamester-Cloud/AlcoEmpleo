import mongoose from 'mongoose'

const perfilSchme= new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, " un nombre de usuario"],
        unique: true
    },
})