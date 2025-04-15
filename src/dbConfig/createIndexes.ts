import mongoose from "mongoose";
import Candidato from "@/models/candidato";
import OfertaTrabajo from "@/models/ofertaTrabajo";

export async function createSearchIndexes() {
    try {
        // Crear índice para búsqueda de candidatos
        await Candidato.collection.createIndex(
            {
                "perfil.puestoDeseado": "text",
                "perfil.descripcionPersonal": "text",
                "experiencias.nombreEmpresa": "text",
                "experiencias.descripcion": "text",
                "formacionesAcademicas.titulo": "text",
                "formacionesAcademicas.institucion": "text",
                "habilidad.nombreHabilidad": "text"
            },
            {
                name: "candidateSearchIndex",
                weights: {
                    "perfil.puestoDeseado": 10,
                    "perfil.descripcionPersonal": 5,
                    "experiencias.nombreEmpresa": 3,
                    "experiencias.descripcion": 2,
                    "formacionesAcademicas.titulo": 3,
                    "formacionesAcademicas.institucion": 2,
                    "habilidad.nombreHabilidad": 2
                },
                default_language: "spanish"
            }
        );

        // Crear índice para búsqueda de ofertas de trabajo
        await OfertaTrabajo.collection.createIndex(
            {
                "tituloOferta": "text",
                "descripcionOfertaTrabajo": "text",
                "beneficios": "text",
                "requisitos": "text"
            },
            {
                name: "jobOfferSearchIndex",
                weights: {
                    "tituloOferta": 10,
                    "descripcionOfertaTrabajo": 5,
                    "beneficios": 3,
                    "requisitos": 3
                },
                default_language: "spanish"
            }
        );

        console.log("Índices de búsqueda creados exitosamente");
    } catch (error) {
        console.error("Error al crear índices de búsqueda:", error);
    }
} 