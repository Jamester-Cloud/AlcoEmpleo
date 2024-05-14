"use client";
import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { Candidate } from "@/app/interfaces/types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";

interface Props {
  candidates: Candidate[];
}

export function CarouselMulti({ candidates }: Props) {
  return (
    <Carousel
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {candidates.map((candidato, index) => (
        <div key={index} className="flex justify-center p-2">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
            integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
            crossOrigin="anonymous"
          />
          <Card className="w-80 h-64">
            <Card.Header>
              <div className="mt-3 mb-4">
                <Image src="/AlcoSloganLogo.png" height={30} width={30} className="w-full" alt="Logo" />
              </div>
            </Card.Header>
            <Card.Body className="text-center">
              <span className="badge bg-success rounded-pill">
                <FontAwesomeIcon icon={faLocation} /> Perfil certificado
              </span>
              <h4 className="mb-2">{candidato.personaData.nombre} {candidato.personaData.apellido}</h4>
              <p className="text-muted mb-4">{candidato.Candidato.perfil.puestoDeseado}</p>
              <div className="text-muted mb-4">
                <FontAwesomeIcon icon={faLocation} /> Venezuela
              </div>
              <div className="mb-4 pb-2">
                <button type="button" className="btn btn-success btn-sm rounded">
                  <Link
                    href={`https://wa.me/${candidato.personaData.telefono}?text=Hola%20te%20estamos%20contactando%20desde%20La%20web%20AlcoEmpleo%20y%20estamos%20Interesados%20en%20tu%20perfil`}
                    className="mdi mdi-whatsapp  text-white text-decoration-none"
                  >
                    Enviar mensaje
                  </Link>
                </button>
              </div>
              <Link href={`/enterprise/candidateProfile/${candidato._id}`} className="btn btn-primary btn-large">
                Ver Perfil
              </Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Carousel>
  );
}
