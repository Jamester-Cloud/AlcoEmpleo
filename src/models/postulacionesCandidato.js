import mongoose, { Types } from "mongoose";

const postulacionesCandidatoSchema = new mongoose.Schema({
    idCandidato: Types.ObjectId,
    idOferta: Types.ObjectId,
    fechaPostulacion:Date,
})

const PostulacionesCandidato = mongoose.models.postulacionesCandidato || mongoose.model("postulacionesCandidato", postulacionesCandidatoSchema)

export default PostulacionesCandidato;