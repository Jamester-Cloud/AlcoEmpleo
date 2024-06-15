"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faGraduationCap, faMessage } from "@fortawesome/free-solid-svg-icons";
//import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function CardCandidate(props: any) {
  const { data } = props;
  const whatsappMessage = encodeURIComponent("Saludos cordiales, hemos visto tu perfil en alcoempleo.com");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center max-w-xs mx-auto">
      <div className="bg-green-500 text-white rounded-full px-2 py-1 mb-4 text-xs flex items-center">
        <FontAwesomeIcon icon={faGraduationCap} className="mr-1" />
        Perfil certificado
      </div>
      <div className="w-24 h-24 mb-4">
        <Image
          width={96}
          height={96}
          alt="Profile Image"
          src="/Imagen-card.png"
          className="rounded-full"
        />
      </div>
      <h4 className="text-lg font-bold mb-2">
        {data?.personaData?.nombre} {data?.personaData?.apellido}
      </h4>
      <p className="text-sm text-gray-600 mb-4">{data?.Candidato?.perfil?.puestoDeseado}</p>
      <div className="text-sm text-gray-600 mb-4 flex items-center justify-center">
        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
        Venezuela
      </div>
      <div className="flex space-x-2">
        <a
          target="_blank"
          href={`https://wa.me/${data?.personaData?.telefono}?text=${whatsappMessage}`}
          className="btn btn-success text-white text-xs py-2 px-4 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faMessage} className="mr-1" />

          Enviar mensaje
        </a>
        <Link href={`/enterprise/candidateProfile/${data._id}`} className="btn btn-primary text-white text-xs py-2 px-4 rounded">
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}
