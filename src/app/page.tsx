"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import { Card, Carousel } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";
import CandidateCarousel from "./components/CarouselMulti/CarouselMulti";
import { CandidateListResponse } from "./interfaces/types";


export default function Home() {
  //En el State se llama el ListResponse para declarar que los datos seran llamados como Array
  const [data, setData] = useState<CandidateListResponse>({ dataCandidatosPremium: [] });
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    //Realizo la consulta con el axio, se llama el candidate Response
    //Nota se puede hacer console log, para ver los objetos que trae esta data
    const fetchData = async () => {
      try {
        const response = await axios.get<CandidateListResponse>("api/enterprise/candidateList");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al Cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      <Carousel className="">
          <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144 ">
            <div className="w-full h-full ">
                <Image
                  src="/slider/slider1.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="GrupoAlco"
                />
        
            </div>
            <Carousel.Caption>
              <h3 className="z-5">Texto del Slider 1</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144 ">
          
              <div className="w-full h-full ">
                <Image
                  src="/slider/slider2.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="GrupoAlco"
                />
              </div>
          
            <Carousel.Caption>
              <h3>Texto del Slider 2</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-64 md:h-96 lg:h-128 xl:h-144">
            
              <div className="w-full h-full">
                <Image
                  src="/slider/slider3.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="GrupoAlco"
                />
              </div>
          
            <Carousel.Caption>
              <h3>Texto del Slider 3</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    {/* Carousel de Arriba, son las imagenes, falta modificar para Agregar Textos/}

      {/* Llamando al componente CandidateCarousel Premium*/}
      <CandidateCarousel candidates={data.dataCandidatosPremium} />

      <Footer />
    </div>
  );
}
