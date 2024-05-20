"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import { Card, Carousel } from "react-bootstrap";
import Image from "next/image";
import { CandidateListResponse } from "./interfaces/types";
import Cabecera from "./components/cabeceras/cabecera";
import { CarouselMulti } from "./components/CarouselMulti/CarouselMulti";
import Contact from "./components/Contact/Contact";

export default function Home() {
  const [data, setData] = useState<CandidateListResponse>({ dataCandidatosPremium: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CandidateListResponse>("api/enterprise/candidateList");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Cabecera />
      <Carousel className="">
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider1.jpg"
        layout="fill"
        objectFit="cover"
        alt="GrupoAlco"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Capa superpuesta */}
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 z-10">
      <h3 className="text-2xl font-bold">Encuentra Tu Próxima Oportunidad Laboral</h3>
      <p className="text-lg">Únete a ALCOEMPLEO y haz que tu perfil profesional sea visible para cientos de empresas venezolanas. ¡Publica tu CV y empieza a recibir ofertas de empleo hoy mismo!</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider2.jpg"
        layout="fill"
        objectFit="cover"
        alt="GrupoAlco"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Capa superpuesta */}
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 z-10">
      <h3 className="text-2xl font-bold">Empresas Buscando Talento Como Tú</h3>
      <p className="text-lg">En ALCOEMPLEO, las empresas pueden encontrar el personal adecuado rápidamente y sin complicaciones. Publica tus vacantes y accede a una base de talento humano certificado.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider3.jpg"
        layout="fill"
        objectFit="cover"
        alt="GrupoAlco"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Capa superpuesta */}
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 z-10">
      <h3 className="text-2xl font-bold">Capacítate y Destaca en el Mercado Laboral</h3>
      <p className="text-lg">Mejora tus habilidades con nuestros cursos online y aumenta tu atractivo para los empleadores. ALCOEMPLEO te ofrece las herramientas para destacar.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

      {/* Usamos el componente CandidateCarousel */}
      <CarouselMulti candidates={data.dataCandidatosPremium} />


    <Contact/>
    <Footer/>
    </div>
  );
}
