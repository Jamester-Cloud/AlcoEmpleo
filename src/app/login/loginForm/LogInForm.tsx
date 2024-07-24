import React, { useEffect } from "react";
import { useRouter } from "next/navigation"
import axios from "axios"

import Image from "next/image";
import { ToastContainer, toast, Bounce, ToastOptions, ToastPosition } from 'react-toastify';


export default function LogInForm() {

    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true)

            const response = await axios.post("/api/users/login", user)
            //Storing the data in sessionStore
            console.log(response.data)

            localStorage.setItem('idUsuario', response.data.idUsuario)
            localStorage.setItem('idPersona', response.data.idPersona)
            console.log(localStorage.getItem('idPersona'));
            console.log(localStorage.getItem('idUsuario'));


            let rol = response.data.userRol
            console.log(rol)
            switch (rol) {
                case 'admin':
                    console.log("Es Admin")
                    router.push('/admin')
                    break;
                case 'Candidatos':
                    router.push('/oportunidades')
                    break;
                case 'Empresas':
                    router.push('/enterprise')
                    break;
            }


        } catch (error: any) {
            const errorMessage = error.response.data.error.toLowerCase();

            const toastConfig: ToastOptions<ToastPosition> = {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce as any,
            };

            if (errorMessage === "invalid password") {

                toast.error(`Contraseña Invalida`, toastConfig);

            } else if (errorMessage === "user does not exist") {
                toast.error(`El usuario no existe`, toastConfig);

            }
            else {
                toast.error(`Hubo un error de Inicio de Sesión`, toastConfig);
            }
            console.log("Login failed", error.message)
        } finally {
            setLoading(false);
        }
    }
    //field validation
    useEffect(() => {
        user.email.length > 0 && user.password.length > 0 ? setButtonDisabled(true) : setButtonDisabled(false)
    })
    return (
        <form className="bg-white  rounded-2xl p-4 sm:p-5 mt-16  max-w-sm sm:max-w-md  mx-auto">
            <Image className=" max-w-xs mx-auto mb-2" src="/AlcoLogo.png" width={300} priority height={100} alt="GrupoAlco" />
            <div className="form-outline mb-4">
                <input type="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    id="form2Example1"
                    className="form-control"
                    value={user.email}
                />
                <label className="form-label" htmlFor="form2Example1">Correo electronico</label>
            </div>
            <div className="form-outline mb-4">
                <input type="password"
                    id="form2Example2"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    value={user.password}
                    className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Contraseña</label>
            </div>


            <div className="row mb-4">
                <div className="col-12 text-center">

                    {/* <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                </div> */}
                    <button type="button" onClick={onLogin} disabled={!buttonDisabled} className="btn btn-primary btn-block">Iniciar sesion</button>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />


                </div>
            </div>

        </form>
    )
}