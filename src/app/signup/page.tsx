"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios";
import { toast } from 'react-hot-toast'

export default function SignUpPage() {
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1> {loading ? "Processing..." : "Registro"} </h1>
            <div className="text-center">
                <h1>Registro de usuario</h1>
                <br />
            </div>
            <label htmlFor="username">Usuario</label>
            <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                placeholder="Nombre de usuario"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} />

            <label htmlFor="email">Email</label>
            <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                placeholder="Correo electronico"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">Contraseña</label>
            <input type="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                placeholder="Contraseña"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outlin">
                {buttonDisabled ? 'No puedes registrarte. No hay datos' : 'Registrarse'}
            </button>
            <Link href="/login" > Iniciar sesion</Link>
        </div>
    )
}