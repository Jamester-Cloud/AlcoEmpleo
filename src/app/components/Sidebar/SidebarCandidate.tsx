"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMagnifyingGlass, 
  faCog, 
  faCartShopping, 
  faLock,
  faCreditCard 
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function SidebarCandidate({ children }: any) {

  return (
    <div className="container-fluid ">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Iniciando Lista */}
            <ul className="navbar   navbar-nav   flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item  ">
                <Link href="/candidate/edit" className="nav-link d-flex align-items-center " id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <Image src="/AlcoSloganLogo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Perfil</span>
                </Link>
              </li>
              <li>
                <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                  <FontAwesomeIcon icon={faMagnifyingGlass} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline ">  Empleos</span>
                </a>
              </li> {/* Final li */}
              <li>
                <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                  <FontAwesomeIcon icon={faCreditCard} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline ">  Subcripción</span>
                </a>
              </li> {/* Final li */}
              <li>
              </li> {/* Final li */}
              <li>
                <Link href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                  <FontAwesomeIcon icon={faCog} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline ">  Configuracion</span>
                </Link>
              </li> {/* Final li */}
            </ul>
          </div>
        </div>     {/* Todo Arriba realizado con Boostrap */}

        {/* */}
        <div className="col p-0">
          {children}
        </div>
      </div>
    </div>
  );
}