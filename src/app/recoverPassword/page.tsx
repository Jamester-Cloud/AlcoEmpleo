"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { requestHandler } from "@/helpers/axiosRequest";
import { ToastContainer, toast, Bounce } from "react-toastify";
const RecoverPassword: React.FC = () => {
  const [preguntas, setPreguntas] = React.useState([]);
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
      const res = await requestHandler({
        url: '/api/users/passwordRecovery/findUser/',
        data: {email: data.emailSearch},
      }, "post");

      if(res?.status == 200){
        setPreguntas(res.data.user.preguntas);
      }
    } catch (error:any) {
      console.log(error);
      toast.error("Error:", error.message);
    }
  };
  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center mb-4">Recuperacíon de cuenta</h1>
      <form onSubmit={handleSubmit(onEmailSubmit)} className="card p-4 mb-5">
        <div className="row mb-3">
          <div className="col-8">
          <input {...register("emailSearch", {required:"Campo obligatorio"})} type="text" className="form-control" />
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary w-50">
              Buscar
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
    </div>
  );
};

export default RecoverPassword;
