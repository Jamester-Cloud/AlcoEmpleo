"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faLocation,
// } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link"
import React, { useState } from 'react'

export default function CardOffer(props: any) {
    let { data } = props;
    //console.log(data)
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card p-3 mb-2">
                    <div className="justify-content-center">
                        <div className="d-flex flex-row align-items-center">
                            <div className="icon"> <i className="bx bxl-mailchimp"></i> </div>
                            <div className="ms-2 c-details">
                                <h6 className="mb-0">{data?.empresa}</h6>
                            </div>
                        </div>
                        <div className="badge"> <span>{data?.modalidadTrabajo}</span> </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="heading">{data?.tituloOferta}<br />{data?.ubicacion}</h3>
                    </div>
                    <div className="card-body">
                        <div className="mt-5">
                            <p>{data?.descripcionOferta}</p>
                            <hr />
                            Beneficios:
                            <ul className="list-group">
                                {data.beneficios.map((beneficio:any) => (
                                    <li key={Math.random()}>{beneficio}</li>
                                ))}
                            </ul>
                            <hr />
                            Requisitos:
                            <ul className="list-group">
                                {data.requisitos.map((requisito:any) => (
                                    <li key={Math.random()}>{requisito}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}