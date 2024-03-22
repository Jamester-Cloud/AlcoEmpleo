import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";
import Image from "next/image";

export default function SignUpForm() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    //states
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            router.push("/login");
        } catch (error: any) {
            toast.error("Error al iniciar sesion")
            console.log("sign up failed", error.message);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="text-black" style={{ borderRadius: "25px" }}>
                            <div className="p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Crear cuenta</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example1c">Nombres</label>
                                                </div>
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example1c">Apellidos</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Telefono de contacto</label>
                                                </div>
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Cedula de identidad</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Contraseña</label>
                                                </div>
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4cd">Repite tu contraseña</label>
                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <div className="form-outline flex-fill mb-0">
                                                    <textarea className="form-control" id="exampleTextarea" rows={3}></textarea>
                                                    <label className="form-label" htmlFor="exampleTextarea">Direccion de habitación</label>
                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Estoy de acuerdo a los <a href="#!">Terminos de servicio del GrupoAlco</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-block btn-lg">Crear cuenta</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 p-5 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <Image width={400} height={400} src="/AlcoSloganLogo.png"
                                            className="img-fluid" alt="GrupoAlcoLogo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}