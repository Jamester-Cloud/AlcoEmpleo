"use client";
import React from "react";
import { useForm } from "react-hook-form";
import InputTextSearch from "../components/inputs/inputTextSearch";
import { requestHandler } from "@/helpers/axiosRequest";

const RecoverPassword: React.FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailSearch:"",
      question1: "",
      answer1: "",
      question2: "",
      answer2: "",
    },
  });
  const onEmailSubmit = async (data: any) => {
    try {
      const user = requestHandler(data, "get");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Recuperacíon de cuenta</h1>
      <form onSubmit={handleSubmit(onEmailSubmit)} className="card p-4 mb-5">
        <div className="row mb-3">
          <div className="col-8">
            <InputTextSearch {...register("emailSearch", {required:"Campo obligatorio"})} placeholder="Email de usuario" />
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-primary w-50">
              Buscar usuario
            </button>
          </div>
        </div>
        {/* Here */}
        <div className="card p-4 mb-3">
          {/* <div className="mb-3">
            <label htmlFor="question1" className="form-label">
              Pregunta 1
            </label>
            <input
              type="text"
              className="form-control"
              id="question1"
              name="question1"
              required
            />
          </div> */}
          {/* <div className="mb-3">
            <label htmlFor="question2" className="form-label">
              Pregunta 2
            </label>
            <input
              type="text"
              className="form-control"
              id="question2"
              name="question2"
              required
            />
          </div> */}
        </div>
        {/* <button type="submit" className="btn btn-primary w-100">Recover Password</button> */}
      </form>
    </div>
  );
};

export default RecoverPassword;
