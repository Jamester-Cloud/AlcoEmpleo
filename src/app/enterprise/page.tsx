"use client";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import ListCarousel from "../components/carousel/Carousel";
import Image from "next/image";
import CabeceraEmpresa from "../components/cabeceras/cabeceraEmpresa";
import Link from "next/link";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetcherGet } from "@/constants/fetcher";
import {
  faCheckCircle,
  faWallet,
  faMapMarker,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

export default function CandidateSearch() {
  // States
  const [page, setPage] = React.useState<any>(1);
  //const { data, error, mutate } = useSWR(`/api/enterprise/candidateList/?page=${page}`, (url) => fetcherGet(url));
  const [regions, setRegions] = React.useState<any>();
  const [specialty, setSpecialtys] = React.useState<any>();
  //const [candidateList, setCandidateList] = React.useState<any>();
  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const [selectedSpecialty, setSelectedSpecialty] = React.useState(null);
  const [premiumsData, setPremiumsData] = React.useState<any>();
  //pagination normal
  const [candidatesNormal, setCandidateNormal]: any = React.useState();
  const [pageCandidateNormal, setPageCandidateNormal] = React.useState(1);
  const [pageNormalCandidateCount, setPageNormalCandidateCount]: any = React.useState(1);
  //paginacion premium

  const goToPageNormalCandidate = async (pageNumber: number) => {
    console.log(pageNumber)
    const candidateData = await axios.post(
      "/api/enterprise/candidateList",
      { page: pageNumber }
    );
    if (candidateData.status == 200) {
      setCandidateNormal(candidateData.data.data);
      setPageCandidateNormal(pageNumber);
    }
  };


  const nextPageCandidateNormal = async (nextPage: number) => {
    console.log("Pagina siguiente");
    const candidateData = await axios.post(
      "/api/enterprise/candidateList", { page: nextPage }
    );
    setCandidateNormal(candidateData.data.data);
    setPageNormalCandidateCount(candidateData.data.pagination.pageCount);

    if (candidateData.status == 200) {
      setPageCandidateNormal(nextPage);
    }
  };
  const prevPageCandidateNormal = async (prevPage: number) => {
    console.log("Pagina previa");
    const enterpriseData = await axios.post(
      "/api/enterprise/pagination",
      { page: prevPage }
    );
    setCandidateNormal(enterpriseData.data.data);
    setPageNormalCandidateCount(enterpriseData.data.pagination.pageCount);
    if (enterpriseData.status == 200) {
      setPageCandidateNormal(prevPage);
    }
  };

  const fetchPremiumCandidates = async () => {
    try {
      const response: any = await axios.get(
        "/api/enterprise/candidateList/premiums"
      );
      console.log("Response Data:", response.data); // <-- Agrega esto
      if (response.status === 200)
        return {
          candidatosPremiums: response.data.dataCandidatosPremium,
          candidatosTotales: parseInt(response.data.totalCandidates),
        };
    } catch (error) {
      console.error(error);
    }
  };


  const fetchRegions = async () => {
    try {
      const response = await axios.get("/api/enterprise/candidate/regions");
      if (response.status === 200) return { regions: response.data.regiones };
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNormalCandidates = async () => {
    try {
      const res = await axios.post('/api/enterprise/candidateList', { page: pageCandidateNormal })
      if (res.status == 200) {
        console.log(res.data)
        setCandidateNormal(res.data.data);
        setPageNormalCandidateCount(res.data.pagination.pageCount);
        console.log(candidatesNormal)
      }
    } catch (error) {
      console.error(Error)
    }
  }

  useEffect(() => {
    fetchNormalCandidates()
    console.log(candidatesNormal)
  }, [!candidatesNormal])

  useEffect(() => {
    const loadPremiumData = async () => {
      const premiumData = await fetchPremiumCandidates();
      setPremiumsData(premiumData ? premiumData.candidatosPremiums : []);
    };
    loadPremiumData();
  }, []);

  useEffect(() => {
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
  }, [regions]);

  const handleSubmitFilter = async (e: any) => {
    e.preventDefault();
    let filter = { cargo: selectedSpecialty || '', location: selectedLocation?.value || '', page: page };
    try {
      const response = await axios.post('/api/enterprise/candidateList/search', filter);
      if (response.status === 200) {
        //setPremiumsData(response.data.candidatePremiums);
        //setCandidateList(response.data.paginatedQuery);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // if (error) {
  //   return <div>{JSON.stringify(error)}</div>;
  // }

  // if (!data) {
  //   return <p>Loading...</p>;
  // }

  // const handlePageChange = async (newPage: number) => {
  //   setPage(newPage);
  //   //await mutate();
  // };

  // const handlePrevious = () => {
  //   // if (page > 1) {
  //   //   handlePageChange(page - 1);
  //   // }
  // };

  const handleNext = () => {
    //   if (page < pageCount) {
    //     handlePageChange(page + 1);
    //   }
  };

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
  };

  const handleSpecialtiesChange = (e: any) => {
    setSelectedSpecialty(e.target.value);
  };

  return (
    <section className="w-full">
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
            Aplica filtros para obtener los mejores resultados, ajustados a tus
            criterios
          </p>
          <div className="bg-slate-100 text-center rounded-2xl m-4 p-4 md:p-8 text-black overflow-y-auto max-h-[calc(100vh-240px)]">
            <h3 className="text-lg md:text-2xl font-bold">
              Búsqueda personalizada
            </h3>
            <form onSubmit={(e) => handleSubmitFilter(e)} method="post">
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="flex items-center">
                    <input
                      placeholder="Cargo"
                      className="w-full form-control"
                      name="cargo"
                    />
                  </div>
                  <div className="flex items-center">
                    <Select
                      options={regions}
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      placeholder="Ubicación"
                      isClearable={true}
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
        {premiumsData === undefined || premiumsData.length === 0 ? (
          <div className=" font-bold">No hay Candidatos Premiums Registrados</div>
        ) : (
          <ListCarousel data={premiumsData} />
        )}
      </div>
      <div className="w-full text-left ">
        <h3 className="p-2 text-center text-lg text-blue-900 md:text-2xl font-bold">
          Otros candidatos
        </h3>
        <p className="text-center mb-3 text-sm text-blue-900 md:text-lg my-2">
          Que te podrían interesar
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-11/12">
          <hr className="my-4" />
          <div className="candidate-list">

            {candidatesNormal?.map((item: any) => (
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
                          {item.personaData.nombre}  {item.personaData.apellido}
                        </a>
                        <span className="badge bg-success rounded-full ml-4">
                          <FontAwesomeIcon icon={faCheckCircle} /> Verificado
                        </span>
                      </h5>
                      <p className="text-sm text-gray-600">
                        {item.candidato.perfil.puestoDeseado}
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
                          {item.candidato.perfil.salarioDeseado} $
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
      {/* Pagination normal candidates and premiums */}
      <div className="w-full flex justify-center mt-10">
        <Pagination>
          <Pagination.Prev
            onClick={() => prevPageCandidateNormal(pageCandidateNormal - 1)}
            disabled={pageCandidateNormal == 1}
          />
          {Array(parseInt(pageNormalCandidateCount))
            .fill(null)
            .map((_, key) => {
              return (
                <Pagination.Item
                  key={key}
                  onClick={() => goToPageNormalCandidate(key + 1)}
                >
                  {key + 1}s
                </Pagination.Item>
              );
            })}
          <Pagination.Next
            onClick={() => nextPageCandidateNormal(pageCandidateNormal + 1)}
            disabled={pageCandidateNormal == pageNormalCandidateCount}
          />
        </Pagination>
      </div>
    </section>
  );
}
