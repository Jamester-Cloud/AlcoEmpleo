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
    tituloCuestionario: string
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
            tituloCuestionario: ""
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
        setLoading(true); // Empieza la carga
        try {
            console.log(dificultad);
            const response = await axios.post('/api/administrator/candidates/quizzes', { idCandidato: id, dificultad: dificultad });
            if (response.status === 200) {
                setQuiz(response.data.preguntas);
                setCargoDeseado(response.data.cargoDeseado);
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

    const handleSubmitQuiz = async (data: any) => {
        console.log(data);
        try {
            const response = await axios.post('/api/administrator/candidates/quizzes/save/', { preguntas: data.quiz, dificultad: data.dificultad, idCandidato: data.idCandidato, tituloCuestionario:data.tituloCuestionario })
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

                {isLoading ? (
                    <h1 className=' text-center'>Generando Datos por IA</h1>

                ) : (
                    <>
                        <h6 className='mt-3'>Generar Quiz: {cargoDeseadoCandidato}</h6>
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
                    </>
                )}
            </div>

            <div>
                {isLoading ? (
                    <h2 className=' text-center hidden' >Cargando Preguntas</h2>
                ) : (
                    <>
                        <form className='form' onSubmit={handleSubmit(handleSubmitQuiz)} >
                            <div className="row">

                                <input type="hidden" {...register("idCandidato")} defaultValue={id} />
                                <input type="hidden" {...register("dificultad")} value={dificultad} />
                                <hr />
                                <div className="col-md-12">
                                    <label className="labels p-2">Titulo del cuestionario:</label>
                                    <input type="text" className='form-control' placeholder='Especifique el titulo con el que se diferenciara de los demas cuestionarios generados'  {...register("tituloCuestionario", { required: true })} />
                                    <hr />
                                </div>
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
                                                        <textarea className="form-control  w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...register(`quiz.${index}.pregunta` as const, {
                                                            required: true
                                                        })} placeholder="Pregunta" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="labels">Respuesta Correcta:</label>
                                                        <textarea className="form-control  w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...register(`quiz.${index}.respuestaCorrecta` as const, {
                                                            required: true
                                                        })} placeholder="Respuesta correcta" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button type="button" className='btn mt-3 btn btn-danger ' onClick={() => removeQuiz(index)}>
                                                            Eliminar Pregunta
                                                        </button>

                                                    </div>
                                                </section>
                                                <section>
                                                    <br />
                                                    <h6>Respuestas a la pregunta</h6>
                                                    <NestedFields
                                                        className=' w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                    </>
                )}
            </div>


        </div>
    )
}
