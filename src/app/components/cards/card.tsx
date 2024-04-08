"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocation,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons";

// todo conditionate to session status and user status
export default function card(props: any) {
    return (
        <div className="card border-light text-center mb-3 p-5" style={{ borderRadius: "15px" }}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
            <span className="badge bg-success rounded-pill"><FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon> Destacado</span>
            <div className="card-header text-center">

                <div className="mt-3 mb-4 text-center">
                    <img src="/AlcoSloganLogo.png"
                        className="w-100" style={{ width: "100px" }} />
                </div>
            </div>
            <div className="card-body text-center">

                <h4 className="mb-2">Ivan Rodriguez</h4>
                <p className="text-muted mb-4">Ingeniero de Software</p>
                <div className="text-muted mb-4">
                    <FontAwesomeIcon icon={faLocation} /> Acarigua
                </div>
                <div className="mb-4 pb-2 p-2">
                    <button type="button" className="btn btn-success btn-sm rounded">
                        <i className="mdi mdi-whatsapp"></i> Conectar
                    </button>
                </div>
                <button type="button" className="btn btn-primary btn-large">
                    Ver Perfil
                </button>
            </div>
        </div>

    )

}