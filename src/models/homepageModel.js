import mongoose from 'mongoose'

const homepageSchema = new mongoose.Schema({
  celular: [
    { numero: String }
  ],
  direccion: {
    type: String,
  },
  politicaPrivacidad: {
    type: String,
    required: [true, "Por Favor Agregue la Politica y Privacidad"]
  },
  sliders: [{
    titulo: {
      type: String,
      required: [true, 'El título no puede estar vacío']
    },
    texto: {
      type: String,
      required: [true, 'El texto no puede estar vacío']
    }
  }],
  banner: [{
    titulo: {
      type: String,
      required: [true, 'El título no puede estar vacío']
    },
    texto: {
      type: String,
      required: [true, 'El texto no puede estar vacío']
    }
  }],
  secciones: [{
    titulo: {
      type: String,
      required: [true, 'El título no puede estar vacío']
    },
    texto: {
      type: String,
      required: [true, 'El texto no puede estar vacío']
    }
  }]
})

const Homepage = mongoose.models.homepage || mongoose.model("homepage", homepageSchema)

export default Homepage;

