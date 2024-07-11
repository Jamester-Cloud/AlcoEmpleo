import mongoose, { Types } from "mongoose";

const candidatoSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    idRegion:Types.ObjectId,
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
        },
    ],
    habilidad: [
        {
            nombreHabilidad: String,
            nivelHabilidad: String
        }
    ],
    idiomas: [
        {
            idioma: String,
            nivel:String
        }
    ],
    perfil:
    {
        CV:{
            path:String,
            dataType:String,
            size:Number
        },
        descripcionPersonal: {
            type: String
        },
        fechaPublicacion:{type:Date},
        puestoDeseado: { type: String },
        salarioDeseado: { type: String },
    }
    ,
    redes: [{ enlace: String }],
    formacionesAcademicas: [
        {
            titulo: String,
            institucion: String,
            duracion:String,
            tipoFormacion:String,
        }
    ],
})

const Candidato = mongoose.models.candidatoPerfil || mongoose.model("candidatoPerfil", candidatoSchema)

export default Candidato