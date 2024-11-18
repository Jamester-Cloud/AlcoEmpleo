import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type FormInputValues = {
    tituloCuestionario: String,
    quizNormal: {
        pregunta: string,
        respuestas: {
            respuesta: string
        }[],
        respuestaCorrecta: string,
    }[],
    quizPsicoTecnico: {
        pregunta: string,
    }[],
    tipoPregunta:String
}

export function Psicotecnic(props: any) {

    const [quiz, setQuizzData]: any = useState();
    const [isLoading, setLoading] = useState(false)

    const methods = useForm<FormInputValues>({
        defaultValues: {
            tituloCuestionario: "",
            quizNormal: [{ pregunta: "", respuestas: [{ respuesta: "" }], respuestaCorrecta: "" }],
            quizPsicoTecnico:[{pregunta:""}]
        }
    });

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = methods;

    const { fields: fieldQuiz, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        name: "quizNormal",
        control
    });

    const { fields: fieldPsicoTecnico, append: appendPsicoTecnico, remove: removePsicoTecnico } = useFieldArray({
        name: "quizPsicoTecnico",
        control
    });

    const handleForm = (data: object) => {
        console.log(data)
    }

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/administrator/candidates/quizzes/psychotechnical', { idCandidato: props.idCandidato });
            if (response.status === 200) {
                setQuizzData(response.data.preguntas);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    useEffect(() => {
        generateQuestions()
    }, [!quiz])

    useEffect(() => {
        let defaultValues = {
            quizNormal: [],
            quizPsicoTecnico:[]
        }
        console.log("los quiz son: ", quiz)
        let quizNormal = quiz?.filter((item:any)=> item.tipoPregunta == 'seleccionMultiple')
        let quizPsicoTecnico = quiz?.filter((item:any)=> item.tipoPregunta == 'Psicotecnica')
        console.log(quizNormal)
        console.log(quizPsicoTecnico)

        // reset({ ...defaultValues })
    }, [quiz])

    return (<>
        <button className='bg-purple-500 text-white px-4 py-2 rounded-md mb-4' onClick={() => generateQuestions()}>Generar Cuestionario</button>
        <form className='form'>
            <div className="col-md-12">
                <label className="labels p-2">Titulo del cuestionario:</label>
                <input type="text" className='form-control' placeholder='Especifique el titulo con el que se diferenciara de los demas cuestionarios generados'  {...register("tituloCuestionario", { required: true })} />
            </div>
        </form>
    </>)
}