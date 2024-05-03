import mongoose from 'mongoose'

const habilidadSchema = new mongoose.Schema({
    nombreHabilidad:String,
    nivelHabilidad:String



})
//Logros va como array
//Referencia
const Habilidad = mongoose.models.habilidad || mongoose.model("habilidad", habilidadSchema)

export default Habilidad;