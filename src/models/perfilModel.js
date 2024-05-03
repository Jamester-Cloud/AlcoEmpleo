import mongoose from 'mongoose'

const perfilSchema = new mongoose.Schema({
  
    // CV: {
    //     file: { type: Buffer, required: true },
    //     filename: { type: String, required: true },
    //     ext: { type: String, required: true }
    // },
    descripcionPersonal: {
        type: String,
    },
    // videoPresentacion: {
    //     file: { type: Buffer, required: true },
    //     filename: { type: String, required: true },
    //     ext: { type: String, required: true }
    // },
    puestoDeseado: {type:String},
    salarioDeseado:Number,
    redes: [{ enlace: String }],
    linkRedSocial: String,
})

const Perfil = mongoose.models.perfil || mongoose.model("perfil", perfilSchema);


export default Perfil