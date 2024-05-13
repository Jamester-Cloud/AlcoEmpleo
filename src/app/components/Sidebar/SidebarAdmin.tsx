
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faBuilding,faCog,faCartShopping,faLock,faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function SidebarAdmin() {
    
    return (

        <div className="container-fluid ">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
           
              {/* Iniciando Lista */}
              <ul className="navbar   navbar-nav   flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

              <a href="#" className="nav-link d-flex align-items-center " id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <Image src="/AlcoSloganLogo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Perfil</span>
                </a> 
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                    <FontAwesomeIcon icon={faPeopleGroup}  width="30" height="30" />      
                    <span className="ms-1 d-none d-sm-inline ">  Candidatos</span> 
                  </a>
                  
                </li> {/* Final li */}
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                    <FontAwesomeIcon icon={faBuilding}  width="30" height="30" />      
                    <span className="ms-1 d-none d-sm-inline ">  Empresas</span> 
                  </a>
                  
                </li> {/* Final li */}
                  <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                    <FontAwesomeIcon icon={faCartShopping}  width="30" height="30" />      
                    <span className="ms-1 d-none d-sm-inline ">  Historial de Pagos</span> 
                  </a>
                  
                </li> {/* Final li */}
                  <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                    <FontAwesomeIcon icon={faLock}  width="30" height="30" />      
                    <span className="ms-1 d-none d-sm-inline ">  Estadisticas</span> 
                  </a>
                  
                </li> {/* Final li */}
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link  align-middle d-flex align-items-center"  >
                    <FontAwesomeIcon icon={faCog}  width="30" height="30" />      
                    <span className="ms-1 d-none d-sm-inline ">  Cuenta</span> 
                  </a>
                  
                </li> {/* Final li */}
               
              </ul>
        
             
            </div>
          </div>
          <div className="col py-3">
            {/* Este seria el Lateral */}
          </div>
        </div>
      </div>
    );
}