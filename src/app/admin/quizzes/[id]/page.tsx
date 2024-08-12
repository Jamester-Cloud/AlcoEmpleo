"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import NestedFields from '@/app/components/Forms/NestedArray';
import { ToastContainer, toast, Bounce } from "react-toastify";
import Spinner from '@/app/components/Spinner/Spinner';
import { useRouter } from "next/navigation"
import Modal from 'react-bootstrap/Modal'
import { set } from 'mongoose';
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
    dificultad: string,
    cargoDeseado: string
}

export default function Quizzes({ params }: any) {

    const router = useRouter()

    let { id } = params;

    

    const [quiz, setQuiz]: any = useState();
    const [isLoading, setLoading] = useState(false)
    const [idCandidato, setCandidato] = useState(id);
    //General tables
    const [quizzData, setQuizzData]: any = useState();

    const [dificultad, setDificultad] = useState("medio");
    const [cargoDeseadoCandidato, setCargoDeseado] = useState("");

    // Modal controls
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState({});
    const handleClose = () => setShow(false);

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

    const handleModal = (e: any, title: string, data: any, id: string, dataType: string) => {
        e.preventDefault();
        setModalTitle(title);
        setModalData({ ...data, id });
        setShow(true);
    };

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
        // general table
        getquizzes()
    }, [!quiz])

    const getquizzes = async () => {
        const res = await axios.post('/api/administrator/candidates/quizzes/get', { idCandidato: idCandidato })
        if (res.status == 200) setQuizzData(res.data.quiz);
    }

    const handleSubmitQuiz = async (data: any) => {
        try {
            const response = await axios.post('/api/administrator/candidates/quizzes/save/', { preguntas: data.quiz, dificultad: data.dificultad, idCandidato: data.idCandidato, tituloCuestionario: data.tituloCuestionario })
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
    
    const updateQuiz = async (idQuiz: string) => {
        console.log(idQuiz)
        const res = await axios.post('/api/administrator/candidates/quizzes/update', { idQuiz: idQuiz })
        if (res.status == 200) setQuiz(res.data.quiz.preguntas), setShow(false), setCargoDeseado(res.data.cargoDeseado), setCandidato(res.data.idCandidato)
    }

    const deleteQuiz = async (idQuiz: string) => {
        try {
            const res = await axios.post('/api/administrator/candidates/quizzes/delete', { idQuiz: idQuiz })
            //console.log(res.data);
            if (res.status == 200) console.log("Guardado"), toast.success("Cuestionario eliminado", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }), getquizzes()

        } catch (error) {
            console.log(error)
            toast.error("Cuestionario no eliminado, contacte a soporte tecnico", {
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
        }
    }

    const form = (title: string) => {
        switch (title) {
            case 'Administrar Cuestionarios':
                return (
                    <>
                        <table className="min-w-full bg-white shadow-md rounded mb-4">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Titulo</th>
                                    <th className="py-2 px-4 border-b">Candidato</th>
                                    <th className="py-2 px-4 border-b">Cargo a certiticar</th>
                                    <th className="py-2 px-4 border-b">Estado</th>
                                    <th className="py-2 px-4 border-b">Actualizar</th>
                                    <th className="py-2 px-4 border-b">Eliminar</th>
                                    {/* actualizar carga el formulario anterior */}
                                </tr>
                            </thead>
                            <tbody>
                                {quizzData?.map((item: any, key: number) => (
                                    <tr className='p-5' key={key}>
                                        <td className='p-2'>
                                            {item.cuestionario.tituloCuestionario ? item.cuestionario.tituloCuestionario : 'Sin especificar'}
                                        </td>
                                        <td className='p-2'>
                                            {item.nombreCandidato} {item.apellidoCandidato}
                                        </td>
                                        <td className='p-2'>
                                            {item.candidatoData?.perfil?.puestoDeseado ? item.candidatoData.perfil.puestoDeseado : "Sin especificar"}
                                        </td>
                                        <td>
                                            {item.cuestionario.estado ? 'Finalizado' : 'No completado'}
                                        </td>
                                        <td className='mt-2'>
                                            <button onClick={() => updateQuiz(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                Actualizar
                                            </button>
                                        </td>
                                        <td className='mt-2'>
                                            <button onClick={()=> deleteQuiz(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
                break;

            default:
                break;
        }
    }

    return (
        <div className='container-fluid p-5'>
            <div className="row">
                {isLoading ? (
                    <h1 className=' text-center'>Generando Datos por IA</h1>
                ) : (
                    <>
                        <h6 className='mt-3'>Generar Quiz: {cargoDeseadoCandidato || (<p className='text-danger'>Debe Especificar un cargo para poder generar</p>)}</h6>
                        <div className="col-md-6">
                            <label htmlFor="">Dificultad</label>
                            <select onChange={(e: any) => setDificultad(e.target.value)} className='form-control'>
                                <option value="medio">Medio</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                        <div className="col-md-6 mt-3">
                            <button className='bg-purple-500 text-white px-4 py-2 rounded-md mb-4' onClick={() => generateQuestions()}>Generar Cuestionario</button>
                            <button onClick={(e) => handleModal(e, 'Administrar Cuestionarios', {}, id, "adminQuiz")} className="text-white px-4 py-2 rounded-md mb-4 ml-5 bg-green-500">
                                Ver cuestionarios generados
                            </button>
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

                                <input type="hidden" {...register("idCandidato")} value={idCandidato} />
                                <input type="hidden" {...register("dificultad")} value={dificultad} />
                                <hr />
                                <div className="col-md-12">
                                    <label className="labels p-2">Titulo del cuestionario:</label>
                                    <input type="text" className='form-control' placeholder='Especifique el titulo con el que se diferenciara de los demas cuestionarios generados'  {...register("tituloCuestionario", { required: true })} />
                                </div>
                                {cargoDeseadoCandidato == null ? <div className="col-md-12">
                                    <label className="labels p-2">CargoDeseado:</label>
                                    <p>Al rellenar el cargo a certificar. Presione de nuevo generar cuestionario</p>
                                    <input type="text" className='form-control' placeholder='Especifique el cargo deseado con el que se generará el cuestionario'  {...register("cargoDeseado", { required: true })} />

                                    <hr />
                                </div> : ''}

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
                        <Modal
                            size="lg"

                            show={show}
                            onHide={handleClose}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    {modalTitle}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    {form(modalTitle)}
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                )}
            </div>


        </div>
    )
}
