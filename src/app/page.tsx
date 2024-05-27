"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import {  Carousel } from "react-bootstrap";
import Image from "next/image";

import { CandidateListResponse } from "./interfaces/types";
import Cabecera from "./components/cabeceras/cabecera";
import { CarouselMulti } from "./components/CarouselMulti/CarouselMulti";
import Contact from "./components/Contact/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faCreditCard, faFile   } from "@fortawesome/free-solid-svg-icons";

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
      <div className="  m-0 z-50  relative">
      <Cabecera ></Cabecera>
      </div>
      <Carousel className="">
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider1.jpg"
        layout="fill"
        objectFit="cover"
        alt="Encuentra Tu Próxima Oportunidad Laboral"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
      <h3 className="text-lg md:text-2xl font-bold">Encuentra Tu Próxima Oportunidad Laboral</h3>
      <p className="text-sm md:text-lg my-2">Únete a ALCOEMPLEO y haz que tu perfil profesional sea visible para cientos de empresas venezolanas. ¡Publica tu CV y empieza a recibir ofertas de empleo hoy mismo!</p>
    </Carousel.Caption>
  </Carousel.Item>
  
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider2.jpg"
        layout="fill"
        objectFit="cover"
        alt="Empresas Buscando Talento Como Tú"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
      <h3 className="text-lg md:text-2xl font-bold">Empresas Buscando Talento Como Tú</h3>
      <p className="text-sm md:text-lg my-2">En ALCOEMPLEO, las empresas pueden encontrar el personal adecuado rápidamente y sin complicaciones. Publica tus vacantes y accede a una base de talento humano certificado.</p>
    </Carousel.Caption>
  </Carousel.Item>
  
  <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
    <div className="w-full h-full relative">
      <Image
        src="/slider/slider3.jpg"
        layout="fill"
        objectFit="cover"
        alt="Capacítate y Destaca en el Mercado Laboral"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
    <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
      <h3 className="text-lg md:text-2xl font-bold">Destaca en el Mercado Laboral</h3>
      <p className="text-sm md:text-lg my-2">Mejora tus habilidades con nuestros cursos online y aumenta tu atractivo para los empleadores. ALCOEMPLEO te ofrece las herramientas para destacar.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


      {/* Usamos el componente CandidateCarousel */}
      <CarouselMulti  candidates={data.dataCandidatosPremium} />

      <div className="bg-primary  p-2 d-grid md:grid-cols-2   lg:grid-cols-4  sm:grid-cols-1  ">
        <div className=" bg-white rounded m-1  p-2">
         
        <h2  className=" text-center">  <FontAwesomeIcon icon={faUsers}/> Registrarse</h2>
        <p  className="">Haz click en  <span className=" font-bold">"Registrarse"</span>, selecciona tu rol si eres  <span className=" font-bold"> "Candidato"</span> o  <span className=" font-bold"> "Empleador"</span>, llena el formulario de registro y tendrás tu cuenta activa. Debes ser mayor de edad.	</p>
    
        </div>

        <div className=" bg-white rounded  m-1 p-2">
        <h2 className=" text-center"><FontAwesomeIcon icon={faUser}/> Inicia Sesión</h2>
        <p>Completa tu perfil con los datos solicitados. Describe tu <span className=" font-bold"> experiencia laboral </span>,<span className=" font-bold"> tus habilidades </span> y la información que consideres más importante de tu perfil.		</p>
        </div>

        <div className=" bg-white rounded  m-1 p-2">
        <h2 className=" text-center"><FontAwesomeIcon icon={faCreditCard}/> Escoge un plan	</h2>
        <p>Entre los planes que ofrecemos y se adapten a tus requerimientos, sigue los pasos para activarlo y disfruta de las ventajas	</p>
        </div>
       <div className=" bg-white rounded  m-1 p-2">
        <h2 className=" text-center"><FontAwesomeIcon icon={faFile}/> Publica Tu Perfil	</h2>
        <p>Posterior a la activación del plan, publica tu información para que seas visible en nuestra plataforma.</p>
        </div>

      </div>

 
    <Contact/>

    <Footer/>
    </div>
  );
}
