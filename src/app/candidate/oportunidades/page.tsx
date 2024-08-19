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
import { useForm } from "react-hook-form";


type FormValues = {
  cargo: string,
}

export default function Oportunidades() {
  // Modal controls

  const [data, setData]: any = useState()

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/candidate/jobs");
      if (res.status == 200 && res.data.success) {
        console.log(res.data)
        setData(res.data.ofertas)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const { register, handleSubmit } = useForm();


  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (!data) {
      (async () => {
        try {
          await fetchJobs()
        } catch (err) {
          console.log('Error al cargar los datos el usuario');
        }
      })();
    }
  })

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await axios.post('/api/candidate/jobs/search', data)
    if (response.status == 200) setData(response.data.data)
  }
  //src={candidato?.documentos?.idArchivo ? `/api/candidate/profilePic?idArchivo=${candidato.documentos.idArchivo}` : '/Imagen-card.png'}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-slate-300 p-2 rounded-full text-white w-full max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col md:flex-row items-center">
            <input type="text" {...register('cargo')} placeholder="Cargo" className="ml-3 w-100 md:w-auto pl-12 form-control" id="" />
            <div
              title="cargo"
              className="w-full md:w-auto md:flex-1 mb-2 md:mb-0 md:mr-2"
            >

            </div>
            <div
              title="Ubicación"
              className="w-full md:w-auto md:flex-1 mb-2 md:mb-0 md:mr-2"
            >
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
        {data?.map((item: any, key: number) => {
          return (
            <div key={key} className="bg-white shadow-md rounded-lg p-6 relative">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="text-left md:flex-1 md:flex md:flex-col md:justify-center">
                  <h2 className="text-2xl text-blue-600 font-bold">
                    {item.ofertaTrabajo.tituloOferta}
                    <div className="badge text-secondary">{item.ofertaTrabajo.modalidadTrabajo}</div>
                  </h2>
                  {/* 
                  <p className="text-xl text-gray-600">Inversiones Avícolas C. A</p> */}
                  <div className="flex flex-row text-gray-600 mt-2">
                    <p>{item.ofertaTrabajo.descripcionOfertaTrabajo}</p>
                  </div>
                  <div className="flex flex-row text-gray-600 mt-2">
                    <div className="col-md-6">
                      <h6>Beneficios:</h6>
                      <ul>
                        {item.ofertaTrabajo.beneficios.map((item: any, key: number) => {
                          return (
                            <li key={key}>{item}</li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6>Requisitos:</h6>
                      <ul>
                        {item.ofertaTrabajo.requisitos.map((item: any, key: number) => {
                          return (
                            <li key={key}>{item}</li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* <button className="btn btn-primary w-25" >Solicitar</button> */}
                </div>
                {/* logo empresarial */}
                <Image
                  src={item.documentosData ? `/api/enterprise/enterpriseLogo?idArchivo=${item.documentosData}` : '/AlcoLogo.png'}
                  alt="Oportunidad"
                  className="rounded-2xl mb-4 md:mb-0 md:mr-4 w-full md:w-72"
                  width={700}
                  height={700}
                />
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  );
}
