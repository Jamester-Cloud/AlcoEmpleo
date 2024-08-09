"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

import { ToastContainer, toast, Bounce } from "react-toastify";
import Spinner from '@/app/components/Spinner/Spinner';
import { FormStepper } from "@/app/components/Forms/FormStepper";
import { useRouter } from "next/navigation"

// type FormValues = {
//     quiz: {
//         pregunta: string,
//         respuestas: {
//             respuesta: string
//         }[],
//         respuestaCorrecta: string,
//     }[],
//     tituloCuestionario: string
//     idCandidato: string,
//     dificultad: string
// }

export default function Quizzes({ params }: any) {

    const router = useRouter()

    let { id } = params;

    const [quiz, setQuiz]: any = useState();
    const [idCandidato, setCandidato] = useState();
    const [formPages, setFormPages] = useState();

    const fetchQuizData = async () => {
        // setLoading(true); // Empieza la carga
        try {
            const response = await axios.post('/api/candidate/quizzes/get', { idQuizz: id });
            if (response.status === 200) {
                //console.log(response.data)
                setQuiz(response.data.quiz);
                setCandidato(response.data.quiz.idCandidato)
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            // setLoading(false); // Termina la carga
        }
    };

    useEffect(() => {
        fetchQuizData()
        console.log(quiz)
    }, [!quiz])

    const handleSubmitQuiz = async (data: any) => {
        console.log(data);
        try {
            const response = await axios.post('/api/candidate/quizzes/save', { preguntas: data.quiz, dificultad: data.dificultad, idCandidato: data.idCandidato, tituloCuestionario: data.tituloCuestionario })
            toast.success("Cuestionario generado", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                if (response.status == 200) router.push("/admin")
            }, 3000);
        } catch (error) {
            toast.error("Cuestionario no generado, contacte a soporte tecnico", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log("Error")
        }
    }

    return (
        <div className='container-fluid p-5'>
            <div className="row">
                <FormStepper data={quiz} />
            </div>
        </div>
    )
}
