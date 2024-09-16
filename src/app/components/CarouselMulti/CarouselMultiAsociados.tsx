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
      nombreAsociado: "Alivensa",
      imagen: "/Imagen-card.png",
    },
    {
      id: 2,
      nombreAsociado: "Alco",
      imagen: "/Imagen-card.png",
    },
    {
      id: 3,
      nombreAsociado: "Microsoft",
      imagen: "/Imagen-card.png",
    },
    {
      id: 4,
      nombreAsociado: "", // Este no tiene nombre
      imagen: "/Imagen-card.png",
    },
  ];

  return (
    <div className="  text-left  py-6">
      <h3 className=" ml-3 font-bold text-cyan-500 ">Empresas <br /> que Confian en Nosotros</h3>

      <Carousel
        className="d-flex justify-content-center"
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
            <Card className="w-64 max-w-64 min-w-64 h-64 ">
              <div>
                <Image
                  src={asociado.imagen}
                  height={400}
                  width={400}
                  className="w-full"
                  alt="Imagen de perfil"
                />
                {/* Renderizamos el h4 solo si hay nombre */}
           
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
