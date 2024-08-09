import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
    respuestasCandidato: { respuesta: string }[]
};

export const FormStepper = (props: any) => {
    let { data } = props;
    const stepsArray = React.Children.toArray(props?.data?.length);
    const [step, setStep] = useState(1);
    
    const nextStep = () => {
        setStep(step + 1); // Move to the next step
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            respuestasCandidato: [{ respuesta: "" }],
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

    return (<>
        <form >
            {/* {stepsArray.map((child: any, index: number) => (
                <div key={index}>
                    <div className="badge">{index + 1}</div>
                </div>
            ))} */}
            {data?.map((item: any, key: number) => {
                return (
                    <>
                        {step === item.page && (
                            <>
                                <div className="col-md-12">
                                    {item.pregunta}
                                </div>
                                <div className="col-md-12">
                                    {/* Name input field */}
                                    {/* {item.respuestas.map((item: any, key: number) => {
                                        return (
                                            <>
                                                <input type="radio"{...register(`respuestasCandidato[${key}].respuestas`)} value={item.respuesta} name="gender" />
                                                {item.respuesta}
                                                <br />
                                            </>)
                                    })} */}
                                </div>
                            </>
                        )}

                        {step > item.page && (
                            <div>
                                {/* Name input field */}
                                Cuestionario finalizado
                            </div>
                        )}
                    </>
                )
            })}
        </form>
    </>)

}