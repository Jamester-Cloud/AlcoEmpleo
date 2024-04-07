export default function SidebarCandidate() {
    
    return (

        <div className="container-fluid ">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
           
              {/* Iniciando Lista */}
              <ul className="navbar   navbar-nav   flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item  ">
                <div className=" ">
                <a href="#" className="nav-link d-flex align-items-center " id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/AlcoSloganLogo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Perfil</span>
                </a> 

              </div> {/* Final li */}
                </li>
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-search"></i> <span className="ms-1 d-none d-sm-inline">Empleos</span> </a>
                  
                </li> {/* Final li */}
                <li>
                  <a href="#" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-cart"></i> <span className="ms-1 d-none d-sm-inline">Subcripción</span></a>
                </li> {/* Final li */}
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                    <i className="fs-4 bi-shield"></i> <span className="ms-1 d-none d-sm-inline">Privacidad</span></a>
              
                </li>{/* Final li */}
                <li>
                  <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Cuenta</span> </a>
                   
                </li> {/* Final li */}
               
              </ul>
              <hr />
             
            </div>
          </div>
          <div className="col py-3">
            En este div Deberia ser el lateral para el contenido
            {/* Este seria el Lateral */}
          </div>
        </div>
      </div>
    );
}