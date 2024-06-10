
"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import DataModal from "@/app/components/modal/DataModal";
import "@/app/candidate/edit/css/style.css"

export default function UserCandidate() {
    //Modal controls
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle]: any = useState();
    const [modalData, setModalData]: any = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //State data load
    const [candidatoData, setCandidatoData]: any = useState();
    //react hook form 

    const handleModal = (e: any, title: string, data: any, id:string) => {
        e.preventDefault()
        setModalTitle(title);
        setModalData({...data, id})
        setShow(true)
    }

    const getUserDetails = async () => {
        const res = await axios.post("/api/candidate/me", { idPersona: sessionStorage.getItem('idPersona'), idUsuario: sessionStorage.getItem('idUsuario') });
        if (res.status === 200 && res.data.success) {
            setCandidatoData({ ...candidatoData, userData: { ...res.data.dataPersona, emailUsuario: res.data.emailUsuario }, candidatoData: res.data.dataCandidato })
        }
    }
    console.log(candidatoData.userData);

    const loadItem = (data:any) => {

    }

    const deleteItem = (deleteItem:any) => {

    }

    useEffect(() => {
        if (!candidatoData) {
            (async () => {
                try {
                    await getUserDetails()
                } catch (err) {
                    console.log('Error al cargar los datos el usuario', err);
                }
            })()
        }
    })

    return (
        <div className="row p-3">
            <form >
                {/* Informacion personal y de contacto */}
                <div className="col-md-12 text-left border-right card mb-2">
                    <div className="py-5 card-header">
                        <div className="row align-items-right">
                            <div className="col-md-9">
                                <div className="d-flex justify-content-left align-items-left"><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Datos personales</span>
                                </div>
                            </div>
                            <div className="col-md-2 justify-content-right align-items-right">
                                <button className="" onClick={(e) => handleModal(e, "Datos personales", candidatoData?.userData, candidatoData.userData._id)}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center mb-2">
                            <div className="col-md-6">
                                <div className="d-flex flex-column align-items-center ">
                                    <Image className="rounded-circle" width={100} height={100} src="/alcologo.png" alt="GrupoAlcoLogo" />
                                    <span className="font-weight-bold mt-2 mb-2">{candidatoData?.userData?.nombre || ''} {candidatoData?.userData?.apellido || ''}</span><span className="text-black-50">{candidatoData?.emailUser || ''}</span><span> </span>
                                    <label htmlFor="profilePicture"> Foto de perfil</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <label className="labels">Nombres</label>
                                <h6 className="">{candidatoData?.userData?.nombre || ''}</h6>
                                <hr />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Apellidos</label>
                                <h6 className="">{candidatoData?.userData?.apellido || ''}</h6>
                                <hr />
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-6">
                                <label className="labels">Telefono</label>
                                <h6>{candidatoData?.userData?.telefono}</h6>
                                <hr />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Email</label>
                                <h6>{candidatoData?.userData.emailUsuario}</h6>
                                <hr />
                            </div>

                            <div className="col-md-12">
                                <label className="labels">Direccion</label>
                                <h6 >{candidatoData?.userData?.direccion}</h6>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Perfil */}
                <div className="col-md-12 card">
                    <div className="py-5 card-header">
                        <div className="row align-items-right">
                            <div className="col-md-9">
                                <div className="d-flex justify-content-left align-items-left"><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Perfil Laboral</span>
                                </div>
                            </div>
                            <div className="col-md-2 justify-content-right align-items-right">
                                <button className="btn text-primary" onClick={(e) => handleModal(e, "Perfil del candidato", candidatoData?.candidatoData.perfil, candidatoData._id)}>
                                    <FontAwesomeIcon icon={faPencil} /> Editar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="labels">Puesto deseado</label>
                                    <h6>{candidatoData?.candidatoData.perfil?.puestoDeseado}</h6>
                                    <hr />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Salario Deseado</label>
                                    <h6>{candidatoData?.candidatoData.perfil?.salarioDeseado}</h6>
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><label className="labels">Descripcion Personal</label>
                                    <h6>{candidatoData?.candidatoData.perfil?.descripcionPersonal} </h6>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* experiencias */}
                <div className="col-md-12 mb-2 card">
                    <div className="py-5 card-header">
                        <div className="row align-items-right">
                            <div className="col-md-9">
                                <div className="d-flex justify-content-left align-items-left  mr-2">
                                    <span className="border px-3 p-1 add-experience">
                                        <i className="fa fa-plus"></i>&nbsp;Experiencias Laborales
                                    </span>
                                    <button onClick={loadItem} className="btn btn-sm btn-primary rounded"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                                    <button onClick={deleteItem} className="btn btn-sm btn-danger rounded ml-2"><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {candidatoData?.candidatoData.experiencias?.map((item: any, key: any) => (
                            <div className="row" key={item._id}>
                                <div className="col-md-6"><label className="labels">Empresa:</label>
                                    <h6>{item.nombreEmpresa}</h6></div>
                                <div className="col-md-6 text-right"><button className="btn text-primary" onClick={(e) => handleModal(e, "Experiencias Laborales", item, candidatoData._id)}>
                                    <FontAwesomeIcon icon={faPencil} /> Editar
                                </button></div>
                                {/* <h6 className="mt-3">Logros:</h6>
                                {item?.logros.map((subItem: any) => (
                                    <div key={subItem._id}>
                                        <div className="col-md-12 mb-3"><label className="labels">Logro:</label>
                                            <h6>{subItem.descripcionLogro}</h6>
                                        </div>
                                    </div>

                                ))}
                                <h6>Referencias:</h6>
                                {item?.referencias.map((subItem: any) => (
                                    <div key={subItem._id}>
                                        <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label>
                                            <h6>{subItem.referencia}</h6>
                                        </div>
                                    </div>
                                ))}
                                <hr /> */}
                            </div>
                        ))}
                    </div>
                </div>
                {/* habilidades */}
                <div className="col-md-12 card">
                    <div className="py-5 card-header">
                        <div className="row align-items-right">
                            <div className="col-md-9">
                                <div className="d-flex justify-content-left align-items-left"><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Habilidades</span>
                                </div>
                            </div>
                            <div className="col-md-2 justify-content-right align-items-right">
                                <button className="btn text-primary" onClick={(e) => handleModal(e, "Habilidades", candidatoData?.candidatoData?.habilidad, candidatoData._id)}>
                                    <FontAwesomeIcon icon={faPencil} /> Editar
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="card-body">
                        {candidatoData?.candidatoData?.habilidad?.map((item: any) => (
                            <div className="row" key={item._id}>
                                <div className="col-md-6"><label className="labels">Habilidad</label><input type="text" className="form-control"
                                    defaultValue={item.nombreHabilidad} placeholder="experience" /></div> <br />
                                <div className="col-md-6"><label className="labels">Nivel de habilidad</label><input type="text"
                                    className="form-control" defaultValue={item.nivelHabilidad} placeholder="experience" /></div> <br />
                            </div>
                        ))}
                    </div> */}
                </div>
                <hr />
                {/* documentos */}
                {/* <div className="col-md-12 mb-3">
                    <div className="">
                        <div className="d-flex justify-content-left align-items-left experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Curriculum Vitae</span></div><br />
                        <div className="row">
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-md-12 align-items-center border-right mb-5">
                    <div className="text-center">
                        <button type="submit" className="btn btn-block btn-primary">Editar información</button>
                    </div>
                </div> */}
            </form>
            <DataModal show={show} onHide={handleClose} data={modalData} title={modalTitle} />
        </div>
    )
}