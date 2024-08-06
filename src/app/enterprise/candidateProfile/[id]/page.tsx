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

export default function EnterpriseProfilePage({ params }: any) {

  let { id } = params;
  const [data, setData]: any = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const fetchCandidateData = async () => {
    try {
      const response = await axios.post("/api/enterprise/candidate", {
        id: id,
      });
      console.log(response.data.data)
      setData(response.data.data[0]);

      console.log(data);
    } catch (error) {
      console.log("Peticion errada");
    }
  };

  useEffect(() => {
    if (!data) {
      (async () => {
        try {
          await fetchCandidateData();
        } catch (err) {
          console.log("Error al cargar los datos el usuario");
        }
      })();
    }
  });

  return (
    <div className="container mx-auto">
      <div className="mt-2 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 w-25">
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
                  <p className="text-secondary mb-0">{data?.candidato?.perfil?.puestoDeseado}</p>
                  <div className="row mt-1">
                    <button className="btn btn-primary mb-2">
                      Descargar CV
                    </button>
                    <button className="btn btn-success">Contactar</button>
                  </div>
                </div>
              </div>
            </div>
            <p>Redes de contacto</p>
            <div className="card mt-3 w-100">
              <ul className="list-group list-group-flush">
                {data?.candidato?.redes?.map((item: any, key: number) => {
                  return (
                    <li key={key} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0 w-100">
                        {/* <FontAwesomeIcon
                          icon={faCopy}
                          className="cursor-pointer mr-1"
                        /> */}
                      </h6>
                      <a href={`${item.enlace}`} target="_blank" > @{item.enlace}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <p className="mt-3">Sobre Mí</p>
            <div className="card mt-3 mb-2 p-2">
              {data?.candidato?.perfil?.descripcionPersonal}
            </div>
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
                    <div className="row text-right">
                      <div className="col-md-12">
                        <button className="btn " onClick={handleButtonClick}>
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                      </div>
                    </div>
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
                      <div className="flex flex-col">
                        {isVisible && (
                          <div>
                            <hr />
                            <p className="text-xl text-blue-600">
                              <strong>Logros</strong>
                            </p>
                            <div className="ml-2">
                              <ul>
                                {item.logros.map((item: any, key: number) => {
                                  return (
                                    <li key={key}>
                                      {item.descripcionLogro}
                                    </li>
                                  )
                                })}
                              </ul>
                              {/* <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                                amet aspernatur facilis distinctio accusamus? Aut, eum! Ullam
                                sint ipsum ducimus exercitationem porro, necessitatibus
                                commodi adipisci. Beatae nobis quam quas rerum.
                              </li>
                              <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                                amet aspernatur facilis distinctio accusamus? Aut, eum! Ullam
                                sint ipsum ducimus exercitationem porro, necessitatibus
                                commodi adipisci. Beatae nobis quam quas rerum.
                              </li>
                              <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                                amet aspernatur facilis distinctio accusamus? Aut, eum! Ullam
                                sint ipsum ducimus exercitationem porro, necessitatibus
                                commodi adipisci. Beatae nobis quam quas rerum.
                              </li>
                              <li>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                                amet aspernatur facilis distinctio accusamus? Aut, eum! Ullam
                                sint ipsum ducimus exercitationem porro, necessitatibus
                                commodi adipisci. Beatae nobis quam quas rerum.
                              </li> */}
                            </div>
                            <p className="text-xl mt-5 text-blue-600">
                              <strong>Referencias </strong>
                            </p>
                            <div className="ml-2">
                              <ul>
                                {item.referencias.map((item: any, key: number) => {
                                  return (
                                    <li key={key}>
                                      {item.referencia}
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div className="pt-10 w-full md:w-full items-center">
                              {/* <button
                                type="submit"
                                className="w-1/2  md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                              >
                                Postularme
                              </button> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formaciones academicas */}
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
                        <p className="text-gray-900"></p>
                        <p className="text-gray-900">
                          {item.tipoFormacion}
                        </p>
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
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {data?.candidato?.habilidad?.map((item: any, key: number) => {
                    return (
                      <div key={key} className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                        {item.nombreHabilidad}
                        <br />
                        <p>
                          {item.nivelHabilidad}
                        </p>
                      </div>
                    )
                  })}
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
