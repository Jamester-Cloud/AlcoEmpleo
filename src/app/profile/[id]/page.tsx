
"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function UserProfile({ params }: any) {

    const [userData, setUserData] : any = useState()

    const getUserDetails = async () => {
        const res = await axios.get("../api/users/me");
        return res.data.personaData
    }

    useEffect(() => {
        if (!userData) {
            (async () => {
                try {
                    const userData = await getUserDetails()
                    console.log(userData);
                    setUserData(userData);

                } catch (err) {
                    console.log('Error al cargar los datos el usuario');
                }
            })()
        }
        console.log(userData);
    }, [userData])

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    {/* Profile photo */}
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">{userData?.nombre || ''} {userData?.apellido || ''}</span><span className="text-black-50">{userData?.email || ''}</span><span> </span></div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Edicion de perfil candidato</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Nombre</label><input type="text" className="form-control" placeholder="Nombre" defaultValue={userData?.nombre || ''} /></div>
                            <div className="col-md-6"><label className="labels">Apellido</label><input type="text" className="form-control" placeholder="Apellido"  defaultValue={userData?.apellido || ''} /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Telefono</label><input type="text" className="form-control" placeholder="telefono de contacto" defaultValue={userData?.telefono} /></div>
                            <div className="col-md-12"><label className="labels">Direccion</label><input type="text" className="form-control" placeholder="Direccion" defaultValue={userData?.direccion}/></div>
                            <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter email id" defaultValue={userData?.email}/></div>
                        </div>
                        {/* <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Pais</label><input type="text" className="form-control" placeholder="country" /></div>
                            <div className="col-md-6"><label className="labels">Estado/Region</label><input type="text" className="form-control" placeholder="state" /></div>
                        </div> */}
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience"><span></span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experiencias</span></div><br />
                        <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" /></div> <br />
                        <div className="col-md-12"><label className="labels">Detalles adicionales</label><input type="text" className="form-control" placeholder="additional details" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}