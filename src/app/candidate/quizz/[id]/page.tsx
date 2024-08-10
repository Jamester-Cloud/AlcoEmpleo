"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { FormStepper } from "@/app/components/Forms/FormStepper";
import { useRouter } from "next/navigation"

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
                console.log(response.data)
                setQuiz(response.data.quiz);
                setCandidato(response.data.idCandidato)
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            // setLoading(false); // Termina la carga
        }
    };

    useEffect(() => {
        fetchQuizData()
    }, [!quiz])

    return (
        <div className='container-fluid p-5'>
            <div className="row">
                <FormStepper data={quiz} idCandidato={idCandidato} idQuiz={id} />
            </div>
        </div>
    )
}
