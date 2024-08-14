import mongoose, { Types } from "mongoose";

const documentosSchema = new mongoose.Schema({
    idUSuario: Types.ObjectId,
    filename: String,
    originalname: String,
    contentType: String,
    size: Number,
    bucketName: String,
})

const Documento = mongoose.models.documentos || mongoose.model("documentos", documentosSchema)

export default Documento;