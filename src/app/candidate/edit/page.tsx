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
import DataModal from "@/app/components/Modal/DataModal";
import "@/app/candidate/edit/css/style.css";

export default function UserCandidate() {
  // Modal controls
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);

  // State data load
  const [candidatoData, setCandidatoData]: any = useState(null);
  const [modalType, setModalDataType] = useState("");

  const handleModal = (e: any, title: string, data: any, id: string, dataType: string) => {
    e.preventDefault();
    setModalDataType(dataType)
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
        personaData: res.data.personaData,
        candidatoData: res.data.dataCandidato,
        cv: res.data.cv,
        profilePicture: res.data.profilePic
      });
      console.log(res.data)
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


  //funcion para borrar items de idiomas, experiencias(por id), habilidades, formaciones academicas(Por id)
  const popItem = async (type: string) => {
    let petition
    switch (type) {
      case 'habilidad':
        candidatoData.candidatoData.habilidad?.pop();
        petition = await axios.post('/api/candidate/upload/delete', { dataType: type, data: candidatoData.candidatoData.habilidad, idUsuario: localStorage.getItem('idUsuario') })
        break;
      case 'idioma':
        candidatoData.candidatoData.idiomas?.pop()
        petition = await axios.post('/api/candidate/upload/delete', { dataType: type, data: candidatoData.candidatoData.idiomas, idUsuario: localStorage.getItem('idUsuario') })
        break;
      case 'redes':
        candidatoData.candidatoData.redes?.pop()
        petition = await axios.post('/api/candidate/upload/delete', { dataType: type, data: candidatoData.candidatoData.redes, idUsuario: localStorage.getItem('idUsuario') })
        break;
    }
    //Re-render
    if (petition?.status == 200) await getUserDetails()
  }

  const deleteItem = async (type: string, id: string) => {
    let petition;
    switch (type) {
      case 'exp':
        petition = await axios.post('/api/candidate/upload/delete', { dataType: type, id: id, idUsuario: localStorage.getItem('idUsuario') })
        break;
      case 'academics':
        petition = await axios.post('/api/candidate/upload/delete', { dataType: type, id: id, idUsuario: localStorage.getItem('idUsuario') })
        break;
    }
    //re-render
    if (petition?.status == 200) await getUserDetails()
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
                candidatoData?.personaData?._id,
                "datosPersonales"
              )
            }
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Editar datos personales
          </button>
          <div className="flex flex-col md:flex-row items-center md:items-start">

            <Image
              src={candidatoData?.profilePicture?.idArchivo ? `/api/candidate/profilePic?idArchivo=${candidatoData.profilePicture.idArchivo}` : '/Imagen-card.png'}
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

      {/* Perfil */}
      <div className="col-md-12 bg-white shadow-md rounded-lg p-6 relative">
        <div className="py-5 card-header">
          <div className="row align-items-right">
            <div className="col-md-10">

            </div>
            <div className="col-md-2 justify-content-right align-items-right">
              <button className="ml-5 top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={(e) => handleModal(e, "Perfil del candidato", candidatoData?.candidatoData.perfil, candidatoData._id, "perfil")}>
                Editar perfil
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-5">
            <div className="row">
              <div className="col-md-6">
                <label className="labels">Puesto deseado</label>
                <h6>{candidatoData?.candidatoData.perfil?.puestoDeseado}</h6>
                <hr />
              </div>
              <div className="col-md-6">
                <label className="labels">Salario Deseado</label>
                <h6>{candidatoData?.candidatoData.perfil?.salarioDeseado}</h6>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"><label className="labels">Descripcion Personal</label>
                <h6>{candidatoData?.candidatoData.perfil?.descripcionPersonal} </h6>
              </div>
              <hr />
              <div className="col-md-12">
                <label htmlFor=""></label>
                <div className="card">
                  <div className="card-header">
                    Curriculum en uso:
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {candidatoData?.cv?.filename ? <><div className="col-md-6">
                        {candidatoData?.cv?.filename}
                      </div>
                        <div className="col-md-6">
                          <a href={`/api/candidate/download?idArchivo=${candidatoData.cv.idArchivo}`} className="btn btn-primary">Descargar</a>
                        </div></> : "Sin CV"}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            {/* idiomas */}
            <div className="row">
              <h6>Idiomas</h6>
              <div className="col-md-6">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {candidatoData?.candidatoData?.idiomas?.map((item: any, key: number) => (
                    <div key={key} className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">{item?.idioma}</div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <button onClick={(e) => handleModal(e, "Nuevo Idioma", {}, candidatoData._id, "idiomas")} className="text-green-500">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button onClick={() => popItem("idioma")} className=" ml-5 text-red-500">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Redes */}
            <div className="row">
              <div className="row">
                <h6>Redes</h6>
                <div className="col-md-6">
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    {candidatoData?.candidatoData?.redes?.map((item: any, key: number) => (
                      <div key={key} className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">{item?.enlace}</div>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <button onClick={(e) => handleModal(e, "Nuevo enlace", {}, candidatoData._id, "redes")} className="text-green-500">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button onClick={() => popItem("redes")} className=" ml-5 text-red-500">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experiencias */}
      <div className="container mx-auto mt-5 p-4">
        <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
          <h2 className="text-xl font-semibold">Experiencias Laborales</h2>
          <div className="flex space-x-2">
            <button onClick={(e) => handleModal(e, 'Nueva Experiencia', {}, candidatoData._id, "newExp")} className="text-green-500">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        {candidatoData?.candidatoData?.experiencias?.map((item: any, key: number) => (
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
            <div className="text-right">
              <button
                className="text-blue-500"
                onClick={(e) =>
                  handleModal(
                    e,
                    "Experiencias",
                    item,
                    candidatoData._id,
                    "exp"
                  )
                }
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button onClick={() => deleteItem("exp", item._id)} className=" ml-5 text-red-500">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Formaciones academicas */}
      <div className="container mx-auto mt-5 p-4">
        <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
          <h2 className="text-xl font-semibold">Educación</h2>
          <div className="flex space-x-2">
            <button onClick={(e) => handleModal(e, 'Nueva formación academica', {}, candidatoData._id, "newEduc")} className="text-green-500">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        {candidatoData?.candidatoData?.formacionesAcademicas.map((item: any, key: number) => (
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
            <div className="text-right">
              <button
                className="text-blue-500"
                onClick={(e) => {
                  item.key = key,
                    handleModal(
                      e,
                      "Editar formación academica",
                      item,
                      candidatoData._id,
                      "editAcademic"
                    )
                }}
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button onClick={() => deleteItem("academics", item._id)} className=" ml-5 text-red-500">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Habilidades */}
      <div className="container mx-auto mt-5 p-4">
        <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
          <h2 className="text-xl font-semibold">Habilidades</h2>
          <div className="flex space-x-2">
            <button onClick={(e) =>
              handleModal(
                e,
                "Agregar habilidad",
                {},
                candidatoData._id,
                "newSkill"
              )
            } className="text-blue-500">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button onClick={() => popItem("habilidad")} className="text-red-500">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Aca va el bucle */}
          {candidatoData?.candidatoData?.habilidad?.map((item: any, key: number) => {
            return (
              <div key={key} className="bg-gray-200 text-blue-600 shadow-md rounded-lg p-6 mb-4 mr-3">
                {item.nombreHabilidad}
              </div>
            )
          })}
        </div>


      </div>

      <DataModal
        show={show}
        setShow={setShow}
        candidatoData={candidatoData}
        setCandidatoData={setCandidatoData}
        onHide={handleClose}
        data={modalData}
        modalType={modalType}
        title={modalTitle}
      />
    </div>
  );
}
