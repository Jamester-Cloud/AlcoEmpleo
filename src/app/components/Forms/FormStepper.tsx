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
           <form onSubmit={handleSubmit(goNext)} className="p-5 space-y-6  w-full flex   justify-center items-center">
                {data?.map((item: any, key: number) => {
                    return (
                        <div className="form text-center " key={key}>
                            {step === item.page && (
                                <div className="bg-white p-6 rounded-lg shadow-md " key={key}>
                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold text-gray-800">{item.pregunta}</h2>
                                    </div>
                                    <div className="space-y-3">
                                        {/* Opciones de respuesta */}
                                        {item.respuestas.map((respuestas: any, keyField: number) => {
                                            return (
                                                <div key={keyField} className="flex items-center space-x-2">
                                                    <input 
                                                        type="radio" 
                                                        {...register(`respuestasCandidato`, { required: true })}
                                                        value={respuestas.respuesta}
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                    />
                                                    <label className="text-gray-700  text-justify">{respuestas.respuesta}</label>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Input oculto */}
                                    <input type="hidden" {...register('pregunta')} value={item.pregunta} />
                                    
                                    {/* Botón siguiente */}
                                    <div className="mt-5">
                                        <input 
                                            type="submit" 
                                            value="Siguiente" 
                                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Mensaje al finalizar el cuestionario */}
                {step > data?.length && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 ">
                        <h3 className="text-lg font-bold text-gray-800 text-center">Cuestionario finalizado</h3>
                        <p className="text-gray-600">Tus respuestas:</p>
                        {respuestasCandidatos?.map((item: any, key: number) => {
                            return (
                                <div key={key} className="space-y-2">
                                    <p className="text-gray-800">{item.respuesta}</p>
                                    {item.correcta ? 
                                        <p className="text-green-600 font-semibold">Respuesta correcta</p> :
                                        <p className="text-red-600 font-semibold">Respuesta incorrecta</p>}
                                    <hr className="border-gray-200" />
                                </div>
                            );
                        })}
                        <p className="text-xl font-bold text-gray-800">Calificación final: {puntuacion}</p>
                        <p className="text-red-500">¡Tus respuestas no se guardarán!</p>

                        {/* Botón enviar */}
                        <div className="pt-4">
                            <button 
                                className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75"
                                onClick={() => sendData()}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}

                {/* ToastContainer */}
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