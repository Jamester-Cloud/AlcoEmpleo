import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faTowerBroadcast,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Image, Row } from "react-bootstrap";

export default function Contact(props: any) {
  let { telefonos, direccionFisica, politicaPrivacidad } = props
  console.log(direccionFisica)
  const whatsappMessage = encodeURIComponent(
    "Hola Contacto desde AlcoEmpleo, necesito orientación sobre su servicio"
  );

  return (
    <div className="bg-blue-950 text-white">
      <div className="container ">
        <Row
          className=""
        >
          <Col className="text-white md:w-1/2  md:mb-0 mb-4 h-full">
            <Image
              src="/Logo 3.png"
              width={1730}
              height={2534}
              className="w-60"
              alt="Hombre"
            />
          </Col>
          {/* Contactanos*/}
          <Col className="text-white pt-4 md:w-1/2  md:mb-0 mb-4 h-full">
            {" "}
            {/* Agrega la clase h-full */}
            <h2 className="text-lg md:text-xl font-bold text-center">
              <FontAwesomeIcon icon={faPhone} /> Contáctanos
            </h2>

            <div className="flex flex-col text-center mt-4">
              {telefonos?.map((item: any, key: number) => {
                return (
                  <a
                    key={key}
                    target="_blank"
                    href={`https://wa.me/${item.numero}?text=${whatsappMessage}`}
                    className="mdi mdi-whatsapp text-green-600 text-decoration-none"
                  >
                    <span className="text-white transition-opacity duration-300 hover:opacity-50 ">
                     {item.numero}
                    </span>
                  </a>
                )
              })}
            </div>
          </Col>
          <Col className="text-white pt-4 md:w-1/2  md:mb-0 mb-4 h-full">
            <h2 className="text-lg md:text-xl font-bold text-center">
              <FontAwesomeIcon icon={faTowerBroadcast} /> Redes Sociales
            </h2>
            <div className="flex justify-center mt-4">
              <Link
                href={`https://www.instagram.com/grupoalcoac/`}
                className="mdi text-white mdi-instagram mdi-36px text-decoration-none transition-opacity duration-300 hover:opacity-50"
              ></Link>
              <Link
                href={`https://www.instagram.com/tu_usuario_instagram`}
                className="mdi mdi-facebook text-white mdi-36px text-decoration-none transition-opacity duration-300 hover:opacity-50"
              ></Link>
            </div>

            <Link
              href="#"
              className="text-white text-center text-decoration-none transition-opacity duration-300 hover:opacity-50 block mt-4"
            >
              <p>Política de Privacidad</p>
            </Link>
          </Col>
          {/* Direccion/Mapa */}
          <Col className="flex flex-col items-center justify-center rounded-2xl text-white pt-4 md:w-1/2 h-full">
            <h2 className="text-lg md:text-xl font-bold text-center">
              <FontAwesomeIcon icon={faLocation} /> Dirección
            </h2>
            <div className="flex justify-center items-center w-full md:w-3/4  mt-4 ">
              <iframe
                className="rounded-2xl"
                title="map"
                src={direccionFisica}
                width="100%"
                height="200px"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
