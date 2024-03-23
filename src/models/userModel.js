import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Por favor introduce un correo electronico"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Por favor introduce una contraseña"],
        unique: true
    },
  
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    idPersona:{
        type:String,
        required:[true, "IdPersona requerido para relacionar"]
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpire:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
    fechaIngreso:Date
    
})


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;