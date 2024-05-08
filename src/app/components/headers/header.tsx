"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link"


export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <img
            className="mb-2 rounded text-center"
            src="/AlcoSloganLogo.png"
            width={70}
            height={70}
            alt="GrupoAlco"
          />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <FontAwesomeIcon icon={faBars} width={30} height={30} />
          </button>
          {showMenu && (
            <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">
              <a > <Link href="/signup/candidate" className="block px-4 py-2 text-white hover:opacity-50 text-decoration-none">Candidatos </Link></a>
              <a   ><Link href="/signup/enterprise" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none">Empresas</Link></a>
              <a   ><Link href="#" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none cursor-pointer">Contacto </Link></a>
            </div>

          )}
        </div>
        <nav className="md:flex md:flex-column space-x-4 hidden">
          <a  >
            <Link href="/signup/candidate" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
              Candidatos
            </Link>
          </a>
            <Link href="/signup/enterprise" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
              Empresas
            </Link>
          
          <Link href="#" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer" >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
