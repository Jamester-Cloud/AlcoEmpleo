"use client"
import React, {useState, useEffect} from 'react';
import CardOffer from "@/app/components/cards/CardJobOffer"
import "@/app/components/cards/css/styles.css"
export default function JobOffer() {
    
    const [data, setData] = useState({
        tituloOferta:"",
        descripcionOferta:"",
        beneficios:[],
        requisitos:[],
        modalidadTrabajo:"",
        idEmpresa:"",
    })
    
    const [inputs, setInputs] = useState([]);
    
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
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Titulo<span className="text-danger"> *</span></label> <input type="text" id="fname" name="fname" className="form-control" placeholder="Enter your first name" /> </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-sm-12 flex-column d-flex"> <label className="form-control-label px-3">Descripcion<span className="text-danger"> *</span></label> <textarea id="job" className="form-control" name="job" placeholder="" /> </div>
                                        </div>
                                        {/*  Array */}
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Beneficios<span className="text-danger"> *</span></label> <input type="text" id="lname" name="lname" className="form-control" placeholder="Beneficios" /> </div>
                                        </div>
                                        {/* Array */}
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex"> <label className="form-control-label px-3">Requisitos<span className="text-danger"> *</span></label> 
                                            <input type="text" id="lname" name="lname" className="form-control" placeholder="Requisitos" /> </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 p-2 text-center">
                        <CardOffer></CardOffer>
                    </div>

                </div>
            </div>

        </section>
    )
}