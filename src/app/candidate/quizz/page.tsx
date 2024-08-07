"use client"
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";


type FormValues = {
    idCandidato: String
};

export default function Quizzes() {

    const [quizz, setQuizzes]: any = useState();

    // const [pageCandidate, setPageCandidate] = useState(1);
    // const [pageCandidateCount, setCandidatePageCount]: any = useState(1);

    const methods = useForm<FormValues>({
        defaultValues: {
            idCandidato: "",
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
        const res = await axios.post('/api/candidate/quizzes', { idUsuario: localStorage?.getItem('idUsuario') })
        if (res.status == 200) setQuizzes(res.data.cuestionarios), console.log(res.data.cuestionarios)
    }

    useEffect(() => {
        fetchData()
    }, [!quizz])


    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4"> Cuestionarios</h2>
                {/* <form>
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    {...register("I")}
                                    maxLength={15}
                                    className="form-control"
                                    placeholder="Cedula EJ: V123456789"
                                />
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-primary" type="submit">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </>
                </form> */}
                <table className="min-w-full bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b"></th>
                            <th className="py-2 px-4 border-b">Dificultad</th>
                            <th className="py-2 px-4 border-b">Calificacíon</th>
                            <th className="py-2 px-4 border-b">Finalizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizz.map((item: any, key: number) => {
                            console.log(item);
                            return (
                                <tr key={key}>
                                    <td>
                                        <Image className="rounded-full m-2" src={"/Imagen-card.png"} alt={""} width={80} height={80} />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.dificultad} 
                                    </td>
                                    <td className="py-2 px-4 border-b">

                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.finalizada}
                                    </td>
                                </tr>)
                        })}
                        {/* {quizz?.map((item: any, key: number) => (
                            <tr key={key}>
                                <td>
                                    <Image className="rounded-full m-2" src={"/Imagen-card.png"} alt={""} width={80} height={80} />
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {item.tituloCuestionario} }  <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 ml-1" />
                                </td>
                                <td className="py-2 px-4 border-b">
                                    
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                        Completar
                                    </button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                                        Suspender Usuario
                                    </button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {item.finalizada}
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
                {/* paginacion que viene desde el backend */}
                <Pagination>
                    {/* <Pagination.Prev
                        onClick={() => prevPageCandidate(pageCandidate - 1)}
                        disabled={pageCandidate == 1}
                    />
                    {Array(parseInt(pageCandidateCount))
                        .fill(null)
                        .map((_, key) => {
                            return (
                                <Pagination.Item
                                    key={key}
                                    onClick={() => goToPageCandidate(key + 1)}
                                >
                                    {key + 1}
                                </Pagination.Item>
                            );
                        })}
                    <Pagination.Next
                        onClick={() => nextPageCandidate(pageCandidate + 1)}
                        disabled={pageCandidate == pageCandidateCount}
                    /> */}
                </Pagination>
            </div>
        </div>
    )
}