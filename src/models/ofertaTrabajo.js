import mongoose from 'mongoose'

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
    }
})

const Perfil = mongoose.models.ofertaTrabajo || mongoose.model("ofertaTrabajo", ofertofertaTrabajoSchemaaTrabajoSchema);


export default Perfil