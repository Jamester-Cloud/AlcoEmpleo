import mongoose, { Types } from "mongoose";

const empresaSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    logo: {
        data: Buffer,
        contentType: String
    },
    actaConstitutiva: {
        data: Buffer,
        contentType: String
    }
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;