"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast";


export default function LoginPage() {
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
            const response = await axios.post("/api/users/login")
            console.log("Login successfull",response.data)
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        user.email.length > 0 && user.password.length > 0 ? setButtonDisabled(true) : setButtonDisabled(false)
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="text-center">
                <h1>{loading ? 'Processing': 'Inicio de sesion'}</h1>
                <br />
            </div>

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

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outlin">
            {buttonDisabled ? 'No puedes registrarte. No hay datos' : 'Iniciar sesion'}
            </button>
            <Link href="/signup" > Registrate</Link>
        </div>
    )
}