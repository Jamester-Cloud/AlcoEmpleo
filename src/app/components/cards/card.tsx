"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocation,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"

// todo conditionate to session status and user status
export default function card(props: any) {
    let { data } = props
    console.log(data)
    return (
        <></>
        // <div className="text-center">
        //     <div className="card text-center p-5" style={{ width: "25rem" }}>
        //         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
        //         <span className="badge bg-success rounded-pill"><FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Perfil certificado</span>
        //         <div className="card-header text-center">

        //             <div className="mt-3 mb-4 text-center">
        //                 <img src="/AlcoSloganLogo.png"
        //                     className="w-100" style={{ width: "100px" }} />
        //             </div>
        //         </div>
        //         <div className="card-body">

        //             <h4 className="mb-2">{data?.personaData?.nombre} {data?.personaData?.apellido}</h4>
        //             <p className="text-muted mb-4">{data?.perfil?.puestoDeseado}</p>
        //             <div className="text-muted mb-4">
        //                 <FontAwesomeIcon icon={faLocation} /> Venezuela
        //             </div>
        //             <div className="mb-4 pb-2 p-2">
        //                 <button type="button" className="btn btn-success btn-sm rounded">
        //                     <i className="mdi mdi-whatsapp"></i> Enviar mensaje
        //                 </button>
        //             </div>
        //             <Link href={`/enterprise/candidateProfile/${data._id}`} className="btn btn-primary btn-large">
        //                 Ver Perfil
        //             </Link>
        //         </div>
        //     </div>
        // </div>
    )

}