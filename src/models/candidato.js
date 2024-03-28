import mongoose from 'mongoose'

const candidatoSchema = new mongoose.Schema({
    idPersona:String
})

const Candidato = mongoose.models.candidato || mongoose.model("candidato", candidatoSchema)

export default Candidato