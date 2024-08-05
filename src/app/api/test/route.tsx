import { connect } from "@/dbConfig/dbConfig";
import Homepage from "@/models/homepageModel";

import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        await new Homepage({
            idUsuarioAdministrador: "669fbe254ee5de405072dfcd",
            celular: [
                {
                    numero: "04143524358"
                },
                {
                    numero: "04245762288"
                },
                {
                    numero: "04145299886"
                },
                {
                    numero: "04125422413"
                }
            ],
            direccion: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.430444047605!2d-69.2090759249852!3d9.558112280482336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e7dc1773b255555%3A0x2507655b50c1241e!2sA.C.%20GRUPO%20ALCO.%20S%C3%ADguenos%20por%20Instagram%20%40grupoalcoac!5e0!3m2!1ses!2sve!4v1719943928557!5m2!1ses!2sve",
            politicaPrivacidad: "Una politica de privacidad muy exigente",
            sliders: [
                {
                    titulo: "Encuentra Tu Próxima Oportunidad Laboral",
                    texto: "Únete a ALCOEMPLEO y haz que tu perfil profesional sea visible para cientos de empresas venezolanas. ¡Publica tu CV y empieza a recibir ofertas de empleo hoy mismo!",
                    imagen: {
                        ruta: "/slider/slider1.jpg",
                    },
                },
                {
                    titulo: "Empresas Buscando Talento Como Tú",
                    texto: "En ALCOEMPLEO, las empresas pueden encontrar el personal adecuado rápidamente y sin complicaciones. Publica tus vacantes y accede a una base de talento humano certificado.",
                    imagen: {
                        ruta: "/slider/slider2.jpg",
                    },
                },
                {
                    titulo: "Destaca en el Mercado Laboral",
                    texto: "Aumenta tu atractivo para los empleadores. ALCOEMPLEO te ofrece las herramientas para destacar.",
                    imagen: {
                        ruta: "/slider/slider3.jpg",
                    },
                }
            ],
            banner: [
                {
                    titulo: "¿Por qué tu perfil debe estar en alcoempleo.com?",
                    texto: "Nuestra plataforma es la única que te ofrece un contacto directo entre postulante y la empresa, permite abrir el campo de la oferta y la demanda laboral"
                }
            ],
            secciones: [
                {
                    titulo: "Registrate",
                    texto: "Haz clic en PUBLICA TU PERFIL, llena la información básica del formulario y tendrás tu cuenta registrada. NOTA: Debes ser mayor de edad"
                },
                {
                    titulo: "Inicia Sesión",
                    texto: "Completa tu perfil con los datos solicitados. Describe tu experiencia laboral, tus conocimientos, tus habilidades y las cosas más importantes de tu oferta de servicio"
                },
                {
                    titulo: "Publicar tu información",
                    texto: "Posterior a la activación del plan publica tu información para que seas visible en nuestra web"
                },
                {
                    titulo: "Escoge un Plan",
                    texto: "Escoge entre planes que ofrecemos y se adapte a tus requerimientos, sigue los pasos para activarlo y disfruta de las ventajas"
                },
                {
                    titulo: "1",
                    texto: "Te hace visible ante un mundo de oportunidades laborales."
                },
                {
                    titulo: "2",
                    texto: "Puedes crecer junto a nosotros, aumentando las posibilidades de conseguir la mejor oferta laboral."
                },
                {
                    titulo: "3",
                    texto: "Aprueba nuestros test y certifícate como trabajador recomendado, obtén las mejores oportunidades de empleo."
                }
            ]
        }).save()

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
