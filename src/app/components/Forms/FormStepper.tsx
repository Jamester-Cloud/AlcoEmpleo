import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
type FormValues = {
    respuestasCandidato: string,
    page: number
    pregunta: string
};

export const FormStepper = (props: any) => {
    let { data } = props;
    const [step, setStep] = useState(1);
    const [respuestasCandidatos, setRespuestasCandidato]: any = useState([]);
    const nextStep = () => {
        setStep(step + 1); // Move to the next step
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            respuestasCandidato: ""
        },
    });

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = methods;

    const sendData = () => { 
        
    }

    const goNext = async (formData: any) => {
        console.log(formData);
        formData.page = step;
        //aca ira agregando por cada "next" la respuesta del candidato, junto con la pagina
        // luego se comparara mediante un bucle con el array principal
        //luego se decidira si la respuesta es correcta,
        //para asi en la ultima fase del cuestionario, enviar el array ordenado para su actualizacion en la base de datos y la calificacion del candidato
        data?.map((item: any, key: number) => {
            console.log(item.page)
            if (item.page === step) {
                console.log(item.respuestaCorrecta)
                console.log(item.respuestaCorrecta == formData.respuestasCandidato)
                setRespuestasCandidato([...respuestasCandidatos, { respuesta: formData.respuestasCandidato, correcta: item.respuestaCorrecta == formData.respuestasCandidato }])
            }
        })
        nextStep();
        try {
            //const response = await axios.post('/api/candidate/quizzes/save', { preguntas: data.quiz, dificultad: data.dificultad, idCandidato: data.idCandidato, tituloCuestionario: data.tituloCuestionario })
            // toast.success("Cuestionario generado", {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });
            // setTimeout(() => {
            //     if (response.status == 200) router.push("/admin")
            // }, 3000);
        } catch (error) {
            // toast.error("Cuestionario no generado, contacte a soporte tecnico", {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     transition: Bounce,
            // });
            console.log("Error")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(goNext)} >
                {data?.map((item: any, key: number) => {
                    return (
                        <div key={key}>
                            {step === item.page && (
                                <div>
                                    <div className="col-md-12 mb-3">
                                        {item.pregunta}
                                        <br />
                                        preguntaCorrecta(Testing): {item.respuestaCorrecta}
                                        <br />
                                    </div>
                                    <div className="col-md-12">
                                        {/* Name input field */}
                                        {item.respuestas.map((respuestas: any, keyField: number) => {
                                            return (
                                                <div key={keyField}>
                                                    <input type="radio" {...register(`respuestasCandidato`, {
                                                        required: true
                                                    })} value={respuestas.respuesta} />
                                                    {respuestas.respuesta}

                                                </div>
                                            )
                                        })}

                                        <input type="text" {...register('pregunta')} value={item.pregunta} />
                                        <input type="submit" value="Siguiente" className="mt-3 btn btn-primary" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
                {step > data?.length && (
                    <div>
                        Cuestionario finalizado

                        <button className="btn btn-info">Enviar</button>
                    </div>
                )}
            </form>
        </>)

}