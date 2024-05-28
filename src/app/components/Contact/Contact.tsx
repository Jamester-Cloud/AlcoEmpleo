import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faTowerBroadcast, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const whatsappMessage = encodeURIComponent("Hola Contacto desde AlcoEmpleo, necesito orientación sobre su servicio");

  return (
    <div className="bg-primary text-white flex items-center justify-center p-2">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between">
              {/* Contactanos*/}
          <div className="bg-light rounded-2xl text-black p-4 md:w-1/2 md:mr-4 md:mb-0 mb-4 h-full"> {/* Agrega la clase h-full */}
            <h2 className="text-lg md:text-xl font-bold text-center"><FontAwesomeIcon icon={faPhone}/> CONTÁCTANOS</h2>
            <div className='flex flex-col text-center mt-4'>
              <Link href={`https://wa.me/+584143524358?text=${whatsappMessage}`} className="mdi mdi-whatsapp text-green-600 text-decoration-none">
                <span className='text-black transition-opacity duration-300 hover:opacity-50 '>04143524358</span>
              </Link>
              <Link href={`https://wa.me/+584143524358?text=${whatsappMessage}`} className="mdi mdi-whatsapp text-green-600 text-decoration-none">
                <span className='text-black transition-opacity duration-300 hover:opacity-50 '>04245762288</span>
              </Link>
              <Link href={`https://wa.me/+584143524358?text=${whatsappMessage}`} className="mdi mdi-whatsapp text-green-600 text-decoration-none">
                <span className='text-black transition-opacity duration-300 hover:opacity-50 cursor-pointer'>04145299886</span>
              </Link>
              <Link href={`https://wa.me/+584143524358?text=${whatsappMessage}`} className="mdi mdi-whatsapp text-green-600 text-decoration-none">
                <span className='text-black transition-opacity duration-300 hover:opacity-50 '>04125422413</span>
              </Link>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-center mt-8"><FontAwesomeIcon icon={faTowerBroadcast}/> Redes Sociales</h2>
            <div className="flex justify-center mt-4">
              <Link href={`https://www.instagram.com/grupoalcoac/`} className="mdi text-black mdi-instagram mdi-36px text-decoration-none transition-opacity duration-300 hover:opacity-50">
              </Link>
              <Link href={`https://www.instagram.com/tu_usuario_instagram`} className="mdi mdi-facebook text-black mdi-36px text-decoration-none transition-opacity duration-300 hover:opacity-50">
              </Link>
            </div>
            <Link href="#" className='text-black text-center text-decoration-none transition-opacity duration-300 hover:opacity-50 block mt-4'>
              <p>Política de Privacidad</p>
            </Link>
          </div>
          {/* Direccion/Mapa */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-light text-black p-4 md:w-1/2 h-full"> 
            <h2 className="text-lg md:text-xl font-bold text-center mb-4"><FontAwesomeIcon icon={faLocation}/> Dirección</h2>
            <p className='w-full md:w-3/4 text-center'>Av. Libertador, edificio Salón Americano, piso 2 oficina 15,  Acarigua, Estado Portuguesa.</p>
            <div className="flex justify-center items-center w-full md:w-3/4 mx-auto mt-4">
              <iframe  
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1968.006653670945!2d-66.08147317832173!3d9.552886993188067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fcd757f7d1771f3%3A0x4ba79d78d15d742e!2sAvenida%20Libertador%20con%20Calle%2029%2C%20Acarigua!5e0!3m2!1sen!2sve!4v1621344786353!5m2!1sen!2sve"
                width="100%"
                height="210px"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
