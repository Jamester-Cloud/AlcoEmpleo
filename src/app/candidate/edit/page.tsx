
"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Image from "next/image";
import "@/app/candidate/edit/css/style.css"

export default function UserCandidate() {

    const [userData, setUserData]: any = useState()
    const [email, setEmail] = useState();
    const [candidatoData, setCandidatoData]: any = useState();

    const getUserDetails = async () => {
        const res = await axios.get("../api/candidate/me");
        if (res.status === 200 && res.data.success) {
            console.log(res.data)
            setUserData(res.data.dataPersona)
            setCandidatoData(res.data.dataCandidato)
            setEmail(res.data.emailUsuario)
        }
    }

    useEffect(() => {
        if (!userData) {
            (async () => {
                try {
                    await getUserDetails()
                } catch (err) {
                    console.log('Error al cargar los datos el usuario');
                }
            })()
        }

    })

    return (
        <div className="row p-3">
            <div className="col-md-12 text-left border-right">
                <div className="py-5">
                    <div className="justify-content-left align-items-left">
                        <div className="d-flex justify-content-left align-items-left experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Datos personales</span></div><br />
                    </div>

                    <div className="row justify-content-center mb-2">
                        <div className="col-md-6">
                            <div className="d-flex flex-column align-items-center ">
                                <Image className="rounded-circle" width={100} height={100} src="/alcologo.png" alt="GrupoAlcoLogo" />
                                <span className="font-weight-bold mt-2 mb-2">{userData?.nombre || ''} {userData?.apellido || ''}</span><span className="text-black-50">{userData?.email || ''}</span><span> </span>
                                <label htmlFor="profilePicture">Actualizar foto de perfil</label>
                                <input type="file" placeholder="Actualizar foto" className="form-group form-control" id="profilePicture" name="profilePicture" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6"><label className="labels">Nombre</label><input type="text" className="form-control" placeholder="Nombre" defaultValue={userData?.nombre || ''} /></div>
                        <div className="col-md-6"><label className="labels">Apellido</label><input type="text" className="form-control" placeholder="Apellido" defaultValue={userData?.apellido || ''} /></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label className="labels">Telefono</label>
                            <input type="text" className="form-control" placeholder="telefono de contacto" defaultValue={userData?.telefono} />
                        </div>
                        <div className="col-md-6"><label className="labels">Email</label><input type="text" className="form-control" placeholder="Email de contacto" defaultValue={email} /></div>

                        <div className="col-md-12"><label className="labels">Direccion</label>
                            <input type="text" className="form-control" placeholder="Direccion" defaultValue={userData?.direccion} />
                        </div>

                    </div>
                </div>
            </div>
            <hr />
            {/* Perfil */}
            <div className="col-md-12">
                <div className="">
                    <div className="d-flex justify-content-left align-items-left experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Perfil Laboral</span></div><br />
                    <div className="mb-5">
                        <div className="row">
                            <div className="col-md-6"><label className="labels">Puesto deseado</label><input type="text" className="form-control" placeholder="Nombre" defaultValue={candidatoData?.perfil?.puestoDeseado} /></div>
                            <div className="col-md-6"><label className="labels">Salario Deseado</label><input type="number" className="form-control" placeholder="Salario deseado" defaultValue={candidatoData?.perfil?.salarioDeseado} /></div>
                        </div>
                        <div className="row">

                            <div className="col-md-12"><label className="labels">Descripcion Personal</label><textarea className="form-control" placeholder="Descripcion personal" defaultValue={candidatoData?.perfil?.descripcionPersonal} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* experiencias */}
            <div className="col-md-12 mb-2">
                <div className="">
                    <div className="d-flex justify-content-left align-items-left experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experiencias Laborales:</span></div><br />
                    {candidatoData?.experiencias?.map((item: any) => (
                        <div className="row" key={item._id}>
                            <h5>Experiencia:</h5>
                            <div className="col-md-3"><label className="labels">Empresa</label><input type="text" className="form-control" placeholder="Empresa" defaultValue={item.nombreEmpresa} /></div>
                            <div className="col-md-3"><label className="labels">Descripcíon</label><textarea className="form-control" defaultValue={item.descripcion} /></div>
                            <div className="col-md-3"><label className="labels">Duracíon</label><input type="text" defaultValue={item.duracion} className="form-control" placeholder="additional details" /></div>
                            <h6>Logros:</h6>
                            {item?.logros.map((subItem: any) => (
                                <div key={subItem._id}>
                                    <div className="col-md-12 mb-3"><label className="labels">Logro:</label><input type="text" defaultValue={subItem.descripcionLogro} className="form-control" placeholder="additional details" /></div>
                                </div>
                            ))}
                            <h6>Referencias:</h6>
                            {item?.referencias.map((subItem: any) => (
                                <div key={subItem._id}>
                                    <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label><input type="text" defaultValue={subItem.referencia} className="form-control" placeholder="additional details" /></div>
                                </div>
                            ))}
                            <hr />
                        </div>
                    ))}
                    {/* */}
                </div>
            </div>
            {/* habilidades */}
            <div className="col-md-12">
                {candidatoData?.habilidad?.map((item: any) => (
                    <div className="row" key={item._id}>
                        <div className="col-md-6"><label className="labels">Habilidad</label><input type="text" className="form-control" defaultValue={item.nombreHabilidad} placeholder="experience" /></div> <br />
                        <div className="col-md-6"><label className="labels">Nivel de habilidad</label><input type="text" className="form-control" defaultValue={item.nivelHabilidad} placeholder="experience" /></div> <br />
                    
                    </div>
                ))}

            </div>
            <hr />
            {/* documentos */}
            <div className="col-md-12 mb-3">
                <div className="">
                    <div className="d-flex justify-content-left align-items-left experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Curriculum Vitae</span></div><br />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex flex-column align-items-center ">
                                <input type="file" placeholder="Actualizar foto" className="form-group form-control" id="profilePicture" name="profilePicture" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 align-items-center border-right mb-5">
                <div className="text-center">
                    <button className="btn btn-block btn-primary" type="button">Editar perfil</button>
                </div>
            </div>
        </div>
    )
}