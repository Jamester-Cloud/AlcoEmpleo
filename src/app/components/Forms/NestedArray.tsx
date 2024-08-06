import { useFieldArray } from "react-hook-form";

export default function NestedFields({ nestIndex, control, register, errors }: any) {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `quiz[${nestIndex}].respuestas`
    });


    return (
        <div>
            <div style={{ marginLeft: 10, borderLeft: "2px solid red" }}>
                {fields.map((item: any, k: number) => {
                    return (
                        <div
                            key={item.id}
                            style={{ height: "50px", display: "flex", marginLeft: 10 }}
                        >
                            <input
                                type="text"
                                {...register(`quiz[${nestIndex}].respuestas[${k}].respuesta` as const, {
                                    required: true
                                })}
                                className="form-control"
                            />
                            <button
                                type="button"
                                onClick={() => remove(k)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}

                <button
                    type="button"
                    onClick={() => append({ field1: "field1" })}
                    className="btn btn-danger"
                >
                    Agregar respuesta
                </button>
            </div>

            <hr />
        </div>
    )
}