"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faGraduationCap, faMessage } from "@fortawesome/free-solid-svg-icons";
//import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function CardCandidate(props: any) {
  const { data } = props;
  // console.log("Datos en la tarjeta: ",data)
  const whatsappMessage = encodeURIComponent("Saludos, te estamos contactando a través de la página de Alcoempleos. Nos interesó tu perfil.");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center  max-h-ms max-w-xs mx-auto">
      <div className="bg-green-500 text-white rounded-full px-2 py-1 mb-4 text-xs flex items-center">
        <FontAwesomeIcon icon={faGraduationCap} className="mr-1" />
        Perfil certificado
      </div>
      <div className="max-h-96 rounded-full">
        <Image
          //style={{objectFit:"cover"}}
          width={100}
          height={100}
          alt="Profile Image"
          unoptimized
          src={data?.documentos?.idArchivo ? `/api/candidate/profilePic?idArchivo=${data.documentos.idArchivo}` : '/Imagen-card.png'}
          className="rounded-full img-fluid"
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
      <div className="flex-grow"></div>
      <div className="flex space-x-2 mt-4">
        <a
          target="_blank"
          href={`https://wa.me/${data?.personaData?.telefono}?text=${whatsappMessage}`}
          className="btn btn-success text-white text-xs py-2 px-4 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faMessage} className="mr-1" />
          Enviar mensaje
        </a>
        <Link href={`/enterprise/candidateProfile/${data._id}`} target="_blank" className="btn btn-primary text-white text-xs py-2 px-4 rounded">
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}
