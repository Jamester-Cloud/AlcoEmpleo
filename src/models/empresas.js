import mongoose, { Types } from "mongoose";

const empresaSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;