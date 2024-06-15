import mongoose, { Types } from "mongoose";

const postulacionesCandidato= new mongoose.Schema({
    idCandidato: Types.ObjectId,
    idOferta: Types.ObjectId,
    fechaPostulacion:Date,
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;