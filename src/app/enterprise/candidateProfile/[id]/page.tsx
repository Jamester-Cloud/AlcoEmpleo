"use client";
import CabeceraEmpresa from "@/app/components/cabeceras/cabeceraEmpresa";
import {
  faClipboard,
  faCopy,
  faEllipsisV,
  faFlag,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EnterpriseProfilePage({ params }: any) {

  let { id } = params;
  const [data, setData]: any = useState();

  const [cv, setCv]: any = useState();
  const [profilePicture, setProfilePicture]: any = useState();

  const [isVisible, setIsVisible] = useState(false);
  const whatsappMessage = encodeURIComponent(
    "Hola Contacto desde AlcoEmpleo, estamos Interesados en tu perfil"
  );

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const fetchCandidateData = async () => {
    try {
      
      const response = await axios.post("/api/enterprise/candidate", {
        id: id,
      });

      setCv(response?.data?.cv[0]?.documentos?.idArchivo)
      setProfilePicture(response.data.profilePicture[0].documentos.idArchivo)

      setData(response.data.data[0]);

      console.log(data);
    } catch (error) {
      console.log("Peticion errada", error);
    }
  };

  useEffect(() => {
    if (!data) {
      (async () => {
        try {
          await fetchCandidateData();
        } catch (err) {
          console.log("Error al cargar los datos del usuario");
        }
      })();
    }
  });


  return (
    <div className="container mx-auto">
      <div className="mt-2 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-2">
          <div className="card mb-3">
            <div className="card-body flex flex-col items-center text-center">
              <Image
                src={profilePicture ? `/api/candidate/profilePic?idArchivo=${profilePicture}` : '/Imagen-card.png'}
                alt="Admin"
                height={50}
                className="rounded-full"
                width={100}
              />
              <h4>{data?.personaData?.nombre} {data?.personaData?.apellido}</h4>
              <h6 className="text-blue-500">{data?.emailUsuario}</h6>
              <p className="text-secondary mb-0">{data?.candidato?.perfil?.puestoDeseado}</p>
              <div className="mt-2 space-y-2 w-full">
                {cv ? <a href={`/api/candidate/download?idArchivo=${cv}`} className="btn btn-primary w-full">
                  Descargar CV
                </a> : 'Sin Curriculum Vitae'}
                <button className="btn btn-success w-full">
                  <Link
                    href={`https://wa.me/${data?.personaData?.telefono}?text=${whatsappMessage}`}
                    className="mdi mdi-whatsapp text-white text-decoration-none w-full"
                    passHref
                  >
                    Contactar
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <p>Redes de contacto</p>
          <div className="card mt-3 w-full">
            <ul className="list-group list-group-flush">
              {data?.candidato?.redes?.map((item: any, key: number) => (
                <li key={key} className="list-group-item d-flex justify-between items-center">
                  <h6 className="mb-0">
                    {/* <FontAwesomeIcon icon={faCopy} className="cursor-pointer mr-1" /> */}
                  </h6>
                  <a href={`${item.enlace}`} target="_blank">@{item.enlace}</a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3">Sobre Mí</p>
          <div className="card mt-3 mb-2 p-2">
            {data?.candidato?.perfil?.descripcionPersonal}
          </div>
        </div>
        <div className="w-full md:flex-1 p-2">
          <div className="card mb-3">
            <div className="card-body">
              {/* Experiencias */}
              <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                  <h2 className="text-xl font-semibold">
                    Experiencias Laborales
                  </h2>
                </div>
                {data?.candidato?.experiencias?.map((item: any, key: number) => (
                  <div key={key} className="bg-gray-200 shadow-md rounded-lg p-6 mb-8 pb-8">
                    <div className="text-right">
                      <button className="btn" onClick={handleButtonClick}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-blue-600 text-2xl">
                          {item.nombreEmpresa}
                        </label>
                        <label className="text-black text-xl">
                          {item.duracion}
                        </label>
                        <p className="text-gray-900">{item.descripcion}</p>
                      </div>
                      <div className="flex flex-col">
                        {isVisible && (
                          <div>
                            <hr />
                            <p className="text-xl text-blue-600">
                              <strong>Logros</strong>
                            </p>
                            <div className="ml-2">
                              <ul>
                                {item.logros.map((logro: any, key: number) => (
                                  <li key={key}>
                                    {logro.descripcionLogro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-xl mt-5 text-blue-600">
                              <strong>Referencias</strong>
                            </p>
                            <div className="ml-2">
                              <ul>
                                {item.referencias.map((ref: any, key: number) => (
                                  <li key={key}>
                                    {ref.referencia}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formaciones académicas */}
              <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                  <h2 className="text-xl font-semibold">Educación</h2>
                </div>
                {data?.candidato?.formacionesAcademicas.map((item: any, key: number) => (
                  <div key={key} className="bg-gray-200 shadow-md rounded-lg p-6 mb-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-blue-600 text-2xl">
                          {item.titulo}
                        </label>
                        <label className="text-black text-xl">
                          {item.institucion}
                        </label>
                        <p className="text-gray-900">{item.duracion}</p>
                        <p className="text-gray-900">{item.tipoFormacion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Habilidades */}
              <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                  <h2 className="text-xl font-semibold">Habilidades</h2>
                </div>
                <div className="flex flex-wrap md:flex-nowrap space-x-4">
                  {data?.candidato?.habilidad?.map((item: any, key: number) => (
                    <div key={key} className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4">
                      {item.nombreHabilidad}
                      <br />
                      <p>{item.nivelHabilidad}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
