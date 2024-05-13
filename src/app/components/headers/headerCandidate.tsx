"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios"

export default function HeaderCandidate() {
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
    <header className="bg-dark">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <img
            className="mb-2 rounded"
            src="/AlcoSloganLogo.png"
            width={50}
            height={50}
            alt="GrupoAlco"
          />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <FontAwesomeIcon icon={faBars} width={30} height={30} />
          </button>
          {showMenu && (
            <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">
              {/* <Link href="#" className="block px-4 py-2 text-white hover:opacity-50 text-decoration-none">Buscar Empleo </Link>
              <Link href="#" className="block px-4 py-2 text-white hover:opacity-50 text-decoration-none">Subcripción</Link>
              <Link href="#" className="block px-4 py-2 text-white hover:opacity-50 text-decoration-none">Perfil</Link> */}

              <a href="#" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none cursor-pointer" onClick={logout}>Salir</a>
            </div>

          )}
        </div>

        <nav className="md:flex md:flex-column space-x-4 hidden">
          <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
            onClick={logout}>
            Salir
          </a>
        </nav>
      </div>
    </header>
  );
}
