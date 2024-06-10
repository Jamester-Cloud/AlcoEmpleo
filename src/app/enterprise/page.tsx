"use client";
import React from "react";
import axios from "axios";
import ListCarousel from "../components/carousel/Carousel";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Link from "next/link";

export default function CandidateSearch() {
  const [data, setData]: any = React.useState();
  const [premiumsData, setPremiumsData]: any = React.useState();

  const fetchAllCandidates = async () => {
    //
    try {
      const response: any = await axios.get("/api/enterprise/candidateList");
      console.log(response.data);
      if (response.status == 200)
        return {
          candidatos: response.data.dataCandidatos,
          candidatosPremiums: response.data.dataCandidatosPremium,
        };
    } catch (error) {}
  };

  React.useEffect(() => {
    if (!data && !premiumsData) {
      (async () => {
        try {
          const dataCandidates: any = await fetchAllCandidates();
          setData(dataCandidates.candidatos);
          setPremiumsData(dataCandidates.candidatosPremiums);
          console.log(premiumsData);
        } catch (err) {
          console.log("Error al cargar los datos el usuario");
        }
      })();
    }
  });

  return (
    <section>
      <div w-full d-flex justify-content-center>
        <CabeceraEmpresa />
      </div>
      <div className="">
        <div className="relative h-64 md:h-96 lg:h-128 xl:h-144">
          <div className="w-full h-full relative">
            <Image
              src="/slider/slider3.jpg"
              layout="fill"
              objectFit="cover"
              alt="Contrata personas para tu negocio"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8 z-10">
            <h3 className="text-lg text-center md:text-2xl font-bold">
              Contrata personas para tu negocio
            </h3>
            <p className="text-sm text-center md:text-lg my-2">
              Descubra su próximo paso profesional, trabajo independiente o
              pasantía
            </p>
            <div className=" bottom-0 left-0 right-0 bg-slate-100 rounded-2xl m-4 h-32 text-black p-4 md:p-8">
              <h3 className="text-lg md:text-2xl font-bold">
                Busqueda personalizada
              </h3>
              <form action="#" className="">
                <div className="row g-2">
                  <div className="col-lg-3 ">
                    <div className="filler-job-form">
                      <i className="uil uil-briefcase-alt"></i>
                      <input
                        id="exampleFormControlInput1"
                        placeholder="Cargo"
                        type="search"
                        className="form-control filler-job-input-box"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="filler-job-form">
                      <i className="uil uil-location-point"></i>
                      <select
                        className="form-select selectForm__inner"
                        data-trigger="true"
                        name="choices-single-location"
                        id="choices-single-location"
                        aria-label="Default select example"
                      >
                        <option value="">Ubicación</option>
                        <option value="">...</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="filler-job-form">
                      <i className="uil uil-clipboard-notes"></i>
                      <select
                        className="form-select selectForm__inner"
                        data-trigger="true"
                        name="choices-single-categories"
                        id="choices-single-categories"
                        aria-label="Default select example"
                      >
                        <option value="">Especialidad</option>
                        <option value="1">IT &amp; Software</option>
                        <option value="">...</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div>
                      <a className="btn btn-primary" href="#">
                        <i className="uil uil-filter"></i> Buscar
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className=" mt-20  text-lg text-center text-blue-900 md:text-2xl font-bold">
          Contrata personas para tu negocio
        </h3>
        <p className="text-sm mt-8 text-center text-blue-900 md:text-lg my-2">
          Descubra su próximo paso profesional, trabajo independiente o pasantía
        </p>
        {premiumsData === undefined ? (
          <div> Cargando... </div>
        ) : (
          <ListCarousel className="" data={premiumsData} />
        )}
      </div>
      <div className="justify-content-left row mt-5">
        <h3 className=" mt-20 ml-10 text-lg text-left text-blue-900 md:text-2xl font-bold">
          Otros candidatos
        </h3>
        <p className="text-sm ml-10 text-left text-blue-900 md:text-lg my-2">
          Que te podrían interesar
        </p>
      </div>
      {/* Normal candidates loop */}
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div className="align-items-center row">
            {/* Cantidad total de registros */}
            {/* <div className="col-lg-8">
                                <div className="mb-3 mb-lg-0"><h6 className="fs-16 mb-0">Showing 1 – 8 of 11 results</h6></div>
                            </div> */}
            <div className="col-lg-4">
              <div className="candidate-list-widgets">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="col election-widget">
                      <p className="row mb-0 font-bold">Especialidad</p>
                      <select
                        className="form-select row"
                        data-trigger="true"
                        name="choices-single-filter-orderby"
                        id="choices-single-filter-orderby"
                        aria-label="Default select example"
                      >
                        <option value="df">Default</option>
                        <option value="ne">Newest</option>
                        <option value="od">Oldest</option>
                        <option value="rd">Random</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col selection-widget mt-2 mt-lg-0">
                      <p className="mb-0 row font-bold">Región</p>
                      <select
                        className="form-select row"
                        data-trigger="true"
                        name="choices-candidate-page"
                        id="choices-candidate-page"
                        aria-label="Default select example"
                      >
                        <option value="df">All</option>
                        <option value="ne">8 per Page</option>
                        <option value="ne">12 per Page</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* Lista de candidatos aca */}
          <div className="candidate-list">
            {data?.map((item: any) => (
              <div className=" candidate-list-box card mt-4" key={item._id}>
                <div className="bg-slate-400 p-4 card-body ">
                  <div className="align-items-center row">
                    <div className="col-auto">
                      <div className=" candidate-list-images">
                        <a href="#">
                          <Image
                            src="/Imagen-card.png"
                            width={400}
                            height={300}
                            alt=""
                            className=" w-32  rounded-circle"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="candidate-list-content mt-3 mt-lg-0">
                        <h5 className="fs-19 mb-0">
                          <a className="primary-link" href="#">
                            {item.personaData.nombre}
                          </a>
                          <span className="badge bg-success ms-1">
                            <i className="mdi mdi-star align-middle"></i>4.8
                          </span>
                        </h5>
                        <p className="text-muted mb-2">
                          {item.Candidato.perfil.puestoDeseado}
                        </p>
                        <ul className="list-inline mb-0 text-muted">
                          <li className="list-inline-item">
                            <i className="mdi mdi-map-marker"></i> Venezuela
                          </li>
                          <li className="list-inline-item">
                            <i className="mdi mdi-wallet"></i>
                            {item.Candidato.perfil.salarioDeseado} $
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                        <span className="badge bg-soft-secondary fs-14 mt-1">
                          Datos verificados
                        </span>
                        <span className="badge bg-soft-secondary fs-14 mt-1">
                          CV anexado
                        </span>
                        <span className="badge bg-soft-secondary fs-14 mt-1"></span>
                      </div>
                    </div>
                  </div>
                  <div className="favorite-icon">
                    <a href="#">
                      <i className="mdi mdi-heart fs-18"></i>
                    </a>
                  </div>
                  <Link
                    href={`/enterprise/candidateProfile/${data._id}`}
                    className="col-lg-1 btn btn-primary btn-large"
                  >
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mt-4 pt-2 col-lg-12">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" tabIndex={-1} href="#">
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="mdi mdi-chevron-double-right fs-15"></i>
                </a>
              </li>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
