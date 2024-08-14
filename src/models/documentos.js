import mongoose, { Types } from "mongoose";

const documentosSchema = new mongoose.Schema({
    idUsuario: Types.ObjectId,
    filename: String,
    idArchivo: Types.ObjectId,
    originalname: String,
    contentType: String,
    size: Number,
    bucketName: String,
    createdAt: { type: Date, default: new Date() },
})

const Documento = mongoose.models.documentos || mongoose.model("documentos", documentosSchema)

export default Documento;