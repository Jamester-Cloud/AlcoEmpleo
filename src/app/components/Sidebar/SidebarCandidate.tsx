"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMagnifyingGlass, 
  faCog, 
  faCartShopping, 
  faLock,
  faCreditCard 
} from "@fortawesome/free-solid-svg-icons";

export default function SidebarCandidate({ children }: any) {

  return (

    <div className="container-fluid ">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

            {/* Iniciando Lista */}
            <ul className="navbar   navbar-nav   flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item  ">

                <a href="#" className="nav-link d-flex align-items-center " id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/AlcoSloganLogo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Perfil</span>
                </a>


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
                <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                  <FontAwesomeIcon icon={faLock} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline ">  Privacidad</span>
                </a>

              </li> {/* Final li */}
              <li>
                <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                  <FontAwesomeIcon icon={faCog} width="30" height="30" />
                  <span className="ms-1 d-none d-sm-inline ">  Cuenta</span>
                </a>

              </li> {/* Final li */}

            </ul>


          </div>
        </div>     {/* Todo Arriba realizado con Boostrap */}

        {/* */}
        <div className="col py-3">
          {children}
        </div>
      </div>
    </div>
  );
}