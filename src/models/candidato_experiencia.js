import mongoose, {Types} from "mongoose";

const candidatoExperienciaSchema = new mongoose.Schema({
    idExperiencia:Types.ObjectId,
    idCandidato:Types.ObjectId,
    // logo: {
    //     file: { type: Buffer, required: true },
    //     filename: { type: String, required: true },
    //     ext: { type: String, required: true }
    // },
    // actaConstitutiva: {
    //     type: String,
    //     required: [true, "Acta necesaria para el registro"],
    //     unique: true
    // }
})

const Candidato_Experiencia = mongoose.models.candidato_experiencia || mongoose.model("candidato_experiencia", candidatoExperienciaSchema)

export default Candidato_Experiencia;