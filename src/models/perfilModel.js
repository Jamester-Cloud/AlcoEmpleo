import mongoose from 'mongoose'

const perfilSchema = new mongoose.Schema({
  
    CV: {
        file: { type: Buffer, required: true },
        filename: { type: String, required: true },
        ext: { type: String, required: true }
    },
    descripcion: {
        type: String,
        required: [true, " un nombre de usuario"],
        unique: true
    },
    videoPresentacion: {
        file: { type: Buffer, required: true },
        filename: { type: String, required: true },
        ext: { type: String, required: true }
    },
    puestoDeseado: String,
    web: String,
    linkRedSocial: String,

})

const Perfil = mongoose.models.perfil || mongoose.model("perfil", perfilSchema);


export default Perfil