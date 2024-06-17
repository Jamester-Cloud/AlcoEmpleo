"use client";
import React from "react";
import axios, { Axios } from "axios";
import ListCarousel from "../components/carousel/Carousel";
import Image from "next/image";
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faBriefcase,
  faWallet,
  faMapMarker,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

export default function CandidateSearch({ searchParams }: any) {

  //States
  const [data, setData] = React.useState<any>();
  const [regions, setRegions] = React.useState<any>();
  //TODO: paginator
  const [candidatosTotales, setCandidatosTotales] = React.useState(0)
  // Ubicacion
  const [locations, setLocations] = React.useState([
    { label: "New York", value: "ny" },
    { label: "Los Angeles", value: "la" },
    { label: "Chicago", value: "ch" },
    { label: "Houston", value: "ho" },
    { label: "Phoenix", value: "ph" },
  ]);
  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  // Especialidad
  const [specialty, setSpecialties] = React.useState([
    { label: "IOT", value: "ny" },
    { label: "Web design", value: "la" },
    { label: "UI Design", value: "ch" },
    { label: "UX Design", value: "ho" },
    { label: "Backend", value: "ph" },
  ]);
  const [selectedSpecialty, setSelectedSpecialty] = React.useState(null);

  const [premiumsData, setPremiumsData] = React.useState<any>();

  const fetchPremiumCandidates = async () => {
    try {
      const response: any = await axios.get("/api/enterprise/candidateList/premiums");
      if (response.status === 200)
        return {
          candidatosPremiums: response.data.dataCandidatosPremium,
          candidatosTotales: parseInt(response.data.totalCandidates)
        };
    } catch (error) {
      console.error(error);
    }
  };



  const fetchRegions = async () => {
    try {
      const response = await axios.get("/api/enterprise/candidate/regions");

      if (response.status === 200) return { regions: response.data.regiones }

    } catch (error) {
      console.error(error);
    }
  }
  //?consulta para la posible paginacion
  const fetchCandidates = async (perPage: number, page: number) => {
    try {
      const response = await axios.post("/api/enterprise/candidateList/", { perPage, page });
      if (response.status === 200)
        console.log(response.data)
      return {
        candidatos: response.data.dataCandidatos,
        candidatosTotales: parseInt(response.data.totalCandidates)
      };
    } catch (error) {
      console.error(error);
    }
  };


  const filterCandidates = async (filter: object) => {
    try {
      const response = await axios.post('/api/enterprise/search', filter)
      if (response.status === 200) return { filteredSearch: response.data }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (!premiumsData) {
      (async () => {
        try {
          const dataCandidates: any = await fetchPremiumCandidates();
          setPremiumsData(dataCandidates.candidatosPremiums);
        } catch (err: any) {
          console.error("Error al cargar los datos del usuario", err);
        }
      })();
    }
  }, [premiumsData]);

  React.useEffect(() => {
    if (!regions) {
      (async () => {
        try {
          const dataRegions: any = await fetchRegions();
          setRegions(dataRegions.regions);
        } catch (err: any) {
          console.error("Error al cargar los datos del usuario", err);
        }
      })();
    }
  }, [regions])

  const handleLocationChange = (selectedOption: any) => {
    console.log(selectedOption)
    setSelectedLocation(selectedOption);
  };

  const handleSpecialtiesChange = (e: any) => {
    console.log(e.target.value);
    setSelectedSpecialty(e.target.value);
  };

  const handleSubmitFilter = (async (e: any) => {
    e.preventDefault();
    let filter = {cargo: selectedSpecialty || '', location:selectedLocation?.value || ''}
    try {
      const response = await axios.post('/api/enterprise/candidateList/search', filter)
      if (response.status === 200) return { filteredSearch: response.data }

    } catch (err) {
      console.log(err)
    }
  })

  return (
    <section className="w-full">
      <div className="w-full">
        <CabeceraEmpresa />
      </div>
      <div className="relative h-96 sm:h-80 md:h-96 lg:h-128 xl:h-144 w-full">
        <Image
          src="/slider/slider3.jpg"
          layout="fill"
          objectFit="cover"
          alt="Contrata personas para tu negocio"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="absolute bottom-0 left-0 right-0 text-white p-4">
          <h3 className="text-lg text-center md:text-2xl font-bold">
            Buscador de candidatos
          </h3>
          <p className="text-sm text-center md:text-lg">
            Aplica filtros para obtener los mejores resultados, ajustados a tus criterios
          </p>
          <div className="bg-slate-100 text-center rounded-2xl m-4 p-4 md:p-8 text-black overflow-y-auto max-h-[calc(100vh-240px)]">
            <h3 className="text-lg md:text-2xl font-bold">
              Búsqueda personalizada
            </h3>
            <form onSubmit={(e)=> handleSubmitFilter(e)} method="post">
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="flex items-center">
                    <input
                      type="search"
                      onChange={handleSpecialtiesChange}
                      placeholder="Cargo"
                      className="w-full form-control"
                    />
                  </div>
                  <div className="flex items-center">
                    <Select
                      options={regions}
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      placeholder="Ubicación"
                      className="w-full"
                      name="estado"
                      menuPortalTarget={document?.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-4 w-full max-w-lg">
                  <button type="submit" className="btn btn-primary">
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full text-center my-20">
        <h3 className="text-lg text-blue-900 md:text-2xl font-bold">
          Contrata personas para tu negocio
        </h3>
        <p className="text-sm text-blue-900 md:text-lg my-2">
          Descubra su próximo paso profesional, trabajo independiente o pasantía
        </p>
        {premiumsData === undefined ? (
          <div>Cargando...</div>
        ) : (
          <ListCarousel data={premiumsData} />
        )}
      </div>
      <div className="w-full text-left mt-20">
        <h3 className="p-2 text-center text-lg text-blue-900 md:text-2xl font-bold">
          Otros candidatos
        </h3>
        <p className="text-center mb-3 text-sm text-blue-900 md:text-lg my-2">
          Que te podrían interesar
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-11/12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-lg">
              <div className="flex items-center">
                <Select
                  options={specialty}
                  value={selectedSpecialty}
                  onChange={handleSpecialtiesChange}
                  placeholder="Especialidad"
                  className="w-full"
                  menuPortalTarget={document?.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
              <div className="flex items-center">
                <Select
                  options={regions}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  placeholder="Ubicación"
                  className="w-full"
                  menuPortalTarget={document?.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="candidate-list">
            {data?.map((item: any) => (
              <div className="card mt-4" key={item._id}>
                <div className="bg-slate-200 card-body">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                        <Image
                          src="/Imagen-card.png"
                          width={100}
                          height={100}
                          alt=""
                          className="w-32 h-32 rounded-full"
                        />
                      </a>
                    </div>
                    <div className="flex-grow ml-4">
                      <h5 className="text-lg font-bold">
                        <a className="text-blue-900" href="#">
                          {item.personaData.nombre}
                        </a>
                        <span className="badge bg-success rounded-full ml-4">
                          <FontAwesomeIcon icon={faCheckCircle} /> Verificado
                        </span>
                      </h5>
                      <p className="text-sm text-gray-600">
                        {item.Candidato.perfil.puestoDeseado}
                      </p>
                      <ul className="list-none p-0">
                        <li className="text-gray-600 text-sm flex items-center">
                          <FontAwesomeIcon
                            icon={faMapMarker}
                            className="mr-1"
                          />{" "}
                          Venezuela
                        </li>
                        <li className="text-gray-600 text-sm flex items-center">
                          <FontAwesomeIcon icon={faWallet} className="mr-1" />{" "}
                          {item.Candidato.perfil.salarioDeseado} $
                        </li>
                      </ul>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href={`/enterprise/candidateProfile/${item._id}`}
                        className="btn btn-primary flex items-center"
                      >
                        <span className="hidden md:inline">Ver Perfil</span>
                        <FontAwesomeIcon
                          icon={faSearch}
                          className="md:hidden mr-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Pagination normal candidates */}
      <div className="w-full flex justify-center mt-10">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" tabIndex={-1} href="#">
                <FontAwesomeIcon icon={faAngleDoubleLeft} size="xs" />
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
                <FontAwesomeIcon icon={faAngleDoubleRight} size="xs" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
