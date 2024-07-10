/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";

import { CandidateListResponse } from "./interfaces/types";
import Cabecera from "./components/cabeceras/cabecera";
import { CarouselMulti } from "./components/CarouselMulti/CarouselMulti";
import Contact from "./components/Contact/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faCreditCard,
  faFile,
  faLocation,
  faTowerBroadcast,
  faPhone,
  faSignInAlt,
  faUserPlus,
  faFileCircleCheck,
  faFileContract,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [data, setData] = useState<CandidateListResponse>({
    dataCandidatosPremium: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CandidateListResponse>(
          "api/enterprise/candidateList/premiums"
        );
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
      <div className="w-full d-flex d-flex justify-content-center">
        <Cabecera></Cabecera>
      </div>
      <Carousel className="">
        <Carousel.Item className="relative h-64 md:h-96 lg:h-128 xl:h-144">
          <div className="w-full h-full relative">
            <Image
              src="/slider/slider1.jpg"
              layout="fill"
              objectFit="cover"
              alt="Encuentra Tu Próxima Oportunidad Laboral"
              className="absolute w-100 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
            <h3 className="text-lg md:text-2xl font-bold">
              Encuentra Tu Próxima Oportunidad Laboral
            </h3>
            <p className="text-sm md:text-lg my-2">
              Únete a ALCOEMPLEO y haz que tu perfil profesional sea visible
              para cientos de empresas venezolanas. ¡Publica tu CV y empieza a
              recibir ofertas de empleo hoy mismo!
            </p>
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
            <h3 className="text-lg md:text-2xl font-bold">
              Empresas Buscando Talento Como Tú
            </h3>
            <p className="text-sm md:text-lg my-2">
              En ALCOEMPLEO, las empresas pueden encontrar el personal adecuado
              rápidamente y sin complicaciones. Publica tus vacantes y accede a
              una base de talento humano certificado.
            </p>
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
            <h3 className="text-lg md:text-2xl font-bold">
              Destaca en el Mercado Laboral
            </h3>
            <p className="text-sm md:text-lg my-2">
              Mejora tus habilidades con nuestros cursos online y aumenta tu
              atractivo para los empleadores. ALCOEMPLEO te ofrece las
              herramientas para destacar.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="text-center justify-content-center">
        <h1 className="text-blue-900 font-bold pt-20 sm:pt-32 md:pt-40 lg:pt-48">
          Expertos Recomendados
        </h1>
        <h4 className="text-blue-900 pb-20">Recomendados por otras empresas</h4>
      </div>
      <CarouselMulti candidates={data.dataCandidatosPremium} />
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bgLogin.png')" }}
      >
        <div className="absolute inset-0 bg-blue-950 bg-opacity-60 flex flex-col justify-center items-center text-white z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-left">
                ¡Aumenta la posibilidad de encontrar{" "}
                <span className="text-blue-500">trabajo!</span>
              </h4>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Registrar
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <img
                    src="icons/Register.svg"
                    alt="Regístrate"
                    className="p-3 md:p-4"
                  />
                </div>
                <div>
                  <h2 className=" text-base md:text-lg font-bold">
                    Regístrate
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    Haz clic en PUBLICA TU PERFIL, llena la información básica
                    del formulario y tendrás tu cuenta registrada. NOTA: Debes
                    ser mayor de edad
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <img
                    src="icons/Iniciar Sesión.svg"
                    alt="Inicia Sesión"
                    className="p-3 md:p-4"
                  />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold">
                    Inicia Sesión
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    Completa tu perfil con los datos solicitados. Describe tu
                    experiencia laboral, tus conocimientos, tus habilidades y
                    las cosas más importantes de tu oferta de servicio
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <img
                    src="icons/Publicar Información.svg"
                    alt="Publicar Información"
                    className="p-3 md:p-4"
                  />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold">
                    Publicar tu información
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    Posterior a la activación del plan publica tu información
                    para que seas visible en nuestra web
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <img
                    src="icons/Escoje un Plan.svg"
                    alt="Escoje un Plan"
                    className="p-3 md:p-4"
                  />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold">
                    Escoge un Plan
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    Escoge entre planes que ofrecemos y se adapte a tus
                    requerimientos, sigue los pasos para activarlo y disfruta de
                    las ventajas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 h-52 items-center justify-between mb-6">
        <h1 className="text-blue-900 mx-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
          ¿Por qué tu perfil debe estar en alcoempleo.com?
        </h1>
        <p className="text-left mx-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6">
          Nuestra plataforma es la única que te ofrece un contacto directo entre
          postulante y la empresa, permite abrir el campo de la oferta y la
          demanda laboral
        </p>
      </div>
      <div className="relative min-h-screen bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-950 flex flex-col justify-center items-center text-white z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 lg:gap-12 xl:gap-16">
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <p className="my-2 text-gray-800 text-6xl">1</p>
                </div>
                <div>
                <h2 className=" text-base md:text-lg font-bold">
                    Te hace visible ante un mundo de oportunidades laborales.
                  </h2>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <p className="my-2 text-gray-800 text-6xl">2</p>
                </div>
                <div>
                <h2 className=" text-base md:text-lg font-bold">
                    Puedes crecer junto a nosotros, aumentando las posibilidades
                    de conseguir la mejor oferta laboral.
                  </h2>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <p className="my-2 text-gray-800 text-6xl">3</p>
                </div>
                <div>
                <h2 className=" text-base md:text-lg font-bold">
                    Aprueba nuestros test y cetifícate como trabajador
                    recomendado, obtén las mejores oportunidades de empleo.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container className="py-20">
        <Row className="justify-content-center">
          <Col md={6} className="mb-8 md:mb-0">
            <h1 className="text-blue-900 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
              Contáctanos
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6">
              ¡Déjanos tus datos para comunicarnos contigo lo antes posible!
            </p>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nombres y apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu nombre completo"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introduce tu correo electrónico"
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Deja tu mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Introduce tu mensaje"
                />
              </Form.Group>
              <Button className="w-full" variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
          <Col className="text-center">
            <Image
              src="/contactImage.png"
              width={1730}
              height={2534}
              className="w-80"
              alt="Hombre"
            />
          </Col>
        </Row>
      </Container>
      <Contact />
      <Footer />
    </div>
  );
}
