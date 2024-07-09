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
        CV: File,
        descripcionPersonal: string,
        fechaPublicacion: Date,
        puestoDeseado: string,
        salarioDeseado: string,
    }
    nombre: string,
    apellido: string,
    direccion: string,
    correo: string,
    telefono: string,
    fechaNacimiento: Date,
    idExp: string,
    idUsuario:string
};

export default function DataModal(props: any) {
    let { data, title, show, onHide } = props;

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
            fechaNacimiento: undefined,
        }
    });
    //Carga de logros y referencias predeterminados del candidato
    useEffect(() => {

        let defaultValues = {
            logros: [],
            referencias: []
        }

        defaultValues.logros = data.logros?.map((item: any) => { return { descripcionLogro: item.descripcionLogro } })
        defaultValues.referencias = data.referencias?.map((item: any) => { return { referencia: item.referencia } })

        reset({ ...defaultValues })
    }, [data?.logros && data?.referencias])


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


    const onSubmitWithFiles = async (data: any) => {
        try {
            console.log(data);
            const res = await axios.post("/api/candidate/upload", data, { headers: { 'content-type': 'multipart/form-data' } })
            if (res.status == 200) {
                console.log("edicion exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const res = await axios.post("/api/candidate/upload", data, { headers: { 'content-type': 'application/json' } })
            if (res.status == 200) {
                console.log("edicion exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const form = (title: string) => {
        switch (title) {
            // case 'Datos personales':
            //     return (
            //         <form className='form' encType='multipart/form-data' method='post' name="personalData" id="personalData" onSubmit={handleSubmit(onSubmitWithFiles)}>
            //             <div className="row" >
            //                 <div className="col-md-12">
            //                     <label htmlFor="file">Actualizar foto de perfil</label>
            //                     <input type="file" placeholder="Actualizar foto" {...register("profilePicture", { required: true })} className="form-group form-control" id="profilePicture" name="profilePicture" />
            //                 </div><br />
            //                 <div className="col-md-6"><label className="labels">Nombre</label><input type="text"
            //                     className="form-control" defaultValue={data?.nombre} {...register("nombre", { required: true })} placeholder="Nombre" />
            //                     <input type="hidden" {...register('dataType')} defaultValue='datosPersonales' />
            //                     <input type="hidden" {...register('idPersona')} defaultValue={data._id} />
            //                 </div>
            //                 <div className="col-md-6"><label className="labels">Apellido</label><input type="text"
            //                     className="form-control" defaultValue={data?.apellido} placeholder="Apellido" {...register("apellido")} />
            //                 </div>
            //                 <div className="col-md-6"><label className="labels">Email</label><input type="text"
            //                     className="form-control" defaultValue={data?.emailUsuario} placeholder="Email" {...register("email")} />
            //                 </div>
            //                 <div className="col-md-6"><label className="labels">Telefono</label><input type="text"
            //                     className="form-control" defaultValue={data?.telefono} placeholder="Telefono"  {...register("telefono")} />
            //                 </div>
            //                 <div className="col-md-12"><label className="labels">Dirección</label>
            //                     <textarea
            //                         className="form-control" defaultValue={data?.direccion} placeholder="direccion"  {...register("direccion")} />
            //                 </div>
            //                 <br />
            //             </div>
            //             <div className="row text-center mt-5">
            //                 <button className="btn btn-primary btn-block">Guardar cambios</button>
            //             </div>
            //         </form>
            //     )
            case 'Experiencias':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6"><label className="labels">Empresa</label><input type="text" {...register("nombreEmpresa")} className="form-control" placeholder="Empresa" defaultValue={data.nombreEmpresa} /></div>
                            <div className="col-md-6"><label className="labels">Duracíon</label><input type="text" className="form-control" {...register("duracion")} placeholder="Duración" defaultValue={data.duracion} /></div>
                            <div className="col-md-12"><label className="labels">Descripcíon</label><textarea className="form-control" {...register("descripcion")} placeholder='Descripción' defaultValue={data.descripcion} /></div>
                            <input type="hidden" {...register("dataType")} defaultValue="exp" />
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
            //Perfil
            // case 'Perfil del candidato':
            //     return (
            //         <form onSubmit={handleSubmit(onSubmit)} className='form '>
            //             <div className="row" >
            //                 <div className="col-md-12"><label className="labels">Descripcion Personal</label><textarea className="form-control"
            //                     defaultValue={data?.descripcionPersonal} {...register("descripcionPersonal")} placeholder="experience" /></div> <br />
            //                 <div className="col-md-6"><label className="labels">Puesto Deseado</label><input type="text"
            //                     className="form-control" defaultValue={data?.puestoDeseado} {...register("puestoDeseado")} placeholder="Puesto deseado" />
            //                 </div>
            //                 <div className="col-md-6"><label className="labels">Salario</label><input type="text"
            //                     className="form-control" {...register("salario")} defaultValue={data?.salarioDeseado} placeholder="Salario" />
            //                     <input type="hidden" defaultValue="perfil" {...register("dataType")} />
            //                 </div>
            //                 {/* Alexander */}
            //                 <div className="col-md-6"><label className="labels">Idiomas</label><input type="text"
            //                     className="form-control" {...register("idiomas")} defaultValue={data?.idiomas} placeholder="Salario" />
            //                     {data?.idiomas?.map((item: any, key: any) =>
            //                         <>
            //                             <input type="text" placeholder='Idioma' /> / <input type="text" placeholder='Nivel' />
            //                         </>
            //                     )}
            //                 </div>

            //                 <div className="col-md-12">
            //                     <label className="labels">Curriculum</label>
            //                     <div className="d-flex flex-column align-items-center ">
            //                         <input type="file" accept=".jpg, .jpeg, .png, .pdf" placeholder="Actualizar CV" {...register("cv")} className="form-group form-control" id="cv" name="cv" />
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="row text-center mt-5">
            //                 <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
            //             </div>
            //         </form>
            //     )

            // case 'Editar experiencia':
            //     return (
            //         <form className='form'>
            //             <h5>Experiencia:</h5>
            //             <input type="hidden" name="dataType" defaultValue='empresa' />

            //             <div className="col-md-3"><label className="labels">Empresa</label><input type="text" className="form-control" placeholder="Empresa" defaultValue={data.nombreEmpresa} /></div>
            //             <div className="col-md-3"><label className="labels">Descripcíon</label><textarea className="form-control" defaultValue={data.descripcion} /></div>
            //             <div className="col-md-3"><label className="labels">Duracíon</label><input type="text" defaultValue={data.duracion} className="form-control" placeholder="additional details" /></div>
            //             <h6 className="mt-3">Logros:</h6>
            //             {data?.logros.map((subItem: any) => (
            //                 <div key={subItem._id}>
            //                     <div className="col-md-12 mb-3"><label className="labels">Logro:</label><input type="text" defaultValue={subItem.descripcionLogro} className="form-control" placeholder="additional details" /></div>
            //                 </div>
            //             ))}
            //             <h6>Referencias:</h6>
            //             {data?.referencias.map((subItem: any) => (
            //                 <div key={subItem._id}>
            //                     <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label><input type="text" defaultValue={subItem.referencia} className="form-control" placeholder="additional details" /></div>
            //                 </div>
            //             ))}
            //             <hr />
            //             <div className="row text-center">
            //                 <button className="btn btn-primary btn-block">Guardar cambios</button>

            //             </div>
            //         </form>

            //     )


            // case 'Editar habilidades':
            //     return (
            //         <form className='form '>
            //             <input type="hidden" name="dataType" defaultValue='habilidades' />
            //             {data?.map((item: any, key: any) => (
            //                 <div className="row" key={item._id}>
            //                     <div className="col-md-6"><label className="labels">Habilidad</label><input type="text" className="form-control"
            //                         defaultValue={item.nombreHabilidad} placeholder="experience" /></div> <br />
            //                     <div className="col-md-6"><label className="labels">Nivel de habilidad</label><input type="text"
            //                         className="form-control" defaultValue={item.nivelHabilidad} placeholder="experience" /></div> <br />
            //                 </div>
            //             ))}
            //             <div className="row text-center mt-5">
            //                 <button className="btn btn-primary btn-block">Guardar cambios</button>
            //             </div>
            //         </form>

            //     )
            // case 'formaciones academicas':
            //     break
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