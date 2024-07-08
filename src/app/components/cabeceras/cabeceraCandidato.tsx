"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <header className="navbar navbar-expand-lg bg-blue-900 p-3 text-sm justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FontAwesomeIcon icon={faBars} color="white" width={30} height={30} />
        </button>
      </div>
      <div className="flex items-center ml-auto space-x-4">
        <nav className="hidden md:flex md:flex-column space-x-4">
          <Link
            href="/candidate/requests"
            className="text-decoration-none text-white transition-opacity duration-300 hover:opacity-50 cursor-pointer"
          >
            Mis solicitudes
          </Link>
          <a
            className="text-decoration-none text-white transition-opacity duration-300 hover:opacity-50 cursor-pointer"
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
          <div className="absolute right-0 bg-primary text-center rounded-md shadow-lg z-10 w-full mt-10">
            <Link
              href="/candidate/requests"
              className="btn btn-outline btn-primary text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
            >
              Mis solicitudes
            </Link>
            <a
              className="text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer"
              onClick={logout}
            >
              Salir
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
