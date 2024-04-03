
export default function HeaderEnterprise() {
    return (<nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">AlcoEmpleo</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse show" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Inicio
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Buscar candidatos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Publicar vacante</a>
                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link" href="#">Subscripción</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Salir</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)
}