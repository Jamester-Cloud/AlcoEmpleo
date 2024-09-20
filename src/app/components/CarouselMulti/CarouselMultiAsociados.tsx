"use client";
import React from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export function CarouselMultiAsociados(props: any) {
  const asociados = [
    {
      id: 1,
      nombreAsociado: "",
      imagen: "/logos/BodegonLos7.jpg",
    },
    {
      id: 2,
      nombreAsociado: "",
      imagen: "/logos/logoCleveland.png",
    },
    {
      id: 3,
      nombreAsociado: "",
      imagen: "/logos/LOGOMUCURA.jpg",
    },
    {
      id: 4,
      nombreAsociado: "",
      imagen: "/logos/logo-rojo-metaplas.png",
    },
    {
      id: 5,
      nombreAsociado: "", 
      imagen: "/logos/ColegioIlustres.jpg",
    },
    {
      id: 6,
      nombreAsociado: "", 
      imagen: "/logos/SimonDiaz.jpg",
    },
    {
      id: 7,
      nombreAsociado: "", 
      imagen: "/logos/LogoFarmalidyo.png",
    },
    {
      id: 8,
      nombreAsociado: "", 
      imagen: "/logos/perfumesFactory.png",
    },
    {
      id: 9,
      nombreAsociado: "", 
      imagen: "/logos/ColegioIlustres.jpg",
    },
  ];

  return (
    <div className="  text-left  py-6">
      <h3 className=" ml-3 font-bold text-cyan-500 ">Empresas <br /> que Confian en Nosotros</h3>

      <Carousel
        className="d-flex items-center justify-content-center"
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
        {asociados.map((asociado: any, index: number) => (
          <div key={index} className="flex justify-center items-center">
            <Card className="w-64 h-64 flex justify-center items-center">
              <div className="flex justify-center items-center h-60">
              <div className=" ">
                <Image
                  src={asociado.imagen}
                  
                  height={300}
                  width={400}
                  className="w-full"
                  alt="Imagen de perfil"
                />
                {/* Renderizamos el h4 solo si hay nombre */}
           
              </div>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
