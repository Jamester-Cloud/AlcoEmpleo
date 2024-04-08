
import Image from "next/image"
import Link from "next/link"
export default function Header(props: any) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary position-sticky fixed-top mb-3" >
                <div className="container">
                    <a className="navbar-brand" href="#"><Image className="mb-2 rounded text-center" src="/AlcoSloganLogo.png" width={70} priority height={70} alt="GrupoAlco" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse show" id="navbarColor01">

                    </div>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Inicio
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <Link href="/signup/enterprise" className="nav-link" > Empresas</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/signup/candidate" className="nav-link" > Candidatos</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>)
}