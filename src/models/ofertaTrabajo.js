import mongoose, {Types} from 'mongoose'

const ofertaTrabajoSchema = new mongoose.Schema({
    tituloOferta:{
        type:String,
        required:[true, 'Se necesita especificar un titulo para la oferta de trabajo']
    },
    descripcionOfertaTrabajo: {
        type: String,
    },
    beneficios:{
        type:String,
    },
    beneficios: [
        {
            beneficio: String,
        }
    ],
    requisitos: [
        {
            requisito: String,
            obligatorio:Boolean
        }
    ],
    idEmpresa:{
        type:Types.ObjectId,
        required:[true, "idEmpresa requerido para relacionar oferta"]
    },
    modalidadTrabajo:{
        type:String,
        required:[true, "Se necesita especificar la modalidad de trabajo"]
    },
})

const ofertaTrabajo = mongoose.models.ofertaTrabajo || mongoose.model("ofertaTrabajo", ofertaTrabajoSchema);


export default ofertaTrabajo