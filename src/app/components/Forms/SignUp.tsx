import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image";
import InputMask from 'react-input-mask';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function SignUpForm(props:any) {
    let {type} = props;
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
    //SignUp Component
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            toast.success('Registro exitoso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.push("/login");
        } catch (error: any) {
            toast.error(`Error en el registro del usuario: ${error.message} `, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
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

    useEffect(() => {

    }, [])


    return (
        <section className="">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="text-black" style={{ borderRadius: "25px" }}>
                            <div className="p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{loading ? 'Enviando datos...' : type}</p>

                                        <form className="mx-1 mx-md-4">

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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control' }
                                                        maxLength={26}
                                                        minLength={3}
                                                        required={true}
                                                    />
                                                    <label className="form-label" htmlFor="nombres">Nombres</label>
                                                </div>
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input type="text"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                        maxLength={26}
                                                        minLength={3}
                                                        required />
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                        maxLength={50}
                                                        minLength={5}
                                                        required

                                                         />
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                </div>

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="telefono"
                                                        name="telefono"
                                                        onChange={onHandleInputChange}
                                                        id="telefono"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} 
                                                        maxLength={15}
                                                        
                                                 
                                                        />
                                                    <label className="form-label" htmlFor="telefono">Telefono de contacto</label>
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} 
                                                        maxLength={30}
                                                        minLength={8}
                                                        required
                                                        />
                                                    <label className="form-label" htmlFor="password">Contraseña</label>
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
                                                        maxLength={30}
                                                      
                                                       
                                                    />
                                                    <label className={repeatedPassword === user.password ? "" : "text-danger"} htmlFor="passwordrep"> {repeatedPassword == user.password ? "Repite tu contraseña" : "Las contraseñas no coinciden"}</label>

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
                                                        minLength={20}
                                                        maxLength={150}
                                                        required
                                                    ></textarea>
                                                    <label className="form-label" htmlFor="direccion">Direccion de habitación</label>
                                                </div>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Estoy de acuerdo a los <a href="#!">Terminos de servicio del GrupoAlco</a>
                                                </label>
                                            </div> */}

                                        </form>
                                        <div className="text-center">
                                            <button type="button" onClick={onSignup} disabled={buttonDisabled} className="btn btn-primary btn-block">Crear cuenta</button>
                                            <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="light"
                                            />

                                        </div>
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