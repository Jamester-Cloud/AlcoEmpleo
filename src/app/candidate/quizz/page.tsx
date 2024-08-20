"use client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

type FormValues = {
    idCandidato: String;
    isPremium: Boolean;
};

export default function Quizzes() {

    const [quizz, setQuizzes]: any = useState();
    const [isPremium, setIsPremium] = useState<boolean | null>(null); // Estado para isPremium

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

    const retryQuizz = async(idquizz:string) => {

    }

    const fetchData = async () => {
        //Tomo isPremium en el localStorage, si es Verdadero Continua, si es Falso, no muestra el Cuestionario
        const isPremiumFromStorage = localStorage.getItem('isPremium') === 'true';
        setIsPremium(isPremiumFromStorage);
        if (isPremiumFromStorage) {
            const res = await axios.post('/api/candidate/quizzes', { idUsuario: localStorage?.getItem('idUsuario') });
            if (res.status === 200) {
                console.log(res)
                setQuizzes(res.data.cuestionarios);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Cuestionarios</h2>

                {isPremium === false ? (
                    <p className="text-red-500 text-lg">
                        Para realizar el cuestionario, debe suscribirse a la página.
                    </p>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded mb-4">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b"></th>
                                <th className="py-2 px-4 border-b">Dificultad</th>
                                <th className="py-2 px-4 border-b">Calificación</th>
                                <th className="py-2 px-4 border-b">Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizz?.map((item: any, key: number) => (
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
                                        {item.finalizada ? (
                                            <>
                                                Completado
                                                <button style={{ textDecoration: 'none' }} className="bg-blue-500 ml-5 text-white px-4 py-2 rounded-md">
                                                    Reintentar
                                                </button>
                                            </>
                                        ) : (
                                            <Link style={{ textDecoration: 'none' }} href={`/candidate/quizz/${item._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                Completar
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Paginación (comentada por ahora) */}
                {/* <Pagination>
                    // Paginación aquí
                </Pagination> */}
            </div>
        </div>
    );
}
