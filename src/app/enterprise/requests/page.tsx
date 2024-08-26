"use client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from 'next/image';
import { useRouter } from "next/navigation"
import { Modal } from "react-bootstrap";
import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import Pagination from "react-bootstrap/Pagination";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";


type FormValues = {
    idCandidato: String;
    isPremium: Boolean;
};

export default function Request() {

    const router = useRouter()

    const [requests, setRequests]: any = useState();
    const [modalTitle, setModalTitle] = useState("");
    const [candidatosPostulados, setCandidatos]: any = useState();


    const methods = useForm<FormValues>({
        defaultValues: {
            idCandidato: "",
            isPremium: false
        },
    });

    const handleModal = (title: string) => {
        setModalTitle(title);
        setShow(true);
    };


    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const handleClose = () => setShow(false);

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = methods;

    const fetchData = async () => {
        //Tomo isPremium en el localStorage, si es Verdadero Continua, si es Falso, no muestra el Cuestionario
        const res = await axios.post('/api/enterprise/requests/get', { idUsuario: localStorage?.getItem('idUsuario') });
        if (res.status === 200) {
            console.log(res.data)
            setRequests(res.data.postulaciones);
        }
    };

    const handleCandidatos = (data: any) => {
        console.log(data);
        setCandidatos(data);
        handleModal('Candidatos postulados')
    }

    const form = (title: string) => {
        switch (title) {
            case 'Candidatos postulados':
                return (
                    <>
                        <table className="min-w-full bg-white shadow-md rounded mb-4">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Candidato</th>
                                    <th className="py-2 px-4 border-b">Cargo</th>
                                    <th className="py-2 px-4 border-b"></th>
                                    {/* actualizar carga el formulario anterior */}
                                </tr>
                            </thead>
                            <tbody>
                                {candidatosPostulados?.map((item: any, key: number) => (
                                    <tr className='p-5' key={key}>
                                        <td className='p-2'>
                                            {item.nombre[0]} {item.apellido[0]}
                                        </td>
                                        <td className='p-2'>
                                            {item.cargoDeseado}
                                        </td>
                                        <td className='mt-2'>
                                            <button type="button" className="btn btn-primary btn-sm rounded">
                                                <Link
                                                    href={`/enterprise/candidateProfile/${item.idCandidato}`}
                                                    className="mdi text-white text-decoration-none"
                                                >
                                                    Ver Perfil
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
                break;

            default:
                break;
        }
    }


    useEffect(() => {
        fetchData();
        console.log(requests)
    }, [!requests]);

    return (
        <div className="container mx-auto p-4 ">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Solicitudes</h2>


                <div className="overflow-x-auto ">
                    <table className="min-w-full bg-white shadow-md rounded mb-4">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Titulo Oferta</th>
                                <th className="py-2 px-4 border-b">Descripcion Oferta</th>
                                <th className="py-2 px-4 border-b">Requisitos</th>
                                <th className="py-2 px-4 border-b">Beneficios</th>
                                <th className="py-2 px-4 border-b">Candidatos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests?.map((item: any, key: number) => (
                                <tr key={key}>
                                    <td>
                                        {item.oferta[0].tituloOferta}
                                    </td>
                                    <td className="py-2 px-4 border-b text-capitalize">
                                        {item.oferta[0].descripcionOfertaTrabajo}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.oferta[0].requisitos.map((item: any, key: number) => {
                                            return (
                                                <div key={key}>{item} <br /> </div>
                                            )
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.oferta[0].beneficios.map((item: any, key: number) => {
                                            return (
                                                <div key={key}>{item}<br /> </div>
                                            )
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b" style={{ textDecoration: "none" }}>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleCandidatos(item.candidatos)}>Ver Candidatos postulados</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <Modal
                    size="lg"

                    show={show}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {modalTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            {form(modalTitle)}
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Paginación (comentada por ahora) */}
                {/* <Pagination>
            // Paginación aquí
        </Pagination> */}
            </div>
        </div>

    );
}
