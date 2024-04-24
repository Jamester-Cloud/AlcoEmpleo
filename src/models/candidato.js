import mongoose, {Types} from "mongoose";

const candidatoSchema = new mongoose.Schema({
    idUsuario:Types.ObjectId,
    cargoActual:String,
    esDestacado:Boolean,
})

const Candidato = mongoose.models.candidato || mongoose.model("candidato", candidatoSchema)

export default Candidato