"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
    preguntas: {
        pregunta: string
    }[],
    respuestas: {
        respuesta: string
    }[],
    correcta: string,
    idCandidato: string
}

export default function Quizzes(props: any) {

    let { idCandidato, cargoDeseado } = props;
    
    const [preguntas, setPreguntas] = useState();
    const [respuestas, setRespuestas] = useState();

    useEffect(() => {

    })

    const methods = useForm<FormValues>({
        defaultValues: {
            preguntas: [{ pregunta: "" }],
            respuestas: [{ respuesta: "" }],
            correcta: "",
            idCandidato: ""
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

    const { fields: fieldPreguntas, append: appendPregunta, remove: removePregunta } = useFieldArray({
        name: "preguntas",
        control
    });

    const { fields: fieldsRespuestas, append: appendRespuestas, remove: removeRespuestas } = useFieldArray({
        name: "respuestas",
        control
    });

    const generateQuestions = async () => {
        const questions = await axios.post('/api/administrator/candidates/quizzes', { idCandidato, cargoDeseado: cargoDeseado })
        if (questions.status == 200) console.log(questions.data)
    }

    return (
        <form className='form' >
            <div className="row">
                <input type="hidden" {...register('idCandidato')} defaultValue={localStorage?.getItem('idUsuario') as string} />
                <h6 className='mt-3'>Formacion Academica</h6>
                <div className="col-md-6">
                    {fieldPreguntas.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <section className={"row"} key={field.id}>
                                    <div className="col-md-6">
                                        <label className="labels">Idioma:</label>
                                        <input type="text" className="form-control" {...register(`preguntas.${index}.pregunta` as const, {
                                            required: true
                                        })} placeholder="Idioma" />
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className='btn mt-3' onClick={() => removePregunta(index)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </section>
                            </div>
                        );
                    })}
                </div>
                <div className="col-md-6 ">
                    <label className="labels">Respuestas:</label>
                    {fieldsRespuestas.map((field: any, index: number) => {
                        return (
                            <div key={field.id}>
                                <section className={"row"} key={field.id}>
                                    <div className="col-md-6">
                                        <label className="labels">Idioma:</label>
                                        <input type="text" className="form-control" {...register(`respuestas.${index}.respuesta` as const, {
                                            required: true
                                        })} placeholder="Idioma" />
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className='btn mt-3' onClick={() => removePregunta(index)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </section>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="row text-center mt-5">
                <button className="btn btn-primary btn-block">Guardar cambios</button>
            </div>
        </form>
    )
}