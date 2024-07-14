"use client";
import CabeceraEmpresa from "@/app/components/cabeceras/cabeceraEmpresa";
import {
  faClipboard,
  faCopy,
  faFlag,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function EnterpriseProfilePage({ params }: any) {
  let { id } = params;
  const [data, setData]: any = useState();

  const fetchCandidateData = async () => {
    try {
      const response = await axios.post("/api/enterprise/candidate", {
        id: id,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Peticion errada");
    }
  };

  useEffect(() => {
    if (!data) {
      (async () => {
        try {
          const userData = await fetchCandidateData();

          setData(userData);
        } catch (err) {
          console.log("Error al cargar los datos el usuario");
        }
      })();
    }
  });

  return (
    <div className="container mx-auto">
      <div className="mt-2 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="pr-4  ">
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <Image
                    src="/AlcoLogo.png"
                    alt="Admin"
                    height={50}
                    className="rounded-circle"
                    width="100"
                  />
                  <h4>Datos</h4>
                  <p className="text-secondary mb-0">Full Stack Developer</p>
                  <p className="text-muted mb-0 font-size-sm">
                    Bay Area, San Francisco, CA
                  </p>
                  <div className="row mt-1">
                    <button className="btn btn-primary mb-2">
                      Descargar CV
                    </button>
                    <button className="btn btn-success">Contactar</button>
                  </div>
                </div>
              </div>
            </div>
            <p>Sitios Web</p>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="cursor-pointer mr-1"
                    />
                    Website
                  </h6>
                  <span className="text-secondary">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="cursor-pointer mr-1"
                    />
                    Github
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="cursor-pointer mr-1"
                    />
                    X
                  </h6>
                  <span className="text-secondary">@bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="cursor-pointer mr-1"
                    />
                    Instagram
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="cursor-pointer mr-1"
                    />
                    Facebook
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
            <p className="mt-3">Sobre Mí</p>
            <div className="card mt-3 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              eveniet doloribus facere magnam, tempora dignissimos dolores
              labore quasi, eum nam assumenda! Quibusdam architecto nam, quas
              laborum atque fugit ab consequatur.
            </div>
            <p className="mt-3">
              <FontAwesomeIcon icon={faFlag} className="mr-1" />
              Se unió el 24/06/2024
            </p>
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
                {/* {candidatoData?.candidatoData?.experiencias?.map((item: any, key: number) => (
          <div key={key} className="bg-gray-200 shadow-md rounded-lg p-6 mb-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-blue-600 text-2xl">
                  {item.nombreEmpresa}
                </label>
                <label className="text-black text-xl ">
                  {item.duracion}
                </label>
                <p className="text-gray-900"></p>
                <p className="text-gray-900">
                  {item.descripcion}
                </p>
              </div>
            </div>
          </div>

        ))} */}
              </div>

              {/* Formaciones academicas */}
              <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                  <h2 className="text-xl font-semibold">Educación</h2>
                </div>
                {/* {candidatoData?.candidatoData?.formacionesAcademicas.map((item: any, key: number) => (
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
                <p className="text-gray-900"></p>
                <p className="text-gray-900">
                  {item.tipoFormacion}
                </p>
              </div>
            </div>
          </div>
        ))} */}
              </div>

              {/* Habilidades */}
              <div className="container mx-auto mt-5 p-4">
                <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                  <h2 className="text-xl font-semibold">Habilidades</h2>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                    Gerente Creativo
                  </div>
                  <div className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                    Diseñador Grafico
                  </div>
                  <div className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                    Suite Adobe
                  </div>
                  <div className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                    Figma
                  </div>
                </div>
                {/* {candidatoData?.candidatoData?.habilidad?.map((item: any, key: number) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            key={item._id}
          >
            <div>
              <label className="text-gray-700">Empresa</label>
              <p className="text-gray-900">{item.nombreHabilidad}</p>
            </div>
            <div className="text-right">
              <button
                className="text-blue-500"
                onClick={(e) =>
                  handleModal(
                    e,
                    "Habilidades editar",
                    item,
                    candidatoData._id
                  )
                }
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button onClick={deleteItem} className=" ml-5 text-red-500">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
