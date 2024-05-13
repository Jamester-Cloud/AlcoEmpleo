"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from "axios"
import Link from "next/link"
import Image from 'next/image';


export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-primary p-0  text-sm">
      <div className="container mx-auto flex justify-between items-center">

      <a href="/">
          <Image
          width={110} 
          height={80}
            className="img-fluid  rounded-2xl  p-1" 
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
         <Link href="/signup/candidate" className="block px-2 py-1 text-white hover:opacity-50 text-decoration-none">Candidatos </Link>
         <Link href="/signup/enterprise" className="block px-2 py-1 text-white  hover:opacity-50 text-decoration-none">Empresas</Link>
       <Link href="#" className="block px-4 py-2 text-white  hover:opacity-50 text-decoration-none cursor-pointer">Contacto </Link>
        </div>
        
          )}
        </div>
        <nav className="md:flex md:flex-column space-x-4 hidden">
   
            <Link href="/signup/candidate" className="text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer">
          Candidatos
          </Link>
    
   
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
