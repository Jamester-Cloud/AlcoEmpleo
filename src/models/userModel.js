import mongoose, { Types } from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Por favor introduce un correo electronico"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Por favor introduce una contraseña"],
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    idPersona: {
        type: Types.ObjectId,
        required: [true, "IdPersona requerido para relacionar"]
    },
    idRol: {
        type: Types.ObjectId,
        required: [true, "IdRol requerido para relacionar al usuario con un rol especifico"]
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    fechaIngreso: Date,
    estatus: { type: Boolean, default: true }

})


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;