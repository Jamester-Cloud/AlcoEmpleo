"use client"
import React, { useState, useEffect } from 'react';
import CardOffer from "@/app/components/cards/CardJobOffer"
import "@/app/components/cards/css/styles.css"
import axios from 'axios'
import { useRouter } from "next/navigation"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faDeleteLeft
} from "@fortawesome/free-solid-svg-icons";

export default function JobOffer() {
    const router = useRouter()
    const [data, setData] = useState({
        tituloOferta: "",
        descripcionOferta: "",
        beneficios: [],
        requisitos: [],
        nuevoBeneficio: '',
        nuevoRequisito: '',
        modalidadTrabajo: "",
        empresa: "",
        idEmpresa: ""
    })

    const [beneficio, setBeneficios]: any = useState()
    const [requisito, setRequisitos]: any = useState()

    const onHandleInputChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setData({ ...data, [name]: newValue });
    }

    const onHandleBeneficiosChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setBeneficios(newValue);

    }

    const onHandleRequisitosChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setRequisitos(newValue);

    }

    const loadBeneficio = (e: any) => {
        e.preventDefault()
        
        const newArray = [
            ...data.beneficios,
            beneficio
        ];
        
        if (beneficio != '') setData({ ...data, beneficios: newArray });
        setBeneficios('');
    }
    const loadRequisito = (e: any) => {
        e.preventDefault()
        const newArray = [
            ...data.requisitos,
            requisito
        ];
        if (requisito != '') setData({ ...data, requisitos: newArray });
        setRequisitos('');
    }

    const deleteBeneficio = (e: any) => {
        e.preventDefault()
        if (beneficio == '') {
            let arrayNew = data.beneficios.pop()
            setData({ ...data, beneficios: arrayNew });
        }
        const newArray = data.beneficios.filter((item: any, index: any) => item !== beneficio);
        setData({ ...data, beneficios: newArray });

    };

    const deleteRequisito = (e: any) => {
        e.preventDefault()
        if (beneficio == '') {
            let arrayNew = data.requisitos.pop()
            setData({ ...data, requisitos: arrayNew });
        }
        const newArray = data.requisitos.filter((item: any, index: any) => item !== requisito);
        setData({ ...data, requisitos: newArray });

    };
    //Getting the data for enterprise user
    const getUserDetails = async () => {
        const res = await axios.post("/api/enterprise/me");
        setData({ ...data, empresa: res.data?.empresaNombre, idEmpresa: res?.data.idEmpresa });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(data);
        const response = await axios.post('/api/enterprise/jobOffer/save', { data: data })
        if (response.status === 200) {
            console.log(response);
            //router.push('/enterprise/jobOffers')
        }

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


        <div className="row g-0">
            <div className="col-lg-6 p-3 mb-2">
                <div className="px-1 py-5 mx-auto">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>Oferta de trabajo</h3>
                            <p className="blue-text">Datos de la publicacion</p>
                            <form className="form-card" onSubmit={handleSubmit} >
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Titulo<span className="text-danger"> *</span></label>
                                        <input type="text" id="tituloOferta" required name="tituloOferta" onChange={onHandleInputChange} className="form-control" placeholder="Titulo de la oferta de empleo" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left mt-3">
                                    <div className="form-group col-sm-12 flex-column d-flex"> <label className="form-control-label px-3">Descripcion de la oferta<span className="text-danger"> *</span></label>
                                        <textarea id="descripcionOferta" className="form-control" name="descripcionOferta" onChange={onHandleInputChange} placeholder="Descripcion de la oferta de empleo" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left mt-3">
                                    <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Modalidad de Trabajo<span className="text-danger"> *</span></label>
                                        <input type="text" id="modalidadTrabajo" required name="modalidadTrabajo" onChange={onHandleInputChange} className="form-control" placeholder="Modalidad de la oferta de empleo" />
                                    </div>
                                </div>
                                {/* colocar para el guardado de datos */}
                                <hr />
                                {/*  Array */}
                                <div className="row mt-3">
                                    <div className="col-md-12 text-left"> <label className="form-control-label px-3">Beneficios<span className="text-danger"> *</span></label>
                                        <input type="text" id="beneficios" name="beneficios" onChange={onHandleBeneficiosChange} value={beneficio} className="form-control" placeholder="Beneficios de la oferta" />
                                    </div>
                                    <div className="col-md-3 text-start justify-content-between mt-2">
                                        <button onClick={loadBeneficio} className="btn btn-sm btn-primary rounded"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                                        <button onClick={deleteBeneficio} className="btn btn-sm btn-danger rounded ml-2"><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                                    </div>

                                </div>
                                {/* Array */}
                                <div className="row justify-content-between text-left mt-3">
                                    <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Requisitos<span className="text-danger"> *</span></label>
                                        <input type="text" id="requisito" name="requisito" onChange={onHandleRequisitosChange} value={requisito} className="form-control" placeholder="Requisitos de la oferta" />
                                    </div>
                                    <div className="col-md-3 text-start justify-content-between mt-2">
                                        <button onClick={loadRequisito} className="btn btn-sm btn-primary rounded"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                                        <button onClick={deleteRequisito} className="btn btn-sm btn-danger rounded ml-2"><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left mt-3">
                                    <div className="form-group col-md-12 flex-column d-flex">
                                        <button className='btn btn-sm btn-primary' type='submit'> Publicar anuncio</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 align-items-right mt-5 p-5">
                <h3>Publicación: </h3>
                <CardOffer data={data} />
            </div>
        </div>
    )
}