"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from "next/image";
import CabeceraEmpresa from "@/app/components/cabeceras/cabeceraEmpresa";
import Contact from "@/app/components/Contact/Contact";
import Footer from "@/app/components/Footer/footer";
import {
  faCheckCircle,
  faCopy,
  faFlag,
  faPencil,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import DataModal from "@/app/components/Modal/DataModal";
import "@/app/candidate/edit/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile({ params }: any) {
  const [userData, setUserData]: any = useState();

  const getUserDetails = async () => {
    const res = await axios.get("../api/users/me");
    return res.data.personaData;
  };

  useEffect(() => {
    if (!userData) {
      (async () => {
        try {
          const userData = await getUserDetails();
          console.log(userData);
          setUserData(userData);
        } catch (err) {
          console.log("Error al cargar los datos el usuario");
        }
      })();
    }
    console.log(userData);
  }, [userData]);

  // Modal controls
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);

  // State data load
  const [candidatoData, setCandidatoData]: any = useState(null);
  const [modalType, setModalDataType] = useState("");
  const handleModal = (
    e: any,
    title: string,
    data: any,
    id: string,
    dataType: string
  ) => {
    e.preventDefault();
    setModalDataType(dataType);
    setModalTitle(title);
    setModalData({ ...data, id });
    setShow(true);
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

  //funcion para borrar items de idiomas, experiencias(por id), habilidades, formaciones academicas(Por id)
  const popItem = async (type: string) => {
    let petition;
    switch (type) {
      case "habilidad":
        candidatoData.candidatoData.habilidad?.pop();
        petition = await axios.post("/api/candidate/upload/delete", {
          dataType: type,
          data: candidatoData.candidatoData.habilidad,
          idUsuario: localStorage.getItem("idUsuario"),
        });
        break;
      case "idioma":
        candidatoData.candidatoData.idiomas?.pop();
        petition = await axios.post("/api/candidate/upload/delete", {
          dataType: type,
          data: candidatoData.candidatoData.idiomas,
          idUsuario: localStorage.getItem("idUsuario"),
        });
        break;
      case "redes":
        candidatoData.candidatoData.redes?.pop();
        petition = await axios.post("/api/candidate/upload/delete", {
          dataType: type,
          data: candidatoData.candidatoData.redes,
          idUsuario: localStorage.getItem("idUsuario"),
        });
        break;
    }
    //Re-render
    if (petition?.status == 200) await getUserDetails();
  };

  const deleteItem = async (type: string, id: string) => {
    let petition;
    switch (type) {
      case "exp":
        petition = await axios.post("/api/candidate/upload/delete", {
          dataType: type,
          id: id,
          idUsuario: localStorage.getItem("idUsuario"),
        });
        break;
      case "academics":
        petition = await axios.post("/api/candidate/upload/delete", {
          dataType: type,
          id: id,
          idUsuario: localStorage.getItem("idUsuario"),
        });
        break;
    }
    //re-render
    if (petition?.status == 200) await getUserDetails();
  };
  return (
    <div className="container">
      <CabeceraEmpresa />
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 relative">
          <button
            onClick={(e) =>
              handleModal(
                e,
                "Datos personales",
                candidatoData?.userData,
                candidatoData?.userData?._id,
                "datosPersonales"
              )
            }
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Editar datos
          </button>
          <button
            className="absolute top-4 right-60 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Cargar carta constitutiva
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <Image
              src="/Imagen-card.png"
              alt="Admin"
              className="rounded-2xl mb-4 md:mb-0 md:mr-4 w-full md:w-72"
              width={800}
              height={800}
            />
            <div className="text-left md:flex-1 md:flex md:flex-col md:justify-center">
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
              <div className="flex flex-col md:flex-row mt-2 text-gray-500">
                <div className="flex flex-row mb-2 md:mb-0">
                  <p className="text-blue-800">Teléfono:</p>{" "}
                  <p>{candidatoData?.userData?.telefono}</p>
                </div>
                <div className="flex flex-row md:ml-10">
                  <p className="text-blue-800">Email:</p>{" "}
                  <p>{candidatoData?.userData?.emailUsuario || ""}</p>
                </div>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p className="text-blue-800">Dirección:</p>{" "}
                <p>{candidatoData?.userData?.direccion}</p>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p className="text-blue-800">Razón Social:</p>{" "}
                <p>{candidatoData?.userData?.direccion}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row">
            <div className="md:ml-40 w-full">
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <hr />
              <p className="text-gray-600">
                {candidatoData?.candidatoData?.perfil?.descripcionPersonal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <DataModal
      show={show}
      setShow={setShow}
      candidatoData={candidatoData}
      setCandidatoData={setCandidatoData}
      onHide={handleClose}
      data={modalData}
      modalType={modalType}
      title={modalTitle}
    /> */}
    </div>
  );
}
