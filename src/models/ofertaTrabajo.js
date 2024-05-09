import mongoose, { Types } from 'mongoose'

const ofertaTrabajoSchema = new mongoose.Schema({
    tituloOferta: {
        type: String,
        required: [true, 'Se necesita especificar un titulo para la oferta de trabajo']
    },
    descripcionOfertaTrabajo: {
        type: String,
    },
    beneficios: { type: Array },
    requisitos: { type: Array },
    idEmpresa: {
        type: Types.ObjectId,
        required: [true, "idEmpresa requerido para relacionar oferta"]
    },
    modalidadTrabajo: {
        type: String,
        required: [true, "Se necesita especificar la modalidad de trabajo"]
    },
})

const OfertaTrabajo = mongoose.models.ofertaTrabajo || mongoose.model("ofertaTrabajo", ofertaTrabajoSchema);


export default OfertaTrabajo