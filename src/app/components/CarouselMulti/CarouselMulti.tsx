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

interface Props {
  candidates: Candidate[];
}

export function CarouselMulti(props: any) {

  let { candidates, idProfilePicture } = props
  console.log(candidates)
  const whatsappMessage = encodeURIComponent(
    "Hola Contacto desde AlcoEmpleo, estamos Interesados en tu perfil"
  );

 
  if (!candidates || candidates.length === 0) {
    return (
      //  Dejo este Div Vacio para que no se vea feo el HomePage al no haber candidatos Premiums 
      <div >
      </div>
    );
  }

  return (
    <Carousel
      className="d-flex justify-content-center   p-3 bg-slate-400"
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
        <div key={index} className="flex justify-center  ">
          <Card className="w-64 max-w-64 min-w-64 h-64 rounded-lg shadow-md ">
            <Card.Header className=" text-center ">
            <span className="badge  bg-green-500  rounded-pill  ">
                <FontAwesomeIcon icon={faCheckCircle} /> Verificado
              </span>
              <div className="  flex items-center justify-center">
                <Image
                  src={candidato?.documentos?.idArchivo ? `/api/candidate/profilePic?idArchivo=${candidato.documentos.idArchivo}` : '/Imagen-card.png'}
                  height={96}
                  width={96}
                  className=" rounded-full"
              
                  alt="Logo"
                />
              </div>
              <h4 className="mb-2">
                {candidato.personaData.nombre} {candidato.personaData.apellido}
              </h4>
              <p className="text-muted mb-4">
                {candidato.Candidato.perfil.puestoDeseado}
              </p>
              <div className="text-muted mb-4">
                <FontAwesomeIcon icon={faLocation} /> Venezuela
              </div>
              <div className="flex gap-2 ">
                <button type="button" className="btn btn-success btn-sm rounded">
                  <Link
                    href={`https://wa.me/${candidato.personaData.telefono}?text=${whatsappMessage}`}
                    className="mdi mdi-whatsapp  text-decoration-none btn btn-success text-white text-xs rounded flex items-center"
                  >
                    Enviar mensaje
                  </Link>
                </button>
                <button type="button" className="btn btn-primary btn-sm rounded">
                  <Link
                    href={`/enterprise/candidateProfile/${candidato._id}`}
                    className="btn btn-primary text-white text-xs rounded"
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
}
