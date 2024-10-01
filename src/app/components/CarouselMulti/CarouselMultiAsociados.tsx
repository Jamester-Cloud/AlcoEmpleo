"use client";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export function CarouselMultiAsociados(props: any) {
  const asociados = [
    { id: 1, nombreAsociado: "", imagen: "/logos/BodegonLos7.jpg" },
    { id: 2, nombreAsociado: "", imagen: "/logos/logoCleveland.png" },
    { id: 3, nombreAsociado: "", imagen: "/logos/LOGOMUCURA.jpg" },
    { id: 4, nombreAsociado: "", imagen: "/logos/logo-rojo-metaplas.png" },
    { id: 5, nombreAsociado: "", imagen: "/logos/ColegioIlustres.jpg" },
    { id: 6, nombreAsociado: "", imagen: "/logos/SimonDiaz.jpg" },
    { id: 7, nombreAsociado: "", imagen: "/logos/LogoFarmalidyo.png" },
    { id: 8, nombreAsociado: "", imagen: "/logos/perfumesFactory.png" },
    { id: 9, nombreAsociado: "", imagen: "/logos/ColegioIlustres.jpg" },
    { id: 10, nombreAsociado: "", imagen: "/logos/elparaiso.jpg" },
    { id: 11, nombreAsociado: "", imagen: "/logos/LOGOHUMBOLDT.jpg" },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="text-left py-6">
      <h3 className="ml-3 font-bold text-cyan-500">Empresas <br /> que Confían en Nosotros</h3>
      <Carousel responsive={responsive} infinite={true}>
        {asociados.map(asociado => (
             <div className="flex justify-center items-center h-60">
          <div key={asociado.id} className="flex justify-center items-center">
         
            <Image
              src={asociado.imagen}
              alt={asociado.nombreAsociado}
              width={400} 
              height={300} 
              className="object-contain  w-full  h-52 " 
            />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
