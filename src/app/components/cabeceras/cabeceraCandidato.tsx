"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link"
import Image from 'next/image';


export default function CabeceraCandidato() {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const router = useRouter()

    const logout = async () => {
        try {
            //destruye el token
            await axios.get('/api/users/logout')

            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <header className=" navbar navbar-expand-lg bg-light p-3 text-sm justify-content-between">
            <Link className="navbar-brand" href="/">
                <Image
                    width={50}
                    height={80}
                    className="img-fluid  rounded-2xl  p-1"
                    src="/AlcoSloganLogo.png"
                    alt="GrupoAlco"
                />
            </Link>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <FontAwesomeIcon icon={faBars} width={30} height={30} />
                </button>
                {showMenu && (
                    <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">
                        <Link href="/candidate/requests" className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                            Mis solicitudes
                        </Link>
                        <a className=" text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
                            onClick={logout}>
                            Salir
                        </a>
                    </div>

                )}
            </div>
            <nav className="md:flex md:flex-column space-x-4 hidden mr-5">
                <Link href="/candidate/requests" className=" text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                    Mis solicitudes
                </Link>
                <a className=" text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
                    onClick={logout}>
                    Cerrar Sesion
                </a>
            </nav>

        </header>
    );
}
