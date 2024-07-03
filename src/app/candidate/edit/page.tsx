"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPencil,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import DataModal from "@/app/components/modal/DataModal";
import "@/app/candidate/edit/css/style.css";

export default function UserCandidate() {
  // Modal controls
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);

  // State data load
  const [candidatoData, setCandidatoData]: any = useState(null);

  const handleModal = (e: any, title: string, data: any, id: string) => {
    e.preventDefault();
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
    }
  };

  useEffect(() => {
    if (!candidatoData) {
      (async () => {
        try {
          await getUserDetails();
        } catch (err) {
          console.log("Error al cargar los datos del usuario", err);
        }
      })();
    }
  }, [candidatoData]);

  function loadItem(event: any): void {
    throw new Error("Function not implemented.");
  }

  function deleteItem(event: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 relative">
          <button
            onClick={(e) =>
              handleModal(
                e,
                "Datos personales",
                candidatoData?.userData,
                candidatoData?.userData?._id
              )
            }
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Editar
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <Image
              src="/Imagen-card.png"
              alt="Admin"
              className="rounded-2xl mb-4 md:mb-0 md:mr-4 w-72"
              width={800}
              height={800}
            />
            <div className=" text-left md:text-left md:flex-1 md:flex md:flex-col md:justify-center">
              <h2 className="text-2xl font-bold">
                {candidatoData?.userData?.nombre || ""}{" "}
                {candidatoData?.userData?.apellido || ""}{" "}
                <span className="badge bg-success rounded-full ml-4">
                  <FontAwesomeIcon icon={faCheckCircle} /> Verificado
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                {candidatoData?.candidatoData?.perfil?.puestoDeseado}
              </p>
              <div className="flex flex-row mt-2 text-gray-500">
                <div className="flex flex-row">
                  <p className="text-blue-800">Teléfono:</p>{" "}
                  <p>{candidatoData?.userData?.telefono}</p>
                </div>
                <div className="flex flex-row ml-10">
                  <p className="text-blue-800">Email:</p>{" "}
                  <p> {candidatoData?.userData?.emailUsuario || ""}</p>
                </div>
              </div>
              <div className="flex flex-row text-gray-600">
                <p className="text-blue-800">Dirección:</p>{" "}
                <p> {candidatoData?.userData?.direccion}</p>
              </div>
              <div className="flex flex-row text-gray-600">
                <p className="text-blue-800">Redes:</p>{" "}
                <p> Redes</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-row">
            <div>
            </div>
            <div className="ml-40 w-full">
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <hr />
              <p className="text-gray-600">
                {candidatoData?.candidatoData?.perfil?.descripcionPersonal}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form>
        {/* Perfil */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Perfil Laboral</h2>
            <button
              onClick={(e) =>
                handleModal(
                  e,
                  "Perfil del candidato",
                  candidatoData?.candidatoData?.perfil,
                  candidatoData?._id
                )
              }
              className="top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Editar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">Puesto deseado</label>
              <p className="text-gray-900">
                {candidatoData?.candidatoData?.perfil?.puestoDeseado}
              </p>
            </div>

            <div>
              <label className="text-gray-700">Salario Deseado</label>
              <p className="text-gray-900">
                {candidatoData?.candidatoData?.perfil?.salarioDeseado}
              </p>
            </div>

            <div className="">
              <label className="text-gray-700">Descripción Personal</label>
              <p className="text-gray-900">
                {candidatoData?.candidatoData?.perfil?.descripcionPersonal}
              </p>
            </div>
            <div className="">
              <label className="text-gray-700">Idiomas:</label>
              <p className="text-gray-900">

              </p>
            </div>
          </div>
        </div>

        {/* Experiencias */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Experiencias Laborales</h2>
            <div className="flex space-x-2">
              <button onClick={loadItem} className="text-green-500">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          {candidatoData?.candidatoData?.experiencias?.map((item: any, key: number) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              key={item._id}
            >
              <div>
                <label className="text-gray-700">Empresa</label>
                <p className="text-gray-900">{item.nombreEmpresa}</p>
              </div>
              <div className="text-right">
                <button
                  className="text-blue-500"
                  onClick={(e) =>
                    handleModal(
                      e,
                      "editExperience",
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
          ))}
        </div>
        
        {/* Habilidades */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Habilidades</h2>
            {/* <button
              onClick={(e) =>
                handleModal(
                  e,
                  "Habilidades",
                  candidatoData?.candidatoData?.habilidad,
                  candidatoData?._id
                )
              }
              className="text-blue-500"
            >
              <FontAwesomeIcon icon={faPencil} /> Editar
            </button> */}
            <button onClick={loadItem} className="text-green-500">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {/* Aquí puedes mapear las habilidades si es necesario */}
          {candidatoData?.candidatoData?.habilidad?.map((item: any, key: number) => (
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
          ))}

        </div>
          {/* Formaciones academicas */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Formacíon Academica</h2>
            <div className="flex space-x-2">
              <button onClick={loadItem} className="text-green-500">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          {candidatoData?.candidatoData?.experiencias?.map((item: any, key: number) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              key={item._id}
            >
              <div>
                <label className="text-gray-700">Institucion</label>
                <p className="text-gray-900">{item.nombreEmpresa}</p>
              </div>
              <div className="text-right">
                <button
                  className="text-blue-500"
                  onClick={(e) =>
                    handleModal(
                      e,
                      "editExperience",
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
          ))}
        </div>

      </form>
      <DataModal
        show={show}
        onHide={handleClose}
        data={modalData}
        title={modalTitle}
      />
    </div>
  );
}
