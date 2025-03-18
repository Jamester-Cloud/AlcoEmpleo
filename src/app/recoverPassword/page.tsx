"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { requestHandler } from "@/helpers/axiosRequest";
import { ToastContainer, toast, Bounce } from "react-toastify";

const RecoverPassword: React.FC = () => {
  const [user, setUser] = React.useState<any>({
    preguntas: [],
    email: "",
    hasQuestions: false,
    isFirstTimeLogin:true
  });

  const [toggleForm, setToggleForm] = React.useState<boolean>(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      emailSearch: "",
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
  });

  const { fields } = useFieldArray({
    name: "questions",
    control,
  });

  const onEmailSubmit = async (data: any) => {
    try {
      const res = await requestHandler(
        {
          url: "/api/users/passwordRecovery/findUser/",
          data: { email: data.emailSearch },
        },
        "post"
      );

      if (res?.status == 200) {
        setUser({
          preguntas: res.data.user.preguntas,
          email: res.data.user.email,
          hasQuestions: res.data.user.preguntas.length > 0 ? true : false,
        });
        setToggleForm(true);
      }
    } catch (error: any) {
      let message = error.response.data.error;
      setUser({ preguntas: [], hasQuestions: false });
      setToggleForm(false);
      toast.error(`Error: ${message}`);
    }
  };

  const submitQuestions = async (data: any) => {
    try {
      const res = await requestHandler(
        {
          url: "/api/users/passwordRecovery/saveQuestions/",
          data: { preguntas: data.questions, email: user.email },
        },
        "post"
      );

      if (res?.status == 200) {
        setToggleForm(true);
        setUser({...user, isFirstTimeLogin:res.data.user.firstTimeLogin})
        setToggleForm(false)
        toast.success("Se han guardado las preguntas exitosamente");
        
      }
    } catch (error: any) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center mb-4">Recuperacíon de cuenta</h1>
      <div className="card p-5 mb-5">
        <form onSubmit={handleSubmit(onEmailSubmit)}>
          <div className="row justify-content-center ml-3 mb-3">
            <div className="col-5">
              <input
                {...register("emailSearch", { required: "Campo obligatorio" })}
                type="text"
                placeholder="Ingrese su email"
                className="form-control"
              />
            </div>
            <div className="col-3">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-md"
              >
                Buscar
              </button>
            </div>
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

        {toggleForm && (
          <form onSubmit={handleSubmit(submitQuestions)}>
            {!user.hasQuestions ? (
              <>
                {fields.map((field, i: number) => (
                  <>
                    <div key={i} className="card p-4 mb-3">
                      <div className="mb-3">
                        {/* Pregunta */}
                        <input
                          className="form-control mb-3"
                          {...register(`questions.${i}.question`, {
                            required: "Campo obligatorio",
                          })}
                          placeholder="Ingrese una pregunta de seguridad"
                        />
                        {/* respuesta */}
                        <input
                          className="form-control"
                          {...register(`questions.${i}.answer`, {
                            required: "Campo obligatorio",
                          })}
                          placeholder="Ingrese una respuesta"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {/* aca colocamos las preguntas si existen, y ponemos al usuario a responderlas */}
                <div className="card p-4 mb-3">
                  <div className="mb-3">
                    <label htmlFor="question1" className="form-label"></label>
                    {/* respuesta */}
                    <input
                      type="text"
                      className="form-control"
                      id="question1"
                      name="question1"
                      placeholder="Ingrese una respuesta"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="col-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-md"
              >
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const RecoverForm:React.FC = (props) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      verifyPassword:""

    },
  });

  const submitPass = (data:any) =>{
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(submitPass)}>
      <div className="row mb-3">
        <div className="col-8">
          <input
            {...register("password", { required: "Campo obligatorio" })}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-4">
          <button type="submit" className="btn btn-primary btn-block btn-md">
            Buscar
          </button>
        </div>
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
  );
};

export default RecoverPassword;
