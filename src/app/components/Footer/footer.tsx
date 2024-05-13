export default function Footer() {
    const añoActualizado = new Date().getFullYear()
    return (
        <footer className="footer bg-primary py-3 " data-bs-theme="dark">
            <div className="container-fluid text-center  ">
                <p className="m-0 text-white ">© {añoActualizado} Todos los derechos reservados A.C. GRUPO ALCO</p>
                <p className="m-0 text-white">Desarrollado por: Ivan Rodriguez</p>
            </div>
        </footer>
    )
}