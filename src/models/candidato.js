import mongoose, { Types } from "mongoose";

const candidatoSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    cargoActual: String,
    esDestacado: Boolean,
    experiencias: [
        {
            nombreEmpresa: {
                type: String,
                required: [true, "Se debe ingresar el nombre de la empresa en donde se tuvo la experiencia"]
            },
            duracion: {
                type: String,
                required: [true, "Se debe ingresar la duración de la experiencia"]
            },
            logros: [
                { descripcionLogro: String }
            ],
            referencias: [
                { referencia: String }
            ],
            descripcion: {
                type: String
            },
            estatus: boolean
        },
    ],
    habilidad: [
        {
            nombreHabilidad: String,
            nivelHabilidad: String
        }
    ]
})

const Candidato = mongoose.models.candidato || mongoose.model("candidato", candidatoSchema)

export default Candidato