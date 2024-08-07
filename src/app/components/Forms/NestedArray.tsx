import { useFieldArray } from "react-hook-form";

export default function NestedFields({ nestIndex, control, register, errors }: any) {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `quiz[${nestIndex}].respuestas`
    });


    return (
        <div>
            <div className="p-5">
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
                                className="form-control mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => remove(k)}
                                className="btn btn-danger p-2 ml-2 mt-2"
                            >
                                Eliminar
                            </button>
                        </div>
                    );
                })}
<br />
                <button
                    type="button"
                    onClick={() => append({ field1: "field1" })}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                >
                    Agregar respuesta
                </button>
            </div>

            <hr />
        </div>
    )
}