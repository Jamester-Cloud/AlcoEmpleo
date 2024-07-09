import React, {InputHTMLAttributes} from "react";
import { useFieldArray, UseFormRegister, FieldValues } from "react-hook-form";

import NestedListField from "./nestedlistField/NestedListField";
// import Input from "./components/input";


export default function Fields({ control, register, defaultValues, errors }:{control:any, register:UseFormRegister<FieldValues>, defaultValues:any, errors:any}, formName:any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: formName
  });


  return (
    <>
      <ul>
        {fields.map((item:any, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`test[${index}].name`, {required:true})}
                defaultValue={item.name}
              />   
              <button type="button" onClick={() => remove(index)}>
                Eliminar
              </button>
              <NestedListField
                nestIndex={index}
                {...{ control, register, errors }}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          append({ name: "append" });
        }}
      >
        append
      </button>

    </>
  );
}
