import React from "react";
import { useFieldArray } from "react-hook-form";

// import Input from "./components/input";

export default ({ nestIndex, control, register, errors }: { nestIndex: any, control: any, register: any, errors: any }) => {
  
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test[${nestIndex}].nestedArray`
  });

  return (
    <div>
      <div style={{ marginLeft: 10, borderLeft: "2px solid red" }}>
        {fields.map((item: any, k) => {
          return (
            <div
              key={item.id}
              style={{ height: "50px", display: "flex", marginLeft: 10 }}
            >
              <input
                type="text"
                {...register(`test[${nestIndex}].nestedArray[${k}].field1`, {
                  required: { value: true, message: "Required" },
                  min: { value: 0, message: "Min: 0" }
                })}
                defaultValue={item.field1}
                style={{ marginRight: "25px" }}
              />
              <button
                type="button"
                onClick={() => remove(k)}
                style={{ height: "40px", marginTop: 0 }}
              >
                Eliminar
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ field1: "field1" })}
          style={{ marginLeft: "10px" }}
        >
          Agregar
        </button>
      </div>

      <hr />
    </div>
  );
};
