"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
          <a href="#o" className="block px-4 py-2 text-white hover:opacity-50 text-decoration-none">Buscar Candidato</a>
          <a href="#-de" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none" >Subcripción</a>
          <a href="#" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none">Perfil</a>
          <a href="#" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none">Salir</a>
        </div>
        
          )}
        </div>
        <nav className="md:flex md:flex-column space-x-4 hidden">
          <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="#">
          Buscar Candidato
          </a>
          <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="#">
          Publicar Vacante
          </a>
          <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="#">
            Perfil
          </a>
          <a className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50" href="#">
            Salir
          </a>
        </nav>
      </div>
    </header>
  );
}
