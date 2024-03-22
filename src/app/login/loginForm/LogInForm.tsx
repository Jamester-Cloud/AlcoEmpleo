import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";
import Image from "next/image";

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
            console.log("Login successfull", response.data)
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.message)
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
        <form>
            <Image className="mb-2" src="/AlcoLogo.png" width={300} priority height={100} alt="GrupoAlco" />
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
                    <button type="button" onClick={onLogin} disabled={!buttonDisabled} className="btn btn-primary btn-block">Inicio de sesion</button>

                </div>
            </div>

            <div className="text-center">
                <p>¿No tienes una cuenta? <Link href="/signup" > Crear cuenta.</Link></p>
            </div>
         
        </form>
    )
}