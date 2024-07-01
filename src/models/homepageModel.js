import mongoose from 'mongoose'

const homepageSchema = new mongoose.Schema({
    tituloHomePage: {
        type: String,
        required: [true, "El titulo No puede estar Vacio"]
    },
    textoHomePage: {
        type: String,
        required: [true, "El texto no puede estar vacio"]
    }
   
})

const homepage = mongoose.models.homepageSchema || mongoose.model("homepage", homepageSchema)

export default homepage;