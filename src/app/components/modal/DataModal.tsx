import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { faDeleteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DataModal(props: any) {
    let { data, title, show, onHide } = props;
    //para campos que no son ni experiencia ni habilidades. Campos sencillos
    //Por el momento
    const { register, handleSubmit, control, reset, trigger, setError } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
    });

    const [formData, setFormData]: any = useState("");

    const [open, setOpen] = useState(false);

    const onSubmit = (data: any) => {
        try {
            console.log(data);

            //const res  = axios.post("/api/candidate/upload")
        } catch (error) {
            console.log(error);
        }
    }

    //todo esto es para los logros
    const loadItem = (data: any) => {

    }

    //todo esto es para las habilidades
    const deleteItem = (data: any) => {

    }

    const form = (title: string) => {
        switch (title) {
            case 'addExperience':
                return (
                    <form className='form'>
                        <h5>Experiencia:</h5>
                        <div className="col-md-3"><label className="labels">Empresa</label><input type="text" {...register("empresa")} className="form-control" placeholder="Empresa" /></div>
                        <div className="col-md-3"><label className="labels">Descripcíon</label><textarea className="form-control" {...register("descripcion")} placeholder='Descripción' /></div>
                        <div className="col-md-3"><label className="labels">Duracíon</label><input type="text" className="form-control" {...register("duracion")} placeholder="Duración" /></div>
                        <h6 className="mt-3">Logros:</h6>
                        <div>
                            <div className="col-md-12 mb-3"><label className="labels">Logros:</label><input type="text" className="form-control" {...register("logros")} placeholder="additional details" /></div>
                        </div>
                        <h6>Referencias:</h6>
                        <div>
                            <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label><input type="text" className="form-control" placeholder="additional details" /></div>
                        </div>
                        <hr />
                        <div className="row text-center">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
                break
            //Perfil
            case 'Perfil del candidato':
                return (
                    <form onSubmit={handleSubmit(onSubmit)} className='form '>
                        <div className="row" >
                            <div className="col-md-12"><label className="labels">Descripcion Personal</label><textarea className="form-control"
                                defaultValue={data?.descripcionPersonal} {...register("descripcionPersonal")} placeholder="experience" /></div> <br />
                            <div className="col-md-6"><label className="labels">Puesto Deseado</label><input type="text"
                                className="form-control" defaultValue={data?.puestoDeseado} {...register("puestoDeseado")} placeholder="Puesto deseado" />
                            </div>
                            <div className="col-md-6"><label className="labels">Salario</label><input type="text"
                                className="form-control" {...register("salario")} defaultValue={data?.salarioDeseado} placeholder="Salario" />
                                <input type="hidden" defaultValue="perfil" {...register("dataType")} />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Curriculum</label>
                                <div className="d-flex flex-column align-items-center ">
                                    <input type="file" placeholder="Actualizar CV" {...register("cv")} className="form-group form-control" id="cv" name="cv" />
                                </div>
                            </div>

                            <br />
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
                        </div>
                    </form>
                )
                break;

            case 'Datos personales':
                return (
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row" >
                            <div className="col-md-12">
                                <label htmlFor="file">actualizar foto de perfil</label>
                                <input type="file" placeholder="Actualizar foto" {...register("profilePicture")} className="form-group form-control" id="profilePicture" name="profilePicture" />
                            </div><br />
                            <div className="col-md-6"><label className="labels">Nombre</label><input type="text"
                                className="form-control" defaultValue={data?.puestoDeseado} {...register("nombre")} placeholder="Nombre" />
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
                            <br />
                        </div>
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>
                )
                break;

            case 'Experiencias Laborales':
                return (
                    <form className='form'>
                        <h5>Experiencia:</h5>
                        <div className="col-md-3"><label className="labels">Empresa</label><input type="text" className="form-control" placeholder="Empresa" defaultValue={data.nombreEmpresa} /></div>
                        <div className="col-md-3"><label className="labels">Descripcíon</label><textarea className="form-control" defaultValue={data.descripcion} /></div>
                        <div className="col-md-3"><label className="labels">Duracíon</label><input type="text" defaultValue={data.duracion} className="form-control" placeholder="additional details" /></div>
                        <h6 className="mt-3">Logros:</h6>
                        {data?.logros.map((subItem: any) => (
                            <div key={subItem._id}>
                                <div className="col-md-12 mb-3"><label className="labels">Logro:</label><input type="text" defaultValue={subItem.descripcionLogro} className="form-control" placeholder="additional details" /></div>
                            </div>
                        ))}
                        <h6>Referencias:</h6>
                        {data?.referencias.map((subItem: any) => (
                            <div key={subItem._id}>
                                <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label><input type="text" defaultValue={subItem.referencia} className="form-control" placeholder="additional details" /></div>
                            </div>
                        ))}
                        <hr />
                        <div className="row text-center">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>

                        </div>
                    </form>

                )
                break;

            case 'Habilidades':
                return (
                    <form className='form '>
                        {data?.map((item: any, key: any) => (
                            <div className="row" key={item._id}>
                                <div className="col-md-6"><label className="labels">Habilidad</label><input type="text" className="form-control"
                                    defaultValue={item.nombreHabilidad} placeholder="experience" /></div> <br />
                                <div className="col-md-6"><label className="labels">Nivel de habilidad</label><input type="text"
                                    className="form-control" defaultValue={item.nivelHabilidad} placeholder="experience" /></div> <br />
                            </div>
                        ))}
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>

                )
                break
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