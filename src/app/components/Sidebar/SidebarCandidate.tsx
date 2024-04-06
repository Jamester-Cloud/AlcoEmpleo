import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faUser,faCog,faCartShopping,faLock } from "@fortawesome/free-solid-svg-icons";

export default function SidebarCandidate() {
    return (

        <div className=" d-flex flex-column " >
            <div className="bg-primary vh-100  d-md-block col-md-4 col-lg-2 d-flex flex-column align-items-start ">
          
                <ul className="navbar-nav flex-column ">
                
                    <li className="nav-item aling-items-center">
                    <button className="btn btn-lg btn-primary"style={{width:"100%"}} >
                        <a className="nav-link active  flex-row d-flex align-items-center" aria-current="page" href="#"><FontAwesomeIcon icon={faUser} className="me-2 " style={{width:"40px"}} type="button"></FontAwesomeIcon>        Perfil</a> 
                
                    </button>

                    </li>
                    <li className="nav-item">
                        <button className="btn btn-lg btn-primary"style={{width:"100%"}} >
                            <a className="nav-link   d-flex align-items-center"  href="#"><FontAwesomeIcon icon={faMagnifyingGlass} className="me-2 " style={{width:"40px"}}></FontAwesomeIcon>Empleos</a>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-lg btn-primary"style={{width:"100%"}} >
                            <a className="nav-link  d-flex align-items-center" href="#"><FontAwesomeIcon icon={faCartShopping} className="me-2 " style={{width:"40px"}}></FontAwesomeIcon>Subcripción</a>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-lg btn-primary"style={{width:"100%"}} >
                        <a className="nav-link d-flex align-items-center"  href="#"><FontAwesomeIcon icon={faLock} className="me-2 " style={{width:"40px"}}></FontAwesomeIcon>Privacidad</a>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-lg btn-primary"style={{width:"100%"}} >
                        <a className="nav-link  d-flex align-items-center" href="#" ><FontAwesomeIcon icon={faCog} className="me-2 " style={{width:"40px"}}></FontAwesomeIcon>Cuenta</a>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}