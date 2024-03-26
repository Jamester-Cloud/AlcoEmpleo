import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";
import Image from "next/image";
import InputMask from 'react-input-mask';

export default function SignUpForm() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        cedula: "",
        direccion: "",
        nombres: "",
        apellidos: "",
        telefono: ""
    })
    //states
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [hasTyped, setHasTyped] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [repeatedPassword, setRepeatedPassword] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            toast.success("Datos enviados correctamente")
            router.push("/login");
        } catch (error: any) {
            toast.error("Error al iniciar sesion")
            console.log("sign up failed", error.message);
        } finally {
            setLoading(false);
        }

    }

    const onHandleInputChange = ({ target: { name, value, id } }: any) => {
        let newValue = value;
        console.log(name)

        setUser({ ...user, [name]: newValue });
        setHasTyped(true);
        setIsInvalid(newValue ? true : false)
    }

    const isFormValid = () => {
        return Object.values(user).every((value) => value !== '');
    };

    useEffect(() => {
        setButtonDisabled(!isFormValid());
    }, [user]);


    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="text-black" style={{ borderRadius: "25px" }}>
                            <div className="p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{loading ? 'Enviando datos...' : 'Crear cuenta'}</p>

                                        <form onSubmit={onSignup} method="POST" className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <InputMask
                                                        name="cedula"
                                                        id="cedula"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                        mask='V-99999999'
                                                    />
                                                    <label className="form-label" htmlFor="cedula">Cedula de identidad</label>
                                                    <hr />
                                                </div>

                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        name="nombres"
                                                        type="text"
                                                        onChange={onHandleInputChange}
                                                        id="nombres"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                    />
                                                    <label className="form-label" htmlFor="nombres">Nombres</label>
                                                </div>
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input type="text"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <label className="form-label" htmlFor="apellidos">Apellidos</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="email"
                                                        onChange={onHandleInputChange}
                                                        id="email"
                                                        name="email"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                </div>

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="telefono"
                                                        name="telefono"
                                                        onChange={onHandleInputChange}
                                                        id="telefono"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <label className="form-label" htmlFor="form3Example3c">Telefono de contacto</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <label className="form-label" htmlFor="form3Example4c">Contraseña</label>
                                                </div>
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        name="passwordrep"
                                                        value={repeatedPassword}
                                                        id="passwordrep"
                                                        onChange={(e) => setRepeatedPassword(e.target.value)}
                                                        className={'form-control'}
                                                    />
                                                    <label className={repeatedPassword === user.password ? "" : "text-danger"} htmlFor="form3Example4cd"> {repeatedPassword == user.password ? "Repite tu contraseña" : "Las contraseñas no coinciden"}</label>

                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <div className=" flex-fill mb-0">
                                                    <textarea
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                        onChange={onHandleInputChange}
                                                        id="direccion"
                                                        name="direccion"
                                                        rows={3}
                                                    ></textarea>
                                                    <label className="form-label" htmlFor="exampleTextarea">Direccion de habitación</label>
                                                </div>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Estoy de acuerdo a los <a href="#!">Terminos de servicio del GrupoAlco</a>
                                                </label>
                                            </div> */}

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" disabled={buttonDisabled} className="btn btn-primary btn-block">Crear cuenta</button>
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