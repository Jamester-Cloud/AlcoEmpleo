export default function Footer() {
    const añoActualizado = new Date().getFullYear()
    return (
        <footer className="bg-blue-950 py-3 " >
            <div className=" text-center  ">
                <p className="m-0 text-white ">© {añoActualizado} Todos los derechos reservados A.C. GRUPO ALCO/ J-41001425-3</p>
                <p className="m-0 text-white">Desarrollado por: TripData C.A</p>
            </div>
        </footer>
    )
}