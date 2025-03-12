"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { requestHandler } from "@/helpers/axiosRequest";
import { ToastContainer, toast, Bounce } from "react-toastify";
const RecoverPassword: React.FC = () => {
  const [user, setUser] = React.useState<any>({
    preguntas: [],
    email: "",
    hasQuestions: false,
  });

  const [toggleForm, setToggleForm] = React.useState<boolean>(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailSearch: "",
      question1: "",
      answer1: "",
      question2: "",
      answer2: "",
    },
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
      console.log(error.response.data.error);
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
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center mb-4">Recuperacíon de cuenta</h1>
      <div className="card p-4 mb-5">
        <form onSubmit={handleSubmit(onEmailSubmit)}>
          <div className="row mb-3">
            <div className="col-8">
              <input
                {...register("emailSearch", { required: "Campo obligatorio" })}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-4">
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
              <div className="card p-4 mb-3">
                <div className="mb-3">
                  <label htmlFor="question1" className="form-label">
                    Pregunta 1
                  </label>
                  {/* Pregunta */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="question1"
                    name="question1"
                    placeholder="Ingrese una pregunta de seguridad"
                  />
                  {/* respuesta */}
                  <input
                    type="text"
                    className="form-control"
                    id="question1"
                    name="question1"
                    placeholder="Ingrese una respuesta"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="question2" className="form-label">
                    Pregunta 2
                  </label>
                  {/* Pregunta */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Ingrese una pregunta de seguridad"
                  />
                  {/* respuesta */}
                  <input
                    type="text"
                    className="form-control"
                    id="question2"
                    name="question2"
                    placeholder="Ingrese una respuesta"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="card p-4 mb-3">
                  <div className="mb-3">
                    <label htmlFor="question1" className="form-label">
                      Pregunta 1
                    </label>
                    {/* respuesta */}
                    <input
                      type="text"
                      className="form-control"
                      id="question1"
                      name="question1"
                      placeholder="Ingrese una respuesta"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="question2" className="form-label">
                      Pregunta 2
                    </label>
                    {/* respuesta */}
                    <input
                      type="text"
                      className="form-control"
                      id="question2"
                      name="question2"
                      placeholder="Ingrese una respuesta"
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
