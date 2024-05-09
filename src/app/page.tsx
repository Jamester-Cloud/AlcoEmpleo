"use client"
import { useState, useEffect } from "react";
import { Card, Carousel } from "react-bootstrap";
import { Candidato,CandidateApiResponse } from "./interfaces/types";
import Header from "./components/Headers/header";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


//Establezco Interface para que no explote el TypeScript

export default function Home() {
  const [data, setData] = useState<CandidateApiResponse>({ dataCandidatosPremium: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/enterprise/candidateList");
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

  // Función para dividir el arreglo de candidatos en grupos de 3
  const divideCandidatesIntoGroups = (candidates: Candidato[]) => {
    const groupedCandidates: Candidato[][] = [];
    for (let i = 0; i < candidates.length; i += 3) {
      groupedCandidates.push(candidates.slice(i, i + 3));
    }
    return groupedCandidates;
  };


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

          

      <Carousel indicators={false}>
            {divideCandidatesIntoGroups(data.dataCandidatosPremium).map((group, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <div className="d-flex justify-content-center">
                  {group.map((candidato, index) => (
                    <Card key={index} className="  w-40 h-40">
                      <Card.Header>
                        <div className="mt-3 mb-4">
                          <img src="/AlcoSloganLogo.png" className="w-100" alt="Logo" />
                        </div>
                      </Card.Header>
                      <Card.Body className="text-center">
                        <span className="badge bg-success rounded-pill">
                          <FontAwesomeIcon icon={faLocation} /> Perfil certificado
                        </span>
                        <h4 className="mb-2">{candidato.personaData.nombre} {candidato.personaData.apellido}</h4>
                        <p className="text-muted mb-4">{candidato.Candidato.perfil.puestoDeseado}</p>
                        <div className="text-muted mb-4">
                          <FontAwesomeIcon icon={faLocation} />
                          Venezuela
                        </div>
                        <div className="mb-4 pb-2 p-2">
                <a
                  href={`https://wa.me/${candidato.personaData.telefono}?text=Hola%20te%20estamos%20contactando%20desde%20La%20web%20AlcoEmpleo%20y%20estamos%20Interesados%20en%20tu%20perfil`}
                  className="btn btn-success btn-sm rounded"
                >
                  Enviar mensaje
                </a>
              </div>
              <a href={`/enterprise/candidateProfile/${candidato._id}`} className="btn btn-primary btn-large">
                Ver Perfil
              </a>
                        
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Carousel.Item>
            ))}
      </Carousel>


      <Footer />
    </div>
  );
}
