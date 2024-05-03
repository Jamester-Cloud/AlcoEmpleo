import mongoose from 'mongoose'

const rolSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: [true, "Por favor introduce un rol para el usuario"],
    },
    descripcion: {
        type: String,
        required: [true, "Por favor introduce una descripcion para el usuario"]
    },
    status:Boolean
})

const Rol = mongoose.models.rol || mongoose.model("rol", rolSchema)

export default Rol;