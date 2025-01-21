"use client";
import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Candidate } from "@/app/interfaces/types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';

interface Props {
  candidates: Candidate[];
}

export function CarouselMulti({ candidates }: Props) {
  const whatsappMessage = encodeURIComponent(
    "Saludos, te estamos contactando a través de la página de Alcoempleos. Nos interesó tu perfil."
  );

  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  if (!candidates || candidates.length === 0) {
    return <div></div>; // Placeholder si no hay candidatos
  }

  const renderCarousel = (candidates: Candidate[]) => (
    <Carousel
      className="p-3 bg-slate-400"
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4, // Mostrar 4 elementos en pantallas grandes
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2, // Mostrar 2 elementos en tabletas
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1, // Mostrar 1 elemento en móviles
        },
      }}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {candidates.map((candidato: any, index: number) => (
        <div key={index} className="flex justify-center">
          <Card className="w-64 max-w-64 min-w-64 h-72 max-h-96 min-h-96 rounded-lg shadow-md">
            <Card.Header className="text-center h-full">
              <span className="badge bg-green-500 rounded-pill">
                <FontAwesomeIcon icon={faCheckCircle} /> Verificado
              </span>
              <div className="flex items-center justify-center">
                <Image
                  src={
                    candidato?.documentos?.idArchivo
                      ? `/api/candidate/profilePic?idArchivo=${candidato.documentos.idArchivo}`
                      : "/Imagen-card.png"
                  }
                  height={96}
                  width={96}
                  className="max-h-96 rounded-full"
                  alt={`Perfil de ${candidato.personaData.nombre} ${candidato.personaData.apellido}`}
                />
              </div>
              <p className="mb-1 text-xl font-bold">
                {candidato.personaData.nombre}{" "}
                {candidato.personaData.apellido}
              </p>
              <p className="text-muted mb-2">
                {candidato.Candidato.perfil.puestoDeseado}
              </p>
              <div className="text-muted mb-2">
                <FontAwesomeIcon icon={faLocation} /> Venezuela
              </div>
              <div className="flex gap-2 mt-auto absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  type="button"
                  className="bg-green-500 text-white text-xs py-2 px-4 rounded"
                >
                  <Link
                    href={`https://wa.me/${candidato.personaData.telefono}?text=${whatsappMessage}`}
                    className="text-white text-xs flex items-center"
                  >
                    Enviar mensaje
                  </Link>
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white text-xs py-2 px-4 rounded"
                >
                  <Link
                    href={`/enterprise/candidateProfile/${candidato._id}`}
                    className="text-white text-xs"
                  >
                    Ver Perfil
                  </Link>
                </button>
              </div>
            </Card.Header>
          </Card>
        </div>
      ))}
    </Carousel>
  );

  if (isMobileOrTablet) {
    return renderCarousel(candidates);
  }

  // Dividimos los candidatos en dos arrays (una para cada carrusel)
  const firstRowCandidates = candidates.slice(
    0,
    Math.ceil(candidates.length / 2)
  );
  const secondRowCandidates = candidates.slice(
    Math.ceil(candidates.length / 2)
  );

  return (
    <div>
      {/* Primer Carrusel: Muestra la primera fila */}
      {renderCarousel(firstRowCandidates)}

      {/* Segundo Carrusel: Muestra la segunda fila */}
      {renderCarousel(secondRowCandidates)}
    </div>
  );
}
