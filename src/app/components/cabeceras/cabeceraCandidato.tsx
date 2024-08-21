"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface CabeceraCandidatoProps {
  toggleSidebar: () => void;
}

export default function CabeceraCandidato({
  toggleSidebar,
}: CabeceraCandidatoProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = () => {
    setShowMenu(false);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="navbar navbar-expand-lg bg-blue-900 p-3 text-sm justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="hidden sm:block focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} color="white" width={30} height={30} />
        </button>
      </div>
      <div className="flex items-center ml-auto space-x-4">
        <nav className="hidden md:flex md:flex-column space-x-4">
      
          <a
            className="text-decoration-none mt-2 text-white transition-opacity duration-300 hover:opacity-50 cursor-pointer"
            onClick={logout}
          >
            Cerrar Sesion
          </a>
        </nav>
        <Link className="navbar-brand" href="/candidate">
          <Image
            width={50}
            height={80}
            className="img-fluid rounded-2xl p-1"
            src="/AlcoSloganLogo.png"
            alt="GrupoAlco"
          />
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <FontAwesomeIcon icon={faBars} width={30} height={30} />
        </button>
        {showMenu && (
          <div ref={menuRef} className="absolute right-0 bg-white text-center shadow-lg z-10 w-auto rounded-md mt-5 py-2 px-2 mx-4 flex flex-col">
            <Link
              href="/candidate/oportunidades"
              className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer mb-2"
              id="dropdownUser1"
              onClick={handleOptionClick}
            >
              Oportunidades
            </Link>
            <Link
              href="/candidate/quizz"
              className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer mb-2"
              id="dropdownUser1"
              onClick={handleOptionClick}
            >
              Cuestionarios
            </Link>
            <Link
              href="/candidate/subscription"
              className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer mb-2"
              id="dropdownUser1"
              onClick={handleOptionClick}
            >
              Subscripcion
            </Link>
            <Link
              href="/candidate/edit"
              className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer mb-2"
              id="dropdownUser1"
              onClick={handleOptionClick}
            >
              Ver Perfil
            </Link>
            <a
              className="btn btn-outline btn-warning text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
              onClick={() => { handleOptionClick(); logout(); }}
            >
              Cerrar Sesión
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
