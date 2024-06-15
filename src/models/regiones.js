import mongoose, { Types } from "mongoose";

const regionesSchema = new mongoose.Schema({
    iso_31662: String,
    estado: String,
    capital: String,
    id_estado: Number,
    municipios: [
        {
            municipio: String,
            capital: String,
            parroquias: Array
        }
    ],
    ciudades:Array
})

const Region = mongoose.models.regiones || mongoose.model("regiones", regionesSchema)

export default Region;