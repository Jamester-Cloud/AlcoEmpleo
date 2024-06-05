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
          "api/enterprise/candidateList"
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
      <div style={{ minWidth: '560px' }} className="w-full d-flex d-flex justify-content-center">
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
        <h1 className=" text-blue-900 font-bold pt-20">
          Expertos Recomendados
        </h1>
        <h4 className=" text-blue-900 pb-20">
          Recomendados por otras empresas
        </h4>
      </div>
      {/* Usamos el componente CandidateCarousel */}
      <CarouselMulti candidates={data.dataCandidatosPremium} />

      <div className="relative h-64 md:h-96 lg:h-128 xl:h-144">
        <div className="w-full h-full relative">
          <Image
            src="/slider/slider1.jpg"
            layout="fill"
            objectFit="cover"
            alt="Encuentra Tu Próxima Oportunidad Laboral"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950 bg-opacity-50"></div>
        </div>
        <div className="text-center justify-content-center absolute top-0 mr-10 ml-10 text-white z-10">
          <h1 className="text-white font-bold">Expertos Recomendados</h1>
          <h4 className="text-white font-bold">Conoce más sobre nosotros</h4>
          <p className="text-center text-sm md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            voluptate optio nostrum asperiores voluptatem error accusantium!
            Blanditiis alias soluta placeat inventore, in at minus officia illo
            vel nemo tempore provident. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolor asperiores sequi aliquid. Eaque explicabo,
            vero laboriosam ab aliquam tempora est nisi quaerat eos ut sed animi
            ratione qui eum fugit?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. In voluptates consequuntur, est quam veritatis
            error placeat dolores accusamus! Odio facere quisquam, dolores ipsum
            recusandae vero obcaecati aut magni quam deserunt!
          </p>
        </div>
      </div>
      <div>
      <Container>
        <Row>
          <Col md={6} className="justify-content-center">
            <h1 className="text-blue-900 font-bold">Contáctanos</h1>
            <p>¡Déjanos tus datos para comunicarnos contigo lo antes posible!</p>

            <Form className="w-72">
              <Form.Group controlId="formName form-control">
                <Form.Label>Nombres y apellidos</Form.Label>
                <Form.Control type="text" placeholder="Introduce tu nombre completo" />
              </Form.Group>

              <Form.Group controlId="formEmail form-control">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Introduce tu correo electrónico" />
              </Form.Group>

              <Form.Group controlId="formMessage form-control">
                <Form.Label>Deja tu mensaje</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Introduce tu mensaje" />
              </Form.Group>

              <Button className="mt-3 mb-3 w-32" variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Col>
          <Col className="text-center justify-content-center">
          <Image
                           src="/contactImage.png"
                           width={1730}
                           height={2534}
                           className="w-80"
                           alt="Hombre"/>
          </Col>
        </Row>
      </Container>
    </div>
      {/* <div className="bg-primary pt-32  p-2 d-grid md:grid-cols-2   lg:grid-cols-4  sm:grid-cols-1  ">
        <div className=" bg-white rounded m-1  p-2">
          <h2 className=" text-center">
            {" "}
            <FontAwesomeIcon icon={faUsers} /> Registrarse
          </h2>
          <p className="">
            Haz click en <span className=" font-bold">"Registrarse"</span>,
            selecciona tu rol si eres{" "}
            <span className=" font-bold"> "Candidato"</span> o{" "}
            <span className=" font-bold"> "Empleador"</span>, llena el
            formulario de registro y tendrás tu cuenta activa. Debes ser mayor
            de edad.{" "}
          </p>
        </div>

        <div className=" bg-white rounded  m-1 p-2">
          <h2 className=" text-center">
            <FontAwesomeIcon icon={faUser} /> Inicia Sesión
          </h2>
          <p>
            Completa tu perfil con los datos solicitados. Describe tu{" "}
            <span className=" font-bold"> experiencia laboral </span>,
            <span className=" font-bold"> tus habilidades </span> y la
            información que consideres más importante de tu perfil.{" "}
          </p>
        </div>

        <div className=" bg-white rounded  m-1 p-2">
          <h2 className=" text-center">
            <FontAwesomeIcon icon={faCreditCard} /> Escoge un plan{" "}
          </h2>
          <p>
            Entre los planes que ofrecemos y se adapten a tus requerimientos,
            sigue los pasos para activarlo y disfruta de las ventajas{" "}
          </p>
        </div>
        <div className=" bg-white rounded  m-1 p-2">
          <h2 className=" text-center">
            <FontAwesomeIcon icon={faFile} /> Publica Tu Perfil{" "}
          </h2>
          <p>
            Posterior a la activación del plan, publica tu información para que
            seas visible en nuestra plataforma.
          </p>
        </div>
      </div> */}

      <Contact />

      <Footer />
    </div>
  );
}
