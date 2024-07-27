/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer/footer";
import Spinner from "./components/Spinner/Spinner";
import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { CandidateListResponse } from "./interfaces/types";
import Cabecera from "./components/cabeceras/cabecera";
import { CarouselMulti } from "./components/CarouselMulti/CarouselMulti";
import Contact from "./components/Contact/Contact";

export default function Home() {

  const router = useRouter()

  const [data, setData] = useState<CandidateListResponse>({
    dataCandidatosPremium: [],
  });
  const [homePageData, setHomePageData]: any = useState();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CandidateListResponse>(
          "api/enterprise/candidateList/premiums"
        );
        const homeData = await axios.post('/api/administrator/homepage');
        setHomePageData(homeData.data)
        setData(response.data);
        console.log(homeData.data);
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
        {homePageData?.homePage[0]?.sliders.map((item: any, key: number) => {
          return (
            <Carousel.Item key={key} className="relative h-64 md:h-96 lg:h-128 xl:h-144">
              <div className="w-full h-full relative">
                <Image
                  src={item.imagen.ruta}
                  layout="fill"
                  objectFit="cover"
                  alt="Encuentra Tu Próxima Oportunidad Laboral"
                  className="absolute w-100 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <Carousel.Caption className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
                <h3 className="text-lg md:text-2xl font-bold">
                  {item.titulo}
                </h3>
                <p className="text-sm md:text-lg my-2">
                  {item.texto}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
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
              <button onClick={() => router.push('/signup/enterprise')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Registrarse
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
                    {homePageData.homePage[0].secciones[0].titulo}
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    {homePageData.homePage[0].secciones[0].texto}
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-row items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4">
                  <img
                    src="icons/Iniciar sesión.svg"
                    alt="Inicia Sesión"
                    className="p-3 md:p-4"
                  />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold">
                    {homePageData.homePage[0].secciones[1].titulo}

                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    {homePageData.homePage[0].secciones[1].texto}
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
                    {homePageData.homePage[0].secciones[2].titulo}
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    {homePageData.homePage[0].secciones[2].texto}
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
                    {homePageData.homePage[0].secciones[3].titulo}
                  </h2>
                  <p className="text-sm text-center md:text-left px-2">
                    {homePageData.homePage[0].secciones[3].texto}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="mt-20 h-52 items-center justify-between mb-6">
        <h1 className="text-blue-900 mx-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
        {homePageData.homePage[0].banner[0].titulo}
        </h1>
        <p className="text-left mx-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6">
        {homePageData.homePage[0].banner[0].texto}
        </p>
      </div>
      <div className="relative min-h-screen bg-cover bg-center">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 md:gap-12 xl:gap-16">
              <div className="text-center flex items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4 flex justify-center items-center">
                  <p className="text-gray-800 mx-4 my-4 text-4xl md:text-5xl">
                  {homePageData.homePage[0].secciones[4].titulo}
                  </p>
                </div>
                <div>
                  <h2 className="text-base mt-4 md:text-lg font-bold">
                  {homePageData.homePage[0].secciones[4].texto}
                  </h2>
                </div>
              </div>
              <div className="text-center flex items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4 flex justify-center items-center">
                  <p className="text-gray-800 mx-4 my-4 text-4xl md:text-5xl">
                  {homePageData.homePage[0].secciones[5].titulo}
                  </p>
                </div>
                <div>
                  <h2 className="text-base mt-4 md:text-lg font-bold">
                  {homePageData.homePage[0].secciones[4].texto}
                  </h2>
                </div>
              </div>
              <div className="text-center flex items-start">
                <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-full flex-shrink-0 mr-4 flex justify-center items-center">
                  <p className="text-gray-800 mx-4 my-4 text-4xl md:text-5xl">
                  {homePageData.homePage[0].secciones[5].titulo}
                  </p>
                </div>
                <div>
                  <h2 className="text-base mt-4 md:text-lg font-bold">
                  {homePageData.homePage[0].secciones[5].texto}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-950" style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-50 bg-cover bg-right" style={{ backgroundImage: "url('/chicaLentes.png')" }}></div>
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
      <Contact telefonos={homePageData.homePage[0].celular} direccionFisica={homePageData.homePage[0].direccion} politicaPrivacidad={homePageData.homePage[0].politicaPrivacidad} />
      <Footer />
    </div>
  );
}
