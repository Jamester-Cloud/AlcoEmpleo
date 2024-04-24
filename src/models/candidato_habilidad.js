import mongoose, { Types } from "mongoose";

const candidatoHabilidadSchema = new mongoose.Schema({
  idHabilidad: Types.ObjectId,
  idCandidato: Types.ObjectId,
}); 

const Candidato_Habilidad = mongoose.models.candidato_habilidades || mongoose.model("candidato_habilidades", candidatoHabilidadSchema);

export default Candidato_Habilidad;
