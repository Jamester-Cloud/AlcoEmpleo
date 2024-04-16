import mongoose from 'mongoose'

const perfilCandidatoSchema = new mongoose.Schema({
    idCandidato:String,
    idPerfil:String,
})

const PerfilCandidato = mongoose.models.perfil_candidato || mongoose.model("perfil_candidato", perfilCandidatoSchema)

export default PerfilCandidato