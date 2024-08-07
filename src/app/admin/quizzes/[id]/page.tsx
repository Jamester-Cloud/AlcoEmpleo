"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import NestedFields from '@/app/components/Forms/NestedArray';
import { ToastContainer, toast, Bounce } from "react-toastify";
import Spinner from '@/app/components/Spinner/Spinner';
import { useRouter } from "next/navigation"
type FormValues = {
    quiz: {
        pregunta: string,
        respuestas: {
            respuesta: string
        }[],
        respuestaCorrecta: string,
    }[],
    idCandidato: string,
    dificultad: string
}

export default function Quizzes({ params }: any) {

    const router = useRouter()

    let { id } = params;

    const [quiz, setQuiz]: any = useState();
    const [isLoading, setLoading] = useState(false)

    const [dificultad, setDificultad] = useState("medio");
    const [cargoDeseadoCandidato, setCargoDeseado] = useState("");

    useEffect(() => {
        let defaultValues = {
            quiz: []
        }

        defaultValues.quiz = quiz?.map((item: any) => { return { pregunta: item.pregunta, respuestas: item.respuestas.map((item: any) => { return { respuesta: item.respuesta } }), respuestaCorrecta: item.correcta } })

        reset({ ...defaultValues })
    }, [quiz])

    const methods = useForm<FormValues>({
        defaultValues: {
            quiz: [{ pregunta: "", respuestas: [{ respuesta: "" }], respuestaCorrecta: "" }],
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
        console.log(dificultad)
        const questions = await axios.post('/api/administrator/candidates/quizzes', { idCandidato: id, dificultad: dificultad })
        if (questions.status == 200) setQuiz(questions.data.preguntas), setCargoDeseado(questions.data.cargoDeseado)
    }

    useEffect(() => {
        generateQuestions()
    }, [!quiz])

    const handleSubmitQuiz = async (data: any) => {
        console.log(data);
        try {
            const response = await axios.post('/api/administrator/candidates/quizzes/save/', { preguntas: data.quiz, dificultad: data.dificultad, idCandidato: data.idCandidato })
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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='container-fluid p-5'>
            <div className="row">
                <h6 className='mt-3'>Generar Quiz</h6>
                <div className="col-md-6">

                    <label htmlFor="">Dificultad</label>
                    <select onChange={(e: any) => setDificultad(e.target.value)} className='form-control'>
                        <option value="medio">Medio</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className="col-md-6 mt-3">
                    <button className='bg-purple-500 text-white px-4 py-2 rounded-md mb-4' onClick={() => generateQuestions()}>Generar Cuestionario</button>
                </div>
            </div>
            <form className='form' onSubmit={handleSubmit(handleSubmitQuiz)} >
                <div className="row">

                    <input type="hidden" {...register("idCandidato")} defaultValue={id} />
                    <input type="hidden" {...register("dificultad")} value={dificultad} />
                    <hr />
                    <div className="col-md-12 mt-3 ">
                        <button
                            type="button"
                            onClick={() => appendQuiz({ pregunta: "", respuestas: [{ respuesta: "" }], respuestaCorrecta: "" })}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                        >
                            Agregar pregunta
                        </button>
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
                                            <input type="text" className="form-control" {...register(`quiz.${index}.respuestaCorrecta` as const, {
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}


