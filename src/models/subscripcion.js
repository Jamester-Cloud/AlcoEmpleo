import mongoose, { Types } from "mongoose";

const subscripcionesSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    fechaInicio:Date,
    fechaFin:Date,
    monto:{
        type:String,
        required: [true, "Por favor Introduzca un monto de la transaccion"],
    },
    estatus:Boolean
})

const Subscripcion = mongoose.models.subscripcion || mongoose.model("subscripcion", subscripcionesSchema)

export default Subscripcion;