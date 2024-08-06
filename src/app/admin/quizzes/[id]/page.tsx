"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import NestedFields from '@/app/components/Forms/NestedArray';

type FormValues = {
    quiz: {
        pregunta: string,
        respuestas: {
            respuesta: string
        }[],
        correcta: string,
    }[],
    idCandidato: string,
    dificultad: string
}

export default function Quizzes({ params }: any) {

    let { id } = params;

    const [quiz, setQuiz]: any = useState();

    const [dificultad, setDificultad] = useState();

    useEffect(() => {
        let defaultValues = {
            quiz: []
        }
        // console.log(quiz)
        defaultValues.quiz = quiz?.map((item: any) => { return { pregunta: item.pregunta, respuestas: item.respuestas.map((item: any) => { return { respuesta: item.respuesta } }), correcta: item.correcta } })

        reset({ ...defaultValues })
        console.log(quiz)
    }, [quiz])

    const methods = useForm<FormValues>({
        defaultValues: {
            quiz: [{ pregunta: "", respuestas: [{ respuesta: "" }], correcta: "" }],
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
        name: "quiz",
        control
    });

    const generateQuestions = async () => {
        const questions = await axios.post('/api/administrator/candidates/quizzes', { idCandidato: id, dificultad: "medio" })
        if (questions.status == 200) setQuiz(questions.data.preguntas)
    }

    useEffect(() => {
        generateQuestions()
    }, [!quiz])

    const handleSubmitQuiz = (data:any) => {
        console.log(data);
    }

    return (
        <div className='container-fluid'>
            <form className='form' onSubmit={handleSubmit(handleSubmitQuiz)} >
                <div className="row">
                    <h6 className='mt-3'>Generar Quiz</h6>
                    <input type="hidden" defaultValue={id} />
                    <div className="col-md-12">
                        <button
                            type="button"
                            onClick={() => appendQuiz({ pregunta: "", respuestas: [{ respuesta: "" }], correcta: "" })}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                        >
                            Agregar pregunta
                        </button>
                    </div>
                    <div className="col-md-6 ">
                        {fieldQuiz.map((field: any, index: number) => {
                            return (
                                <div key={field.id}>
                                    <section className={"row"} key={field.id}>
                                        <h6>Preguntas</h6>
                                        <div className="col-md-6">
                                            <label className="labels">Pregunta:</label>
                                            <input type="text" className="form-control" {...register(`quiz.${index}.pregunta` as const, {
                                                required: true
                                            })} placeholder="Pregunta" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="labels">Respuesta Correcta:</label>
                                            <input type="text" className="form-control" {...register(`quiz.${index}.correcta` as const, {
                                                required: true
                                            })} placeholder="Respuesta correcta" />
                                        </div>
                                        <div className="col-md-3">
                                            <button type="button" className='btn mt-3' onClick={() => removeQuiz(index)}>
                                                Eliminar Pregunta
                                            </button>
                                        </div>
                                    </section>
                                    <section>
                                        <h6>Respuestas a la pregunta</h6>
                                        <NestedFields
                                            nestIndex={index}
                                            {...{ control, register, errors }}
                                        />
                                    </section>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="row text-center mt-5">
                    <button type='submit' className="btn btn-primary btn-block">Guardar cambios</button>
                </div>
            </form>

        </div>
    )
}


