import mongoose from 'mongoose'

const experienciaSchema = new mongoose.Schema({
    NombreEmpresa: {
        type: String,
        required: [true, "Por favor introduce un nombre de la Empresa"]
    },
    duracion: {
        type: String,
        required: [true, "Por favor introduce la duracion"]
    },
    FechaInicio: {
        type: Date,
    },
    cargo: {
        type: String,
       
    },
    logros: {
        type:[String],
       
    },
    Referencias: {
        type:[String],  
    },
    descripcion: {
        type: String,
       
    },
    estatus: {
        type:Boolean,
        default:false
    }
})
//Logros va como array
//Referencia
const Experiencia = mongoose.models.experiencia || mongoose.model("experiencia", experienciaSchema)

export default Experiencia;