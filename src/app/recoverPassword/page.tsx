"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { axiosRequestHandler } from "@/helpers/axiosRequest";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/jwtTokenControl";
const RecoverPassword: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = React.useState<any>({
    preguntas: [],
    email: "",
    rut: "",
    hasQuestions: false,
    isFirstTimeLogin: true,
  });

  const [isAuthenticated, setisAuthenticated] = React.useState<boolean>(false);

  const [toggleForm, setToggleForm] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailSearch: "",
      rut: "",
      preguntas: [
        { pregunta: "", respuesta: "" },
        { pregunta: "", respuesta: "" },
      ],
      password: "",
      verifyPassword: "",
    },
  });

  const { fields } = useFieldArray({
    name: "preguntas",
    control,
  });
  /**
   * find the user by email
   *
   * @param {object} data
   */
  const onEmailSubmit = async () => {
    console.log(user);
    try {
      const res = await axiosRequestHandler(
        {
          url: "/api/users/passwordRecovery/findUser/",
          data: { email: user.email, cedula: user.rut },
        },
        "post"
      );
      console.log(res);
      if (res?.status == 200) {
        setUser({
          preguntas: res.data.user.preguntas,
          email: res.data.user.email,
          hasQuestions: res.data.user.preguntas.length > 0 ? true : false,
        });
        reset({
          preguntas: [
            { pregunta: "", respuesta: "" },
            { pregunta: "", respuesta: "" },
          ],
        });
        setToggleForm(true);
      }
    } catch (error: any) {
      let message = error.response.data.error;
      setUser({ preguntas: [], hasQuestions: false });
      setToggleForm(false);
      reset();
      toast.error(`Error: ${message}`);
    }
  };

  const submitQuestions = async (data: any) => {
    try {
      const res = await axiosRequestHandler(
        {
          url: "/api/users/passwordRecovery/saveQuestions/",
          data: {
            preguntas: data.preguntas,
            email: user.email,
            password: data.password,
          },
        },
        "post"
      );

      if (res?.status == 200) {
        toast.success(
          "Se han guardado las preguntas exitosamente. Usuario Actualizado, redireccionando..."
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(`Error: ${error}`);
    }
  };

  const checkQuestions = async (data: any) => {
    try {
      const res = await axiosRequestHandler(
        {
          url: "/api/users/passwordRecovery/checkQuestions",
          data: {
            preguntas: data.preguntas,
            email: user.email,
          },
        },
        "post"
      );
      if (res?.status === 200) {
        toast.success("Preguntas correctas, puede actualizar la contraseña");
        setisAuthenticated(true);
        setToggleForm(false);
      }
      if (res?.status == 203) {
        toast.error("Preguntas erradas");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error ${error}`);
    }
  };

  const updatePassword = async (data: any) => {
    try {
      const res = await axiosRequestHandler(
        {
          url: "/api/users/passwordRecovery/",
          data: {
            password: data.password,
            email: user.email,
          },
        },
        "post"
      );
      if (res?.status === 200) {
        toast.success("Usuario actualizado, ya puede iniciar sesion");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error ${error}`);
    }
  };

  React.useEffect(() => {
    if (user.preguntas.length > 0 && !user.isFirstTimeLogin) {
      let defaultValues = {
        preguntas: user.preguntas.map((question: any) => {
          return { pregunta: question.pregunta };
        }),
      };
      console.log("preguntas", defaultValues);
      //reset the form with the questions
      reset({ ...defaultValues });
    }
  }, [user.isFirstTimeLogin, user.preguntas]);

  return (
    <div className="p-5">
      <h1 className="text-center mb-4">Recuperacíon de cuenta</h1>

      <div className="card p-5 mb-5">
        <form>
          <div className="row justify-content-center ml-3 mb-3">
            <div className="col-4">
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
                placeholder="Ingrese su email registrado al momento de crear la cuenta"
                className="form-control"
              />
            </div>
            <div className="col-4">
              <input
                onChange={(e) => setUser({ ...user, rut: e.target.value })}
                type="text"
                placeholder="Ingrese su cedula de identidad"
                className="form-control"
              />
            </div>
            <div className="col-3">
              <button
                type="button"
                onClick={() => (async () => await onEmailSubmit())()}
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
          <>
            {!user.hasQuestions ? (
              <form onSubmit={handleSubmit(submitQuestions)}>
                {fields.map((field, i: number) => (
                  <>
                    <div key={i} className="card p-4 mb-3">
                      <div className="mb-3">
                        {/* Pregunta */}
                        <input
                          className="form-control mb-3"
                          {...register(`preguntas.${i}.pregunta`, {
                            required: "Campo obligatorio",
                          })}
                          placeholder="Ingrese una pregunta de seguridad"
                        />
                        {/* respuesta */}
                        <input
                          className="form-control"
                          {...register(`preguntas.${i}.respuesta`, {
                            required: "Campo obligatorio",
                          })}
                          placeholder="Ingrese una respuesta"
                        />
                      </div>
                    </div>
                  </>
                ))}

                <p>Actualizar contraseña</p>
                <div className="card p-4 mb-3">
                  <div className="mb-3">
                    <input
                      className="form-control mb-3"
                      type="password"
                      {...register(`password`, {
                        required: "Campo obligatorio",
                        validate: (value) =>
                          value === watch("verifyPassword") ||
                          "Las contraseñas no coinciden",
                      })}
                      placeholder="Ingrese una nueva contraseña"
                    />
                    <input
                      className="form-control"
                      type="password"
                      {...register("verifyPassword", {
                        required: "Campo obligatorio",
                      })}
                      placeholder="Confirme su nueva contraseña"
                    />
                  </div>
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-md"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit(checkQuestions)}>
                {/* aca colocamos las preguntas si existen, y ponemos al usuario a responderlas */}
                <div className="card p-4 mb-3">
                  <div className="mb-3">
                    <label htmlFor="question1" className="form-label"></label>
                    {/* respuesta */}
                    {fields.map((field, i: number) => (
                      <div key={i} className="card p-4 mb-3">
                        <div className="mb-3">
                          <p>{field.pregunta}</p>
                          {/* respuesta */}
                          <input
                            className="form-control"
                            {...register(`preguntas.${i}.respuesta`, {
                              required: "Campo obligatorio",
                            })}
                            placeholder="Ingrese una respuesta"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-md"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {isAuthenticated && (
          <form onSubmit={handleSubmit(updatePassword)}>
            <p>Actualizar contraseña</p>
            <div className="card p-4 mb-3">
              <div className="mb-3">
                <input
                  className="form-control mb-3"
                  type="password"
                  {...register(`password`, {
                    required: "Campo obligatorio",
                    validate: (value) =>
                      value === watch("verifyPassword") ||
                      "Las contraseñas no coinciden",
                  })}
                  placeholder="Ingrese una nueva contraseña"
                />
                <input
                  className="form-control"
                  type="password"
                  {...register("verifyPassword", {
                    required: "Campo obligatorio",
                  })}
                  placeholder="Confirme su nueva contraseña"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-md"
              >
                Actualizar contraseña
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
