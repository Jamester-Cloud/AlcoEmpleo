"use client"
import React, { useState, useEffect } from 'react';
import CardOffer from "@/app/components/cards/CardJobOffer"
import "@/app/components/cards/css/styles.css"
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function JobOffer() {

    const [data, setData] = useState({
        tituloOferta: "",
        descripcionOferta: "",
        beneficios: [],
        requisitos: [],
        nuevoBeneficio: '',
        nuevoRequisito: '',
        modalidadTrabajo: "",
        empresa: "",
    })

    const [beneficios, setBeneficios] = useState()
    const [requisitos, setRequisitos] = useState()

    const onHandleInputChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setData({ ...data, [name]: newValue });
    }
    const onHandleArrayChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        name
    }
    //Getting the data for enterprise user
    const getUserDetails = async () => {
        const res = await axios.post("/api/enterprise/me");
        setData({ ...data, empresa: res.data?.empresaNombre });
    }


    useEffect(() => {
        if (data.empresa === "") (async () => {
            try {
                await getUserDetails()
            } catch (err) {
                console.log('Error al cargar los datos el usuario');
            }
        })()
    })

    return (
        <section className="">
            <div className="container-fluid px-0">
                <div className="row g-0">
                    <div className="col-lg-6 vh-100 ">
                        <div className="px-1 py-5 mx-auto">
                            <div className="row d-flex justify-content-center">
                                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                    <h3>Oferta de trabajo</h3>
                                    <p className="blue-text">Datos de la publicacion</p>
                                    <form className="form-card" >
                                        <div className="row justify-content-between text-left">
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Titulo<span className="text-danger"> *</span></label>
                                                <input type="text" id="tituloOferta" name="tituloOferta" onChange={onHandleInputChange} className="form-control" placeholder="Titulo de la oferta de empleo" />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-sm-12 flex-column d-flex"> <label className="form-control-label px-3">Descripcion de la oferta<span className="text-danger"> *</span></label>
                                                <textarea id="descripcionOferta" className="form-control" name="descripcionOferta" onChange={onHandleInputChange} placeholder="Descripcion de la oferta de empleo" />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Modalidad de Trabajo<span className="text-danger"> *</span></label>
                                                <input type="text" id="modalidadTrabajo" name="modalidadTrabajo" onChange={onHandleInputChange} className="form-control" placeholder="Modalidad de la oferta de empleo" />
                                            </div>
                                        </div>
                                        <input type="hidden" id="idEmpresa" name='idEmpresa' />
                                        <hr />
                                        {/*  Array */}
                                        <div className="row mt-3">
                                            <div className="col-md-12 text-left"> <label className="form-control-label px-3">Beneficios<span className="text-danger"> *</span></label>
                                                <input type="text" id="beneficios" name="beneficios"  className="form-control" placeholder="Beneficios de la oferta" />
                                            </div>
                                            <div className="col-md-3 text-start justify-content-between mt-2">
                                                <div className="btn btn-sm btn-primary rounded" ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div>
                                            </div>

                                        </div>
                                        {/* Array */}
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Requisitos<span className="text-danger"> *</span></label>
                                                <input type="text" id="lname" name="lname" className="form-control" placeholder="Requisitos de la oferta" />
                                            </div>
                                            <div className="col-md-3 text-start justify-content-between mt-2">
                                                <div className="btn btn-sm btn-primary rounded"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 align-items-center">
                        <CardOffer data={data} />
                    </div>
                </div>
            </div>

        </section>
    )
}