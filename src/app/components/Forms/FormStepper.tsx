import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation"
type FormValues = {
    respuestasCandidato: string,
    page: number
    pregunta: string
};

export const FormStepper = (props: any) => {
    let { data, idCandidato, idQuiz } = props;
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [respuestasCandidatos, setRespuestasCandidato]: any = useState([]);
    const [puntuacion, setPuntacion] = useState(data?.length || 5);
    const nextStep = () => {
        setStep(step + 1); // Move to the next step
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            respuestasCandidato: ""
        },
    });
    console.log(puntuacion)
    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = methods;

    const sendData = async () => {
        try {
            const response = await axios.post('/api/candidate/quizzes/save', { respuestasCandidatos: respuestasCandidatos, idCandidato: idCandidato, calificacion:puntuacion, idQuiz:idQuiz })
            toast.success("Cuestionario completado", {
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
                if (response.status == 200) router.push("/candidate/quizz")
            }, 3000);
        } catch (error) {
            toast.error("Error en red, contacte a soporte tecnico", {
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

    const goNext = async (formData: any) => {
        data?.map((item: any, key: number) => {
            if (item.page === step) {
                console.log(item.respuestaCorrecta == formData.respuestasCandidato)
                item.respuestaCorrecta != formData.respuestasCandidato ? setPuntacion(puntuacion - 1) : false
                setRespuestasCandidato([...respuestasCandidatos, { respuesta: formData.respuestasCandidato, correcta: item.respuestaCorrecta == formData.respuestasCandidato }])
            }
        })
        nextStep();
    }

    return (
        <>
            <form onSubmit={handleSubmit(goNext)} >
                {data?.map((item: any, key: number) => {
                    return (
                        <div className="form" key={key}>
                            {step === item.page && (
                                <div key={key}>
                                    <div className="col-md-12 mb-3">
                                        {item.pregunta}
                                    
                                    </div>
                                    <div className="col-md-12">
                                        {/* Name input field */}
                                        {item.respuestas.map((respuestas: any, keyField: number) => {
                                            return (
                                                <div key={keyField}>
                                                    <ul>
                                                        <li>
                                                            <input type="radio" {...register(`respuestasCandidato`, {
                                                                required: true
                                                            })} value={respuestas.respuesta} />
                                                            {respuestas.respuesta}
                                                        </li>
                                                    </ul>


                                                </div>
                                            )
                                        })}

                                        <input type="hidden" {...register('pregunta')} value={item.pregunta} />
                                        <input type="submit" value="Siguiente" className="mt-3 btn btn-primary" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
                {step > data?.length && (
                    <div className="row">
                        Cuestionario finalizado
                        Tus respuestas:
                        {respuestasCandidatos?.map((item: any, key: number) => {
                            return (
                                <div key={key}>
                                    <p>"¿{item.respuesta}?"</p>
                                    <>{item.correcta ? <p className="text-success">Respuesta correcta</p> : <p className="text-danger">Respuesta incorrecta</p>}</>
                                    <hr />
                                </div>
                            )
                        })}
                        <p>Calificacíon final:{puntuacion}</p>
                        <br />
                        <p className="text-danger">Tus respuestas no se guardaran!</p>
                        <div className="col-md-6">

                            <button className="btn btn-info" onClick={() => window.location.reload()}>Intentar de nuevo</button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-info btn-block" onClick={() => sendData()}>Enviar</button>
                        </div>
                    </div>
                )}
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
            </form>
        </>)

}