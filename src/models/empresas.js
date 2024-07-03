import mongoose, { Types } from "mongoose";

const empresaSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    logo: {
        size:{type:Number},
        dataType:{type:String},
        path:{type:String}
    },
    actaConstitutiva: {
        size:{type:Number},
        dataType:{type:String},
        path:{type:String}
    }
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;