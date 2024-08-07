import mongoose, { Types } from "mongoose";

const cuestionarioSchema = new mongoose.Schema({
    idCandidato: Types.ObjectId,
    tituloCuestionario:String,
    preguntas: [{ pregunta: String, respuestaCorrecta: String, respuestas: [{ respuesta: String }] }],
    respuestasCandidato: [{ respuesta: String }],
    dificultad: String,
    calificacion: Number,
    createadAt: { type: Date, default: Date.now },
    finalizada: Boolean,
})

const Cuestionario = mongoose.models.cuestionario || mongoose.model("cuestionario", cuestionarioSchema)

export default Cuestionario;