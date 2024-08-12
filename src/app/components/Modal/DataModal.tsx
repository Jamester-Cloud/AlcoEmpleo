"use client"
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast, Bounce } from 'react-toastify';



//Declarare un FormValues aca, para mejor control y manejo de todos los campos del candidato
type FormValues = {
    logros: {
        descripcionLogro: string;
    }[],
    referencias: {
        referencia: string
    }[],
    redes: {
        enlace: string
    }[],
    formacionesAcademicas: {
        titulo: String,
        institucion: String,
        duracion: String,
        tipoFormacion: String,
    }[]
    idiomas: {
        idioma: string,
        nivel: string
    }[],
    habilidad: {
        nombreHabilidad: string,
        nivelHabilidad: string
    }[],
    nombreEmpresa: string,
    descripcion: string,
    duracion: string,
    dataType: string,
    perfil: {
        CV: FileList,
        descripcionPersonal: string,
        fechaPublicacion: Date,
        puestoDeseado: string,
        salarioDeseado: string,
    }
    nombre: string,
    apellido: string,
    direccion: string,
    email: string
    correo: string,
    telefono: string,
    fechaNacimiento: Date,
    idExp: string,
    idAcademic: string
    idUsuario: string,
    idPersona: string,
    profilePicture: File
};

export default function DataModal(props: any) {

    let { data, title, show, onHide, candidatoData, setCandidatoData, setShow, modalType, id, setQuiz } = props;
    console.log(id)
    console.log(modalType);


    const methods = useForm<FormValues>({
        defaultValues: {
            perfil: {
                salarioDeseado: "",
                CV: undefined,
                descripcionPersonal: "",
                puestoDeseado: "",
                fechaPublicacion: undefined
            },
            logros: [{ descripcionLogro: "" }],
            referencias: [{ referencia: "" }],
            idiomas: [{ idioma: "", nivel: "" }],
            formacionesAcademicas: [{ titulo: "", institucion: "", duracion: "", tipoFormacion: "" }],
            habilidad: [{ nombreHabilidad: "", nivelHabilidad: "" }],
            redes: [{ enlace: "" }],
            nombre: "",
            apellido: "",
            direccion: "",
            correo: "",
            telefono: "",
            dataType: "",
            fechaNacimiento: undefined,
        }
    });
   

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
                candidatoData: res.data.dataCandidato,
            });
            console.log(res.data)
        }
    };

    useEffect(() => {

        let defaultValues = {
            logros: [],
            referencias: [],
        }
        defaultValues.referencias = data.referencias?.map((item: any) => { return { referencia: item.referencia } })

        defaultValues.logros = data.logros?.map((item: any) => { return { descripcionLogro: item.descripcionLogro } })

        reset({ ...defaultValues })
    }, [data?.logros && data?.referencias])

    useEffect(() => {
        let defaultValues = {
            idiomas: [],
        }

        defaultValues.idiomas = data.idiomas?.map((item: any) => { return { idioma: item.idioma, nivel: item.nivel } })

        reset({ ...defaultValues })
    }, [data?.idiomas])

 

    useEffect(() => {
        let defaultValues = {
            formacionesAcademicas: []
        }
        console.log(data);
        defaultValues.formacionesAcademicas = data.formacionesAcademicas?.map((item: any) => { return { titulo: item.titulo, institucion: item.institucion, duracion: item.duracion, tipoFormacion: item.tipoFormacion } })

        reset({ ...defaultValues })
    }, [data?.formacionesAcademicas])

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = methods;

    const { fields: fieldsLogro, append: appendLogro, remove: removeLogro } = useFieldArray({
        name: "logros",
        control
    });

    const { fields: fieldsRefs, append: appendRefs, remove: removeRefs } = useFieldArray({
        name: "referencias",
        control
    });

    const { fields: fieldsLanguages, append: appendLanguages, remove: removeLanguages } = useFieldArray({
        name: "idiomas",
        control
    });

    const { fields: fieldsAcademics, append: appendAcademics, remove: removeAcademics } = useFieldArray({
        name: "formacionesAcademicas",
        control
    });

    const { fields: fieldsRedes, append: appendRedes, remove: removeRedes } = useFieldArray({
        name: "redes",
        control
    });

    const { fields: fieldsSkills, append: appendSkills, remove: removeSkills } = useFieldArray({ name: "habilidad", control })

    const onSubmitWithFiles = async (data: any) => {
        try {
            data?.perfil?.CV ? data.perfil.CV = data.perfil.CV[0] : data.profilePicture = data.profilePicture[0]
            data.dataType = modalType
            console.log(data)
            // const res = await axios.post("/api/candidate/upload", data, { headers: { 'content-type': 'multipart/form-data' } })
            // if (res.status == 200) {
            //     console.log("edicion exitosa");
            //     await getUserDetails()
            //     setShow(false)
            //     reset()
            // }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data: any) => {
        try {

            data.dataType = modalType
            const res = await axios.post("/api/candidate/upload", data, { headers: { 'content-type': 'application/json' } })
            if (res.status == 200) {
                console.log("edicion exitosa");
                await getUserDetails()
                setShow(false)
                reset()

            }
        } catch (error) {
            console.log(error);
        }
    }


    const form = (title: string) => {
        switch (title) {
            case 'Nueva Experiencia':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6"><label className="labels">Empresa</label><input type="text" {...register("nombreEmpresa")} className="form-control" placeholder="Empresa" /></div>
                            <div className="col-md-6"><label className="labels">Duracíon</label><input type="text" className="form-control" {...register("duracion")} placeholder="Duración" /></div>
                            <div className="col-md-12"><label className="labels">Descripcíon</label><textarea className="form-control" {...register("descripcion")} placeholder='Descripción' /></div>
                            <input type="text" value={modalType} />
                            <input type="hidden" {...register("idExp")} defaultValue="new" />
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                        </div>
                        <h6 className="mt-3">Logros:</h6>
                        <button
                            type="button"
                            onClick={() =>
                                appendLogro({
                                    descripcionLogro: "",
                                })
                            }
                            className='btn btn-success'
                        >
                            Agregar logro
                        </button>
                        <div >
                            {fieldsLogro.map((field, index) => {

                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>

                                            <div className="col-md-6 mb-3">

                                                <label className="labels">Logros:</label>
                                                <input type="text" className="form-control" {...register(`logros.${index}.descripcionLogro` as const, {
                                                    required: true
                                                })} placeholder="logros" />
                                            </div>

                                            <div className="col-md-6 mt-4">
                                                <button type="button" onClick={() => removeLogro(index)}>
                                                    Eliminar Logro
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        <h6>Referencias:</h6>
                        <button
                            type="button"
                            onClick={() =>
                                appendRefs({
                                    referencia: "",
                                })
                            }
                            className='btn btn-success'
                        >
                            Agregar Referencia
                        </button>
                        <div className='row '>
                            {fieldsRefs.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"}>
                                            <div className="col-md-6">
                                                <label className="labels">Recomendado por:</label>
                                                <input
                                                    placeholder="Referencia"
                                                    {...register(`referencias.${index}.referencia` as const, {
                                                        required: true
                                                    })}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <button type="button" onClick={() => removeRefs(index)}>
                                                    Eliminar Referencia
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )

                break
            case 'Datos personales':
                return (
                    <form className='form' encType='multipart/form-data' method='post' onSubmit={handleSubmit(onSubmitWithFiles)}>
                        <div className="row" >
                            <div className="col-md-12">
                                <label htmlFor="file">Actualizar foto de perfil</label>
                                <input type="file" placeholder="Actualizar foto" {...register("profilePicture", { required: true })} className="form-group form-control" id="profilePicture" name="profilePicture" />
                            </div><br />
                            <div className="col-md-6"><label className="labels">Nombre</label><input type="text"
                                className="form-control" defaultValue={data?.nombre} {...register("nombre", { required: true })} placeholder="Nombre" />
                                <input type="hidden" {...register('idPersona')} defaultValue={data._id} />
                            </div>
                            <div className="col-md-6"><label className="labels">Apellido</label><input type="text"
                                className="form-control" defaultValue={data?.apellido} placeholder="Apellido" {...register("apellido")} />
                            </div>
                            <div className="col-md-6"><label className="labels">Email</label><input type="text"
                                className="form-control" defaultValue={data?.emailUsuario} placeholder="Email" {...register("email")} />
                            </div>
                            <div className="col-md-6"><label className="labels">Telefono</label><input type="text"
                                className="form-control" defaultValue={data?.telefono} placeholder="Telefono"  {...register("telefono")} />
                            </div>
                            <div className="col-md-12"><label className="labels">Dirección</label>
                                <textarea
                                    className="form-control" defaultValue={data?.direccion} placeholder="direccion"  {...register("direccion")} />
                            </div>
                            <br />
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
            case 'Experiencias':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6"><label className="labels">Empresa</label><input type="text" {...register("nombreEmpresa")} className="form-control" placeholder="Empresa" value={data.nombreEmpresa} /></div>
                            <div className="col-md-6"><label className="labels">Duracíon</label><input type="text" className="form-control" {...register("duracion")} placeholder="Duración" value={data.duracion} /></div>
                            <div className="col-md-12"><label className="labels">Descripcíon</label><textarea className="form-control" {...register("descripcion")} placeholder='Descripción' value={data.descripcion} /></div>
                            <input type="hidden" {...register("idExp")} defaultValue={data._id} />
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                        </div>
                        <h6 className="mt-3">Logros:</h6>
                        <button
                            type="button"
                            onClick={() =>
                                appendLogro({
                                    descripcionLogro: "",
                                })
                            }
                            className='btn btn-success'
                        >
                            Agregar logro
                        </button>
                        <div >
                            {fieldsLogro.map((field, index) => {

                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>

                                            <div className="col-md-6 mb-3">

                                                <label className="labels">Logros:</label>
                                                <input type="text" className="form-control" {...register(`logros.${index}.descripcionLogro` as const, {
                                                    required: true
                                                })} placeholder="logros" />
                                            </div>

                                            <div className="col-md-6 mt-4">
                                                <button type="button" onClick={() => removeLogro(index)}>
                                                    Eliminar Logro
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        <h6>Referencias:</h6>
                        <button
                            type="button"
                            onClick={() =>
                                appendRefs({
                                    referencia: "",
                                })
                            }
                            className='btn btn-success'
                        >
                            Agregar Referencia
                        </button>
                        <div className='row '>
                            {fieldsRefs.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-md-6">
                                                <label className="labels">Recomendado por:</label>
                                                <input
                                                    placeholder="Referencia"
                                                    {...register(`referencias.${index}.referencia` as const, {
                                                        required: true
                                                    })}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-md-6 mt-4">
                                                <button type="button" onClick={() => removeRefs(index)}>
                                                    Eliminar Referencia
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
                break
            case 'Perfil del candidato':
                return (
                    <form onSubmit={handleSubmit(onSubmitWithFiles)} className='form '>
                        <div className="row" >
                            <div className="col-md-12"><label className="labels">Descripcion Personal</label><textarea className="form-control"
                                defaultValue={data?.descripcionPersonal} {...register("perfil.descripcionPersonal")} placeholder="experience" /></div> <br />
                            <div className="col-md-6"><label className="labels">Puesto Deseado</label><input type="text"
                                className="form-control" defaultValue={data?.puestoDeseado} {...register("perfil.puestoDeseado")} placeholder="Puesto deseado" />
                            </div>
                            <div className="col-md-6"><label className="labels">Salario</label><input type="text"
                                className="form-control" {...register("perfil.salarioDeseado")} defaultValue={data?.salarioDeseado} placeholder="Salario" />
                                <input type="hidden" {...register('idUsuario')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                            </div>
                            <div className="col-md-12 mt-4">
                                <label className="labels">Curriculum</label>
                                <div className="d-flex flex-column align-items-center ">
                                    <input type="file" accept=".jpg, .jpeg, .png, .pdf" placeholder="Actualizar CV" {...register("perfil.CV", { required: true })} className="form-group form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
                        </div>
                    </form>
                )

            case 'Nueva formación academica':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                            <div className="row justify-content-left">
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendAcademics({
                                                titulo: "", institucion: "", duracion: "", tipoFormacion: ""
                                            })
                                        }
                                        className='btn btn-success'
                                    >
                                        Agregar Formación Academica
                                    </button>
                                </div>
                            </div>
                            {fieldsAcademics.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-8">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="labels">Titulo:</label>
                                                        <input type="text" className="form-control" {...register(`formacionesAcademicas.${index}.titulo` as const, {
                                                            required: true
                                                        })} placeholder="Titulo" />
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <label className="labels">Institución:</label>
                                                        <input type="text" className="form-control" {...register(`formacionesAcademicas.${index}.institucion` as const, {
                                                            required: true
                                                        })} placeholder="Institucion" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="labels">Tipo de formación academica:</label>
                                                        <input type="text" className="form-control" {...register(`formacionesAcademicas.${index}.tipoFormacion` as const, {
                                                            required: true
                                                        })} placeholder="Tipo de formación" />
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <label className="labels">Duración:</label>
                                                        <input type="text" className="form-control" {...register(`formacionesAcademicas.${index}.duracion` as const, {
                                                            required: true
                                                        })} placeholder="Duración" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <button type="button" className='btn mt-3' onClick={() => removeAcademics(index)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
                break;
            case 'Editar formación academica':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                            <input type="hidden" {...register('idAcademic')} defaultValue={data._id} />
                            <h6 className='mt-3'>Formacion Academica</h6>
                            <div className="col-md-6">
                                <label className="labels">Titulo:</label>
                                <input type="text" className="form-control" {...register(`formacionesAcademicas.${data.key}.titulo`, {
                                    required: true
                                })} placeholder="Titulo" value={data.titulo} />
                            </div>
                            <div className="col-md-6 ">
                                <label className="labels">Institución:</label>
                                <input type="text" className="form-control" {...register(`formacionesAcademicas.${data.key}.institucion` as const, {
                                    required: true
                                })} placeholder="Institucion" value={data.institucion} />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Tipo de formación academica:</label>
                                <input type="text" className="form-control" {...register(`formacionesAcademicas.${data.key}.tipoFormacion` as const, {
                                    required: true
                                })} placeholder="Tipo de formación" value={data.tipoFormacion} />
                            </div>
                            <div className="col-md-6 ">
                                <label className="labels">Duración:</label>
                                <input type="text" className="form-control" value={data.duracion} {...register(`formacionesAcademicas.${data.key}.duracion` as const, {
                                    required: true
                                })} placeholder="Duración" />
                            </div>
                        </div>

                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
            case 'Agregar habilidad':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('idUsuario')} defaultValue={localStorage.getItem('idUsuario') as string} />
                        <h6 className="mt-3">Logros:</h6>
                        <button
                            type="button"
                            onClick={() =>
                                appendSkills({
                                    nombreHabilidad: "",
                                    nivelHabilidad: ""
                                })
                            }
                            className='btn btn-success'
                        >
                            Agregar habilidad
                        </button>
                        <div >
                            {fieldsSkills.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>

                                            <div className="col-md-6 mb-3">
                                                <label className="labels">Habilidad:</label>
                                                <input type="text" className="form-control" {...register(`habilidad.${index}.nombreHabilidad` as const, {
                                                    required: true
                                                })} placeholder="Habilidad" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="labels">Nivel </label>
                                                <input type="text" className="form-control" {...register(`habilidad.${index}.nivelHabilidad` as const, {
                                                    required: true
                                                })} placeholder="Nivel" />
                                            </div>

                                            <div className="col-md-6 mt-4">
                                                <button type="button" onClick={() => removeSkills(index)}>
                                                    Eliminar habilidad
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>

                )
                break
            case 'Nuevo Idioma':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage.getItem('idUsuario') as string} />
                            <h6 className='mt-3'>Idiomas</h6>
                            <div className="row justify-content-left">
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendLanguages({
                                                idioma: "", nivel: ""
                                            })
                                        }
                                        className='btn btn-success'
                                    >
                                        Agregar idioma
                                    </button>
                                </div>
                            </div>
                            {fieldsLanguages.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-md-4">
                                                <label className="labels">Idioma:</label>
                                                <input type="text" className="form-control" {...register(`idiomas.${index}.idioma` as const, {
                                                    required: true
                                                })} placeholder="Idioma" />
                                            </div>
                                            <div className="col-md-4 ">
                                                <label className="labels">Nivel:</label>
                                                <input type="text" className="form-control" {...register(`idiomas.${index}.nivel` as const, {
                                                    required: true
                                                })} placeholder="Nivel" />
                                            </div>
                                            <div className="col-md-3">
                                                <button type="button" className='btn mt-3' onClick={() => removeLanguages(index)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )

            case 'Nuevo enlace':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <input type="hidden" {...register('idUsuario')} defaultValue={localStorage.getItem('idUsuario') as string} />

                            <h6 className='mt-3'>Nuevo enlace</h6>
                            <div className="row justify-content-left">
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            appendRedes({
                                                enlace: ""
                                            })
                                        }
                                        className='btn btn-success'
                                    >
                                        Agregar enlace
                                    </button>
                                </div>
                            </div>
                            {fieldsRedes.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"row"} key={field.id}>
                                            <div className="col-md-6 text-center">
                                                <label className="labels">Enlace:</label>
                                                <input type="url" className="form-control" {...register(`redes.${index}.enlace` as const, {
                                                    required: true
                                                })} placeholder="Redes" />
                                            </div>

                                            <div className="col-md-3">
                                                <button type="button" className='btn mt-3' onClick={() => removeRedes(index)}>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>)
                break;
        }
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    {form(title)}
                </div>
            </Modal.Body>
        </Modal>
    )
}