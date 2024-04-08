import mongoose from 'mongoose'

const userRolSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, "Ingrese una descripcion corta del rol"],
        unique: true
    },
    rol: {
        type: String,
        required: [true, "Ingrese un rol de usuario"],
        unique: true
    },
    estatus:Boolean
})

const UserRol = mongoose.models.rol || mongoose.model("rol", userRolSchema)

export default UserRol;