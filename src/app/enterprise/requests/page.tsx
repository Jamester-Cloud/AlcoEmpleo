"use client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from 'next/image';
import { useRouter } from "next/navigation"
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

    const methods = useForm<FormValues>({
        defaultValues: {
            idCandidato: "",
            isPremium: false
        },
    });

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
            console.log(res)
            setRequests(res.data.cuestionarios);
        }
    };

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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests?.map((item: any, key: number) => (
                                <tr key={key}>
                                    <td>
                                        <Image className="rounded-full m-2" src={"/AlcoLogo.png"} alt={""} width={80} height={80} />
                                        {item.tituloCuestionario}
                                    </td>
                                    <td className="py-2 px-4 border-b text-capitalize">
                                        {item.dificultad}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.calificacion} Estrellas
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.finalizada ? 'Completado' : 'Sin Completar'}
                                    </td>
                                    <td className="py-2 px-4 border-b" style={{ textDecoration: "none" }}>

                                    </td>
                                    <td className="py-2 px-4 border-b" style={{ textDecoration: "none" }}>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


                {/* Paginación (comentada por ahora) */}
                {/* <Pagination>
            // Paginación aquí
        </Pagination> */}
            </div>
        </div>

    );
}
