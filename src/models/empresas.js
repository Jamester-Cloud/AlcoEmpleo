import mongoose from 'mongoose'

const empresaSchema = new mongoose.Schema({
    logo: {
        file: { type: Buffer, required: true },
        filename: { type: String, required: true },
        ext: { type: String, required: true }
    },
    riff: {
        type: String,
        required: [true, "Se debe ingresar el riff de una empresa"],
        unique: true
    },
    actaConstitutiva: {
        type: string,
        required: [true, "Acta necesaria para el registro"],
        unique: true
    }
})

const Empresa = mongoose.models.empresa || mongoose.model("empresa", empresaSchema)

export default Empresa;