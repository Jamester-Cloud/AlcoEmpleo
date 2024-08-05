import mongoose, { Types } from "mongoose";

const cuestionarioSchema = new mongoose.Schema({
    idCandidato: Types.ObjectId,
    idEmpresa: Types.ObjectId,
    preguntas: [{ pregunta: String }],
    respuestas: [{ respuesta: String }],
    calificacion: Number,
    createadAt: { type: Date, default: Date.now }
})

const Cuestionario = mongoose.models.cuestionario || mongoose.model("cuestionario", cuestionarioSchema)

export default Cuestionario;