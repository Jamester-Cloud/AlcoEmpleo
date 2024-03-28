"use client"
import axios from "axios"
import Link from "next/link"
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.get("api/users/me");
        console.log(res.data)
        setData(res.data.data._id);
    }

    const logout = async () => {
        try {
            //destruye el token
            await axios.get('/api/users/logout')

            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        (async () => {
            try {
              await getUserDetails()
            } catch (err) {
              console.log('Error al cargar los datos el usuario');
            }
          })();
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Pagina de perfil</h1>
            <h2 className="p-3 padding rounded bg-green-500">{data === 'nothing' ? "Nada" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Cerrar sesion
            </button>

            {/* <button onClick={getUserDetails} className="bg-green-900 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ver detalles del usuario
            </button> */}
        </div>

    )
}