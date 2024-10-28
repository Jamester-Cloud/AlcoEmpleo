export default function Footer() {
    const añoActualizado = new Date().getFullYear()
    return (
<footer className="bg-blue-950 py-3 bottom-0 left-0 right-0">
  <div className="text-center">
    <p className="m-0 text-white">© {añoActualizado} Todos los derechos reservados A.C. GRUPO ALCO / J410014253</p>
    <p className="m-0 text-white">alcoempleo.com es un producto de Grupo Alco, desarrollado InnoData, C.A</p>
  </div>
</footer>
    )
}