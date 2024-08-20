import mongoose, { Types } from 'mongoose';

const homepageSchema = new mongoose.Schema({
  celular: [{ numero: String }],
  direccion: { type: String },
  politicaPrivacidad: {
    type: String,
    required: [true, "Por Favor Agregue la Política de Privacidad"]
  },
  sliders: [{
    titulo: {
      type: String,
      required: [true, 'El título no puede estar vacío']
    },
    imagen: {
      ruta: { type: String }
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
  }],
  metodopago: {
    banco: {
      type: String,
      required: [true, "El banco es requerido"]
    },
    monto: {
      type: String,
      required: [true, "El monto es requerido"]
    },
    pagocedula: {
      type: String,
      required: [true, "La cédula es requerida"]
    },
    pagotelefono: {
      type: String,
      required: [true, "El teléfono es requerido"]
    },
    pagowhatsapp: {
      type: String,
      required: [true, "El WhatsApp es requerido"]
    },
    emailBinance: {
      type: String,
      required: [true, "El email de Binance es requerido"]
    },
    emailPaypal: {
      type: String,
      required: [true, "El email de PayPal es requerido"]
    },
    emailZinli: {
      type: String,
      required: [true, "El email de Zinli es requerido"]
    }
  },
  idUsuarioAdministrador: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Si tienes una referencia a otra colección.
  }
});

const Homepage = mongoose.models.homepage || mongoose.model("homepage", homepageSchema);

export default Homepage;
