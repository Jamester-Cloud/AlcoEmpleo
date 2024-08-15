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
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Import "check-circle" icon

interface Props {
  candidates: Candidate[];
}

export function CarouselMulti(props: any) {
  let { candidates, idProfilePicture } = props
  console.log(candidates)
  const whatsappMessage = encodeURIComponent(
    "Hola Contacto desde AlcoEmpleo, estamos Interesados en tu perfil"
  );
  return (
    <Carousel
      className="d-flex justify-content-center pb-20"
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
      {candidates?.map((candidato: any, index: number) => (
        <div key={index} className="flex justify-center">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
            integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
            crossOrigin="anonymous"
          />
          <Card className="w-64 max-w-64 min-w-64 h-64">
            <Card.Header>
              <div className="">
                <Image
                  src={candidato?.documentos?.idArchivo ? `/api/candidate/profilePic?idArchivo=${candidato.documentos.idArchivo}` : '/Imagen-card.png'}
                  height={400}
                  width={400}
                  className="w-full"
                  alt="Logo"
                />
              </div>
            </Card.Header>
            <Card.Body className="">
              <span className="badge text-right bg-success rounded-pill  top-1/2 -translate-y-1/2">
                <FontAwesomeIcon icon={faCheckCircle} /> Verificado
              </span>
              <h4 className="mb-2">
                {candidato.personaData.nombre} {candidato.personaData.apellido}
              </h4>
              <p className="text-muted mb-4">
                {candidato.Candidato.perfil.puestoDeseado}
              </p>
              <div className="text-muted mb-4">
                <FontAwesomeIcon icon={faLocation} /> Venezuela
              </div>
              <div className="mb-4 pb-2 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success btn-sm rounded"
                >
                  <Link
                    href={`https://wa.me/${candidato.personaData.telefono}?text=${whatsappMessage}`}
                    className="mdi mdi-whatsapp  text-white text-decoration-none"
                  >
                    Enviar mensaje
                  </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded"
                >
                  <Link
                    href={`/enterprise/candidateProfile/${candidato._id}`}
                    className="mdi  text-white text-decoration-none"
                  >
                    Ver Perfil
                  </Link>
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Carousel>
  );
}
