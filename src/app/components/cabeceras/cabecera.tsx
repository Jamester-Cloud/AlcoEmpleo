"use client"
import Link from "next/link"
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.css';


export default function Cabecera() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className=" navbar navbar-expand-lg bg-primary p-3  text-sm">
            <Link className="navbar-brand text-white" href="/">
                <Image
                    width={50}
                    height={80}
                    className="img-fluid  rounded-2xl  p-1"
                    src="/AlcoSloganLogo.png"
                    alt="GrupoAlco"
                />
            </Link>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <FontAwesomeIcon icon={faBars} width={30} height={30} />
                </button>
                {showMenu && (
                    <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">

                        <Link href="/" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none cursor-pointer">Inicio </Link>
                        <Link href="/signup/candidate" className="block px-2 py-1 text-white hover:opacity-50 text-decoration-none">Candidatos </Link>
                        <Link href="/signup/enterprise" className="block px-2 py-1 text-white  hover:opacity-50 text-decoration-none">Empresas</Link>
                    </div>

                )}
            </div>
            <nav className="md:flex md:flex-column space-x-4 hidden">
                <Link href="/" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                    Inicio
                </Link>

                <Link href="/signup/candidate" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                    Candidatos
                </Link>

                <Link href="/signup/enterprise" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                    Empresas
                </Link>
                <Link href="/login" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                    Iniciar sesion
                </Link>
            </nav>

        </header>

    );
}