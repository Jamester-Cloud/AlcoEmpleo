import { connect } from "@/dbConfig/dbConfig";
import Candidato from "@/models/candidato";

import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {

    try {

      
      // await new Candidato({
      //   idUsuario: "6674b07ea9432981c8238e4b",
      //   idRegion: "666a0143e8de08873e9e6783",
      //   esDestacado: true,
      //   experiencias: [
      //     {
      //       nombreEmpresa: "Data Insights Ltd.",
      //       duracion: "4 años",
      //       logros: [
      //         { descripcionLogro: "Desarrollé modelos predictivos que mejoraron la precisión de las previsiones de ventas en un 20%" },
      //         { descripcionLogro: "Implementé un sistema de visualización de datos que mejoró la toma de decisiones estratégicas" }
      //       ],
      //       referencias: [
      //         { referencia: "Dr. Luis Fernández" },
      //         { referencia: "Ana Torres" },
      //         { referencia: "Jorge Ramírez" }
      //       ],
      //       descripcion: "Me permitió especializarme en el análisis de grandes volúmenes de datos y en la interpretación de resultados",
      //       estatus: true
      //     }
      //   ],
      //   habilidad: [
      //     {
      //       nombreHabilidad: "Python",
      //       nivelHabilidad: "Experto"
      //     },
      //     {
      //       nombreHabilidad: "SQL",
      //       nivelHabilidad: "Avanzado"
      //     },
      //     {
      //       nombreHabilidad: "Tableau",
      //       nivelHabilidad: "Avanzado"
      //     }
      //   ],
      //   perfil: {
      //     descripcionPersonal: "Soy un analista de datos con una fuerte pasión por encontrar patrones y tendencias que impulsen el negocio",
      //     puestoDeseado: "Analista de Datos Senior",
      //     salarioDeseado: 5200,
      //     calificacion: 4.7,
      //     esDestacado: true
      //   },
      //   redes: [
      //     { enlace: "LinkedIn" },
      //     { enlace: "Kaggle" },
      //     { enlace: "Twitter" }
      //   ],
      //   formacionesAcademicas: [
      //     {
      //       titulo: "Máster en Ciencia de Datos",
      //       institucion: "Universidad de Análisis y Tecnología"
      //     }
      //   ]
      // }).save()

      
      

        return NextResponse.json({ message: 'Consulta creada exitosamente', success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Consulta creada erroneamente', success: false })
    }
}
