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
            estatus: Boolean
        },
    ],
    habilidad: [
        {
            nombreHabilidad: String,
            nivelHabilidad: String
        }
    ],
    perfil:
    {
        fotoPerfil:{
            data:Buffer,
            contentType:String
        },
        CV:{
            data:Buffer,
            contentType:String
        },
        descripcionPersonal: {
            type: String
        },
        
        puestoDeseado: { type: String },
        salarioDeseado: { type: Number },
        calificacion: { type: Number }
    }
    ,
    redes: [{ enlace: String }],
    formacionesAcademicas: [
        {
            titulo: String,
            institucion: String

        }
    ],
})

const Candidato = mongoose.models.candidatoPerfil || mongoose.model("candidatoPerfil", candidatoSchema)

export default Candidato