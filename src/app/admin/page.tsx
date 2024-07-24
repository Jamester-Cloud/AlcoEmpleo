"use client"
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from 'react-toastify';
type FormValues = {
    sliders: {
        titulo: string,
        texto: string
    }[],
    celular: {
        numero: string,
    }[],
    banner: {
        titulo: string,
        texto: string
    }[],
    secciones: {
        titulo: string,
        texto: string
    }[],
    politicaPrivacidad: string,
    direccion: string,

};
export default function AdminPage() {

    const methods = useForm<FormValues>({
        defaultValues: {
            sliders: [{ titulo: "", texto: "" }],
            celular: [{ numero: "" }],
            banner: [{ titulo: "", texto: "" }],
            secciones: [{ titulo: "", texto: "" }],
            politicaPrivacidad: "",
            direccion: "",
        }
    });

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = methods;

    //array fields
    const { fields: fieldsSliders, append: appendSliders, remove: removeSliders } = useFieldArray({
        name: "sliders",
        control
    });

    const { fields: fieldsBanners, append: appendBanners, remove: removeBanners } = useFieldArray({
        name: "banner",
        control
    });

    const { fields: fieldsSecciones, append: appendSecciones, remove: removeSecciones } = useFieldArray({
        name: "secciones",
        control
    });

    const { fields: fieldsCelular, append: appendCelular, remove: removeCelular } = useFieldArray({
        name: "celular",
        control
    });
    //states
    const [candidates, setCandidates]: any = useState();
    const [enterprises, setEnterprises]: any = useState();
    const [siteData, setSiteData]: any = useState();
    //UseEffects
    useEffect(() => {
        let defaultValues = {
            celular: [],
            secciones: [],
            banner: [],
            sliders: []
        }

        defaultValues.celular = siteData?.homePage[0]?.celular?.map((item: any) => { return { numero: item.numero } })
        defaultValues.sliders = siteData?.homePage[0]?.sliders?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })
        defaultValues.secciones = siteData?.homePage[0]?.secciones?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })
        defaultValues.banner = siteData?.homePage[0]?.banner?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })

        reset({ ...defaultValues })
    }, [siteData?.homePage[0]])


    useEffect(() => {
        fetchData()
        console.log(enterprises?.paginatedEmpresaQuery)
    }, [!siteData, !candidates, !enterprises])

    const fetchData = async () => {

        try {
            const candidateData = await axios.post('/api/administrator/candidates');
            const enterpriseData = await axios.post('/api/administrator/enterprise');
            const homeData = await axios.post('/api/administrator/homepage');

            Promise.all([homeData, enterpriseData, candidateData]).then((values: any) => {
                console.log("Empresa", values[1].data)
                console.log("Candidatos", values[2].data)

                setSiteData(values[0].data);
                setEnterprises(values[1].data)
                setCandidates(values[2].data)
            })
        } catch (error) {
            console.log("error en la peticion de datos para el panel", error)
        }
    }

    const handleUserSubscripcion = async (id: string, isPremium: boolean) => {
        try {
            const subscription = await axios.post('/api/administrator/subscription', { idUsuario: id, isPremium: isPremium })
            if (subscription.status === 200) console.log("Peticion completada exitosamente"), fetchData();
        } catch (error) {
            console.log("Error al procesar la solicitud de subscripcion", error)
        }
    }

    return (
        <div className="container text-left">
            <div className="row">
                <div className="col-md-12">
                    tabla candidatos
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates?.paginatedCandidateQuery?.map((item: any, key: number) => (
                                <tr key={key}>
                                    <td>{item.personaData.nombre} {item.personaData.apellido}</td>
                                    <td>{item.usuarioData.isPremium ? <button onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)} className='btn btn-danger btn-round'>Anular Subscripcion</button> : <button onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)} className='btn btn-outline-success btn-block'>Aprobar Subscripcion</button>}</td>
                                    <td><button className='btn btn-info btn-round'>Ver Perfil</button></td>
                                    <td><button className='btn btn-danger btn-round'>Suspender Usuario</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
                <div className="col-md-12">
                    tabla empresas
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {enterprises?.paginatedEmpresaQuery?.map((item: any, key: number) => (
                                <tr key={key}>
                                    <td>{item.personaData.nombre}</td>
                                    <td>{item.usuarioData.isPremium ? <button className='btn btn-error btn-round'>Anular Subscripcion</button> : <button className='btn btn-outline-secondary btn-block'>Aprobar Subscripcion</button>}</td>
                                    <td><button className='btn btn-info btn-round'>Ver Perfil</button></td>
                                    <td><button className='btn btn-danger btn-round'>Suspender Usuario</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
                {/* Configuracion del sitio principal */}
                <hr />
                Configuracion del sitio
                <form >
                    <div className="col-md-12">
                        <label htmlFor="">Direccion Fisica</label>
                        <textarea className='form-control' id="" defaultValue={siteData?.homePage[0].direccion} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="">Politica de privacidad</label>
                        <input type="text" className='form-control' id="" defaultValue={siteData?.homePage[0].politicaPrivacidad} />
                    </div>
                    <div className="col-md-12">Texto Sliders
                        {fieldsSliders.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <section className={"row"} key={field.id}>
                                        <div className="col-md-6">
                                            <label className="labels">Titulo del slider:</label>
                                            <input type="text" className="form-control" {...register(`sliders.${index}.titulo` as const, {
                                                required: true
                                            })} placeholder="Titulo" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Texto del slider:</label>
                                            <input type="text" className="form-control" {...register(`sliders.${index}.texto` as const, {
                                                required: true
                                            })} placeholder="Texto" />
                                        </div>
                                    </section>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-md-12">
                        Telefonos
                        <div className="row justify-content-left">
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    onClick={() =>
                                        appendCelular({
                                            numero: ""
                                        })
                                    }
                                    className='btn btn-success'
                                >
                                    Agregar telefono de contacto
                                </button>
                            </div>
                        </div>
                        {fieldsCelular.map((field, index) => {
                            return (
                                <div key={field.id}>
                                    <section className={"row"} key={field.id}>
                                        <div className="col-md-6">
                                            <label className="labels">Numero:</label>
                                            <input type="text" className="form-control" {...register(`celular.${index}.numero` as const, {
                                                required: true
                                            })} placeholder="Numero" />
                                        </div>

                                        <div className="col-md-6">
                                            <button type="button" className='btn mt-3' onClick={() => removeCelular(index)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className="col-md-12">Texto Banners
                        <div className="col-md-12">
                            {fieldsBanners.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-md-6">
                                                <label className="labels">Titulo del banner:</label>
                                                <input type="text" className="form-control" {...register(`banner.${index}.titulo` as const, {
                                                    required: true
                                                })} placeholder="Titulo" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Texto del banner:</label>
                                                <input type="text" className="form-control" {...register(`banner.${index}.texto` as const, {
                                                    required: true
                                                })} placeholder="Texto" />
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-12">Texto Secciones
                        <div className="col-md-12">
                            {fieldsSecciones.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-md-6">
                                                <label className="labels">Titulo de la sección:</label>
                                                <input type="text" className="form-control" {...register(`secciones.${index}.titulo` as const, {
                                                    required: true
                                                })} placeholder="Titulo" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Texto de la sección:</label>
                                                <input type="text" className="form-control" {...register(`secciones.${index}.texto` as const, {
                                                    required: true
                                                })} placeholder="Texto" />
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-md-12-">
                        <button className='btn btn-primary'>Guardar configuración</button>
                    </div>
                </form>
            </div>
        </div>
    )
}