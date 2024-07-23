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
        const enterpriseData = await axios.post('/api/administrator/enterprise');
        const homeData = await axios.post('/api/administrator/homepage');

        Promise.all([homeData, enterpriseData]).then((values:any) => {
            console.log(values[0].data)
            console.log(values[1].data)
            setSiteData(values[0].data);
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
                <div className="col-md-12">
                    Direccion Fisica
                    <form action="">
                            <input type="text" id="" />
                    </form>
                </div>
                <div className="col-md-12">Politica de privacidad
                    <form action="">

                    </form>
                </div>
                <div className="col-md-12">Texto Sliders
                    <form action="">

                    </form>
                </div>
                <div className="col-md-12">Telefonos
                    <form action="">

                    </form>
                </div>
                <div className="col-md-12">Texto Banners
                    <form action="">

                    </form>
                </div>


            </div>
        </div>
    )
}