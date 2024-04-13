import mongoose from 'mongoose'

const candidatoSchema = new mongoose.Schema({
    idUsuario:String
})

const Candidato = mongoose.models.candidato || mongoose.model("candidato", candidatoSchema)

export default Candidato