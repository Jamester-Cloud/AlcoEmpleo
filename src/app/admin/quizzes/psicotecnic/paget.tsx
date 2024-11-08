import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";

export function Psicotecnic(props: any) {

    const [quiz, setQuizzData]: any = useState();
    const [isLoading, setLoading] = useState(false)
    const [cargoDeseadoCandidato, setCargoDeseado] = useState("");

    const handleSubmit = (data: object) => {
        console.log(data)
    }

    const generateQuestions = async () => {
        setLoading(true); // Empieza la carga
        try {
            const response = await axios.post('/api/administrator/candidates/quizzes/psychotechnical', { idCandidato: props.idCandidato });
            if (response.status === 200) {
                setQuizzData(response.data.preguntas);
                setCargoDeseado(response.data.cargoDeseado);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    return (<>
        <button className='bg-purple-500 text-white px-4 py-2 rounded-md mb-4' onClick={() => generateQuestions()}>Generar Cuestionario</button>
        <form>
            {props.idCandidato}
        </form>
    </>)
}