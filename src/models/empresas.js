import mongoose from 'mongoose'

const empresaSchema = new mongoose.Schema({
    idUsuario:String,
    // logo: {
    //     file: { type: Buffer, required: true },
    //     filename: { type: String, required: true },
    //     ext: { type: String, required: true }
    // },
    // actaConstitutiva: {
    //     type: String,
    //     required: [true, "Acta necesaria para el registro"],
    //     unique: true
    // }
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;