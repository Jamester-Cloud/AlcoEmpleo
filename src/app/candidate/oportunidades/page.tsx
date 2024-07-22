/* eslint-disable react/jsx-no-undef */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCheckCircle,
  faEllipsis,
  faEllipsisV,
  faMapMarkerAlt,
  faPencil,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Select from "react-select";
import "@/app/candidate/edit/css/style.css";
import React from "react";

export default function UserCandidate() {
  // Modal controls
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);

  const [regions, setRegions] = React.useState<any>();
  const [specialty, setSpecialtys] = React.useState<any>();

  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const [selectedSpecialty, setSelectedSpecialty] = React.useState(null);

  // State data load
  const [candidatoData, setCandidatoData]: any = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get("/api/enterprise/candidate/regions");
      if (response.status === 200) return { regions: response.data.regiones };
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = (
    e: any,
    title: string,
    data: any,
    id: string,
    dataType: string
  ) => {
    e.preventDefault();
    console.log(data);
    data.dataType = dataType;
    setModalTitle(title);
    setModalData({ ...data, id });
    setShow(true);
  };

  const getUserDetails = async () => {
    const res = await axios.post("/api/candidate/me", {
      idPersona: localStorage.getItem("idPersona"),
      idUsuario: localStorage.getItem("idUsuario"),
    });

    if (res.status === 200 && res.data.success) {
      setCandidatoData({
        userData: {
          ...res.data.dataPersona,
          emailUsuario: res.data.emailUsuario,
        },
        candidatoData: res.data.dataCandidato,
      });
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (!candidatoData) {
      (async () => {
        try {
          await getUserDetails();
          console.log(candidatoData);
        } catch (err) {
          console.log("Error al cargar los datos del usuario", err);
        }
      })();
    }
  }, [candidatoData]);

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
  };

  const handleSpecialtiesChange = (e: any) => {
    setSelectedSpecialty(e.target.value);
  };

  const handleSubmitFilter = async (e: any) => {
    e.preventDefault();
    let filter = {
      cargo: selectedSpecialty || "",
      location: selectedLocation?.value || "",
    };
    console.log(filter);
  };

  function deleteItem(event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-slate-300 p-2 rounded-full text-white w-full max-w-3xl">
        <form onSubmit={(e) => handleSubmitFilter(e)} method="post">
          <div className="flex flex-col md:flex-row items-center">
            <div
              title="cargo"
              className="w-full md:w-auto md:flex-1 mb-2 md:mb-0 md:mr-2"
            >
              <Select
                options={specialty}
                value={selectedSpecialty}
                onChange={handleSpecialtiesChange}
                placeholder=""
                isClearable={true}
                className="w-72 md:w-auto pl-12"
                name="estado"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({ ...base, minWidth: "150px" }),
                  input: (base) => ({ ...base, paddingLeft: "2.5rem" }),
                }}
                components={{
                  DropdownIndicator: () => (
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  ),
                }}
              />
            </div>
            <div
              title="Ubicación"
              className="w-full md:w-auto md:flex-1 mb-2 md:mb-0 md:mr-2"
            >
              <Select
                options={regions}
                value={selectedLocation}
                onChange={handleLocationChange}
                placeholder=""
                isClearable={true}
                className="w-72 md:w-auto pl-12"
                name="estado"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  control: (base) => ({ ...base, minWidth: "150px" }),
                  input: (base) => ({ ...base, paddingLeft: "2.5rem" }),
                }}
                components={{
                  DropdownIndicator: () => (
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  ),
                }}
              />
            </div>
            <div className=" w-full md:w-auto pl-12">
              <button
                type="submit"
                className="w-1/2  md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="text-left md:flex-1 md:flex md:flex-col md:justify-center">
              <h2 className="text-2xl text-blue-600 font-bold">
                Analista contable administrativo
                <span className="badge bg-success rounded-full ml-4">
                  <FontAwesomeIcon icon={faCheckCircle} /> Verificado
                </span>
              </h2>
              <p className="text-xl text-gray-600">Inversiones Avícolas C. A</p>
              <div className="flex flex-col md:flex-row mt-2 text-gray-500">
                <div className="flex flex-row mb-2 md:mb-0">
                  <p>Araure, Portuguesa</p>
                </div>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p>500,00 $ (Mensual)</p>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p>Publicado hace 4 días</p>
              </div>
            </div>
            <Image
              src="/Kiri.png"
              alt="Admin"
              className="rounded-2xl mb-4 md:mb-0 md:mr-4 w-full md:w-72"
              width={800}
              height={800}
            />
            <button className="btn " onClick={handleButtonClick}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
          {isVisible && (
            <div>
              <hr />
              <p className="text-xl text-blue-600">
                <strong>Descripción</strong>
              </p>
              <div className="ml-2">
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
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  amet aspernatur facilis distinctio accusamus? Aut, eum! Ullam
                  sint ipsum ducimus exercitationem porro, necessitatibus
                  commodi adipisci. Beatae nobis quam quas rerum.
                </li>
              </div>
              <p className="text-xl mt-5 text-blue-600">
                <strong>Inversiones Avícolas C. A</strong>
              </p>
              <div className="ml-2">
                <li>Educación mínima: Educación Técnico/Profesional</li>
                <li>3 años de experiencia</li>
              </div>
              <div className="pt-10 w-full md:w-full items-center">
                <button
                  type="submit"
                  className="w-1/2  md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Postularme
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}