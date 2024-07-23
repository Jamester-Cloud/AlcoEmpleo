"use client"
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
    sliders: {
        descripcionLogro: string;
    }[],
    telefonos: {
        referencia: string
    }[],
    banners: {
        enlace: string
    }[],
};
export default function AdminPage() {
    const [candidates, setCandidates] = useState();
    const [enterprises, setEnterprises] = useState();
    const [siteData, setSiteData] = useState();

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        // const candidateData = await axios.post('/api/admin/candidate');
        // const enterpriseData = await axios.post('/api/admin/enterprise');
        const homeData = await axios.post('/api/administrator/homepage');

        Promise.all([homeData]).then((values) => {
            console.log(values)
        })
    }

    return (
        <div className="text-left">
            <div className="row">
                <div className="col-md-12">
                    tabla candidatos
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <th key={index}>Table heading</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>2</td>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>3</td>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-md-12">
                    tabla empresas
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* aca iria una tarjeta grande con la informacion del candidato
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td >Table cell {index}</td>
                                </tr>
                            ))}
                            <tr>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr> */}
                            <tr>
                                <td>logo Nombre: Ancarina</td>
                                <td>subscripcion</td>
                                <td>ver perfil</td>
                                <td>Desactivar</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {/* Configuracion del sitio principal */}
                <hr />
                Configuracion del sitio
                <div className="col-md-12">Direccion Fisica</div>
                <div className="col-md-12">Politica de privacidad</div>
                <div className="col-md-12">Texto Sliders</div>
                <div className="col-md-12">Telefonos</div>
                <div className="col-md-12">Texto Banners</div>


            </div>
        </div>
    )
}