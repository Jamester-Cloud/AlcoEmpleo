import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import NestedFields from '@/app/components/Forms/NestedArray';
import { ToastContainer, toast, Bounce } from "react-toastify";

type FormInputValues = {
    tituloCuestionario: String,
    quiz: {
        pregunta: String,
        respuestas: {
            respuesta: string
        }[],
        respuestaCorrecta: String,
        tipoPregunta: String
    }[],
    quizPsicoTecnico: {
        pregunta: String,
        tipoPregunta: String
    }[],

}

export function Psicotecnic(props: any) {

    const [quiz, setQuizzData]: any = useState();
    const [isLoading, setLoading] = useState(false)

    const methods = useForm<FormInputValues>({
        defaultValues: {
            tituloCuestionario: "",
            quiz: [{ pregunta: "", respuestas: [{ respuesta: "" }], respuestaCorrecta: "", tipoPregunta: "" }],
            quizPsicoTecnico: [{ pregunta: "", tipoPregunta: "" }]
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

    const { fields: fieldQuizNormal, append: appendQuiz, remove: removeQuiz } = useFieldArray({
        name: "quiz",
        control
    });

    const { fields: fieldPsicoTecnico, append: appendPsicoTecnico, remove: removePsicoTecnico } = useFieldArray({
        name: "quizPsicoTecnico",
        control
    });

    const handleForm = async (data: any) => {
        //merge the data
        let preguntas = data.quiz.concat(data.quizPsicoTecnico)
        
        try {
            const res = await axios.post('/api/administrator/candidates/quizzes/save/psychotechnical/', {preguntas:preguntas, dificultad:props.dificultad, idCandidato:props.idCandidato, tituloCuestionario: data.tituloCuestionario })
            if(res.status == 200) toast.success(res.data.message)
        } catch (error) {
            toast.error('Error en el envio de datos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            console.log(error)
        }
    }

    const generateQuestions = async () => {
        try {
            handleLoading(true)
            const response = await axios.post('/api/administrator/candidates/quizzes/psychotechnical', { idCandidato: props.idCandidato });
            if (response.status === 200) {
                setQuizzData(response.data.preguntas);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            handleLoading(false);
        }
    };

    const handleLoading = (prop: boolean) => {
        setLoading(prop);
        if (isLoading == prop) {
            toast.success('Cuestionario generado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } else {
            toast.info('Cargando...', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    // useEffect(() => {
    //     generateQuestions()
    // }, [!quiz])

    useEffect(() => {
        let defaultValues = {
            quiz: [],
            quizPsicoTecnico: []
        }
        let quizNormal = quiz?.filter((item: any) => item.tipoPregunta == 'seleccionMultiple')
        let quizPsicoTecnico = quiz?.filter((item: any) => item.tipoPregunta == 'Psicotecnica')

        console.log("Quiz normales filtrados son:", quizNormal)

        defaultValues.quizPsicoTecnico = quizPsicoTecnico?.map((item: any) => { return { pregunta: item.pregunta, tipoPregunta: item.tipoPregunta } })

        defaultValues.quiz = quizNormal?.map((item: any) => {
            return {
                pregunta: item.pregunta,
                respuestas: item.respuestas.map((item: any) => { return { respuesta: item.respuesta } }),
                respuestaCorrecta: item.respuestaCorrecta, tipoPregunta: item.tipoPregunta
            }
        })

        defaultValues.quizPsicoTecnico = quizPsicoTecnico?.map((item: any) => {
            return { pregunta: item.pregunta, tipoPregunta: item.tipoPregunta }
        })


        reset({ ...defaultValues })
    }, [quiz])

    return (<>
        <div className="row justify-content-right">
            <div className="col-md-12">
                <button className='bg-purple-500 text-white px-4 py-2 rounded-md mb-4' onClick={() => generateQuestions()}>Generar Cuestionario</button>
            </div>
        </div>
        <form className='form' onSubmit={handleSubmit(handleForm)}>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <label className="labels ">Titulo del cuestionario:</label>
                    <input type="text" className='form-control' placeholder='Especifique el titulo con el que se diferenciara de los demas cuestionarios generados'  {...register("tituloCuestionario", { required: true })} />
                </div>

            </div>
            <hr />
            {/* Seleccion multiple */}
            {fieldQuizNormal.map((field: any, index: number) => {
                return (
                    <div key={field.id}>
                        <section className={"row mt-2"} key={field.id}>
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
                                className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                nestIndex={index}
                                {...{ control, register, errors }}
                            />
                        </section>
                    </div>
                );
            })}
            {/* Desarrollo */}
            <>
                <h6>Preguntas de desarrollo:</h6>
                <div className="col-md-3">
                    <button type="button" className='btn mt-3 btn btn-success ' onClick={() => appendPsicoTecnico({ pregunta: "", tipoPregunta: "" })}>
                        Agregar Pregunta
                    </button>
                </div>
            </>
            {fieldPsicoTecnico.map((field: any, index: number) => {
                return (
                    <div key={field.id}>
                        <section className={"row"} key={field.id}>
                            <div className="col-md-12">
                                <label className="labels">Pregunta:</label>
                                <textarea className="form-control  w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...register(`quizPsicoTecnico.${index}.pregunta` as const, {
                                    required: true
                                })} placeholder="Pregunta" />
                                <button type="button" className='btn mb-3 mt-2 btn btn-danger ' onClick={() => removePsicoTecnico(index)}>
                                    Eliminar Pregunta
                                </button>
                            </div>
                        </section>
                    </div>
                );
            })}
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <button type='submit' className="btn btn-primary btn-block mt-4">Guardar cambios</button>
                </div>
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
    </>)
}