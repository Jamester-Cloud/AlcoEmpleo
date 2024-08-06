import mongoose, { Types } from "mongoose";

const cuestionarioSchema = new mongoose.Schema({
    idCandidato: Types.ObjectId,
    preguntas: [{ pregunta: String }],
    respuestas: [{ respuesta: String }],
    calificacion: Number,
    createadAt: { type: Date, default: Date.now },
    finalizada:Boolean,
})

const Cuestionario = mongoose.models.cuestionario || mongoose.model("cuestionario", cuestionarioSchema)

export default Cuestionario;