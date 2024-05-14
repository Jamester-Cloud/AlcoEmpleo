"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

export default function CabeceraEmpresa() {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
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
        <header className="bg-primary p-0">
            <div className="container flex justify-between items-center">
                <a href="/">
                    <Image
                        width={110}
                        height={80}
                        className="img-fluid rounded-2xl p-1"
                        src="/AlcoSloganLogo.png"
                        alt="GrupoAlco"
                    />
                </a>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <FontAwesomeIcon icon={faBars} width={30} height={30} />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">
                            <Link href="/enterprise/" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" >
                                Buscar Candidato
                            </Link>
                            <Link href="/enterprise/jobOffer" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" >
                                Publicar Oferta
                            </Link>

                            <Link className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="#">
                                Perfil
                            </Link>
                            <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
                                onClick={logout}>
                                Salir
                            </a></div>
                    )}
                </div>
                <nav className="md:flex md:flex-column space-x-4 hidden">

                    <Link href="/enterprise/" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50">
                        Buscar Candidato
                    </Link>


                    <Link href="/enterprise/jobOffer" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" >
                        Publicar Oferta
                    </Link>

                    <Link className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="/profile/me">
                        Perfil
                    </Link>
                    <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
                        onClick={logout}>
                        Salir
                    </a>
                </nav>
            </div>
        </header>
    );
}