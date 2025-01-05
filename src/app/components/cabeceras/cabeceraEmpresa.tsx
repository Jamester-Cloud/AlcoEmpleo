import React, { useState, useEffect } from 'react';
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
            await axios.get('/api/users/logout')
            localStorage.clear();

            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
        }
    }
    const [userData, setData]:any = useState();

    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      console.log(res.data)
      setData(res.data);
    }
  
    useEffect(() => {
      getUserDetails()
    }, [!userData])
    return (
        <header className="w-full bg-blue-950 navbar navbar-expand-lg p-0">
            <div className="container flex justify-between items-center">
                <Link href="/enterprise">
                    <Image
                        width={110}
                        height={80}
                        className="img-fluid rounded-2xl pt-1 pl-1 pb-1"
                        src={userData?.documentos?.idArchivo ? `/api/enterprise/enterpriseLogo?idArchivo=${userData?.documentos?.idArchivo}` : '/AlcoLogo.png'}
                        alt="GrupoAlco"
                    />
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <FontAwesomeIcon icon={faBars} width={30} height={30} />
                    </button>
                </div>
                <nav className="md:flex md:flex-column space-x-4 hidden">
                    <Link target="blank" href="/enterprise/requests" className="text-white mt-2 text-decoration-none transition-opacity duration-300 hover:opacity-50">
                        Solicitudes
                    </Link>
                    <Link target="blank" href="/enterprise/" className="text-white mt-2 text-decoration-none transition-opacity duration-300 hover:opacity-50">
                        Buscar Candidato
                    </Link>
                    <Link target="blank" href="/enterprise/jobOffer" className="text-white mt-2 text-decoration-none transition-opacity duration-300 hover:opacity-50">
                        Publicar Oferta
                    </Link>
                    <Link target="blank" href="/enterprise/subscription" className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 p-2">
                        Ver Subscripcion
                    </Link>
                    <a className="text-white text-decoration-none mt-2 transition-opacity duration-300 hover:opacity-50 cursor-pointer" onClick={logout}>
                        Salir
                    </a>
                    <Link target="blank" className="text-white text-decoration-none mt-2 transition-opacity duration-300 hover:opacity-50 cursor-pointer" href="/enterprise/profile">
                        Perfil
                    </Link>
                </nav>
            </div>
            {showMenu && (
                <div className="w-full bg-primary text-center z-30">
                    <Link target="blank" href="/enterprise/requests" className="text-white mt-2 text-decoration-none transition-opacity duration-300 hover:opacity-50">
                        Solicitudes
                    </Link>
                    <Link target="blank" href="/enterprise/" className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 p-2">
                        Buscar Candidato
                    </Link>
                    <Link target="blank" href="/enterprise/jobOffer" className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 p-2">
                        Publicar Oferta
                    </Link>
                    <Link target="blank" href="/enterprise/subscription" className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 p-2">
                        Ver Subscripcion
                    </Link>
                    <Link target="blank" className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 p-2" href="#">
                        Perfil
                    </Link>
                    <a className="block text-white text-decoration-none transition-opacity duration-300 hover:opacity-50 cursor-pointer p-2" onClick={logout}>
                        Salir
                    </a>
                </div>
            )}
        </header>
    );
}