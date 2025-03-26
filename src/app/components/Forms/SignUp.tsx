import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

export default function SignUpForm(props: any) {
  let { type, data } = props;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nombres: "",
      apellidos: "",
      email: "",
      password: "",
      passwordrep: "",
      cedula: "",
      razonSocial: "",
      rif: "",
      telefono: "",
      direccion: "",
      estado: "",
    },
  });

  const router = useRouter();

  const [userData, setUserData] = React.useState(data);
  //Email
  const isValidEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  //states
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [hasTyped, setHasTyped] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [repeatedPassword, setRepeatedPassword] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [selectedAdImages, setSelectedAdImages]: any = React.useState([]);
  const [regions, setRegions] = React.useState<any>();
  const [selectedLocation, setSelectedLocation] = React.useState<any>("");

  const sendData = (data: any) => {
    console.log(data);
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get("/api/enterprise/candidate/regions");
      if (response.status === 200) return { regions: response.data.regiones };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!regions) {
      (async () => {
        try {
          const dataRegions: any = await fetchRegions();
          setRegions(dataRegions.regions);
        } catch (err: any) {
          console.error("Error al cargar la Region", err);
        }
      })();
    }
  }, [regions]);

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
    setUserData({
      ...userData,
      estado: selectedOption ? selectedOption.value : "",
    });
  };
  //SignUp function
  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/signup",
        {
          ...userData,
          type,
          logo:
            type === "Empresas"
              ? selectedAdImages.length > 0
                ? selectedAdImages
                : "noLogo"
              : "noLogo",
        },
        { headers: { "content-type": "multipart/form-data" } }
      );

      toast.success("Registro exitoso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        if (response.status === 200) router.push("/login");
      }, 1000);
    } catch (error: any) {
      toast.error(
        `Error en el registro del usuario: ${error.response.data.error} `,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      console.log("sign up failed", error.error);
    } finally {
      setLoading(false);
    }
  };

  const onHandleInputChange = ({ target: { name, value } }: any) => {
    let newValue = value;
    setUserData({ ...userData, [name]: newValue });
    setHasTyped(true);
    setIsInvalid(newValue ? true : false);

    if (!/^[JGCV][0-9]{9}$/.test(value) && value !== "" && name == "rif") {
      setIsInvalid(false);
    }

    if (
      !/^[JGCVE][0-9]{7,9}$/.test(value) &&
      value !== "" &&
      name == "cedula"
    ) {
      setIsInvalid(false);
      setHasTyped(true);
    }

    if (
      (name == "nombres" || name == "apellidos") &&
      !/^[a-zA-Z ]*$/.test(value)
    ) {
      setIsInvalid(false);
      setHasTyped(true);
    }

    if (!isValidEmail.test(value) && name == "email") {
      setHasTyped(true);
      setIsInvalid(false);
    }
  };

  return (
    <section className="">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="text-black" style={{ borderRadius: "25px" }}>
              <div className="p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {loading ? "Enviando datos..." : type}
                    </p>

                    {loading ? (
                      "Enviando datos..."
                    ) : (
                      <form
                        onSubmit={handleSubmit(sendData)}
                        className="mx-1 mx-md-4"
                      >
                        {type === "Empresas" ? (
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className=" flex-fill mb-0">
                              <input
                                type="text"
                                maxLength={13}
                                {...register("rif", {
                                  required: "Este campo es obligatorio",
                                  validate: (value) =>
                                    /^[JGCV][0-9]{9}$/.test(value) ||
                                    "Formato invalido Ejemplo: J123456789",
                                })}
                                id="rif"
                                className={
                                  "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }
                              />
                              {errors.rif && (
                                <span className="text-danger">
                                  {errors.rif.message}
                                </span>
                              )}
                              <br />
                              <span className="text-fade">
                                Formato: J-G: 123456789, Ejemplo: J123456789
                              </span>
                              <hr />
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className=" flex-fill mb-0">
                              <input
                                type="text"
                                {...register("cedula", {
                                  required: "Este campo es obligatorio",
                                  validate: (value) =>
                                    /^[JGCVE][0-9]{7,9}$/.test(value) ||
                                    "Formato invalido Ejemplo: V123456789",
                                })}
                                id="cedula"
                                maxLength={13}
                                className={
                                  "form-control mt-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }
                              />
                              <label htmlFor="cedula">Cedula</label>
                              <br />
                              {errors.cedula && (
                                <span className="text-danger">
                                  {errors.cedula.message}
                                </span>
                              )}
                              <hr />
                            </div>
                          </div>
                        )}

                        {type === "Empresas" ? (
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className=" flex-fill mb-0">
                              <input
                                type="text"
                                {...register("razonSocial", {
                                  required: "Este campo es obligatorio",
                                })}
                                id="razonSocial"
                                className={
                                  "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }
                              />
                              <label
                                className="form-label mt-2"
                                htmlFor="razonSocial"
                              >
                                Razon Social
                              </label>
                              <br />
                              {errors.razonSocial && (
                                <span className="text-danger">
                                  {errors.razonSocial.message}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className=" flex-fill mb-0">
                              <input
                                {...register("nombres", {
                                  required: "Este campo es obligatorio",
                                })}
                                type="text"
                                onChange={onHandleInputChange}
                                id="nombres"
                                className={
                                  "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }
                              />
                              <label className="form-label" htmlFor="nombres">
                                Nombres
                              </label>
                              <br />
                              {errors.nombres && (
                                <span className="text-danger">
                                  {errors.nombres.message}
                                </span>
                              )}
                            </div>
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>

                            <div className=" flex-fill mb-0">
                              <input
                                type="text"
                                id="apellidos"
                                {...register("apellidos", { required: true })}
                                onChange={onHandleInputChange}
                                className={
                                  "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                }
                              />
                              <label className="form-label" htmlFor="apellidos">
                                Apellidos
                              </label>
                              <br />
                              {errors.apellidos && (
                                <span className="text-danger">
                                  {errors.apellidos.message}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              {...register("email", {
                                required: "Este campo es obligatorio",
                                validate: (value) =>
                                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                  "Email Invalido",
                              })}
                              className={
                                "form-control  t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              }
                            />
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                            <br />
                            {errors.email && (
                              <span className="text-danger">
                                {errors.email.message}
                              </span>
                            )}
                          </div>

                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className=" mb-0">
                            <input
                              type="text"
                              {...register("telefono", {
                                required: "Este campo es obligatorio",
                              })}
                              maxLength={14}
                              onChange={onHandleInputChange}
                              id="telefono"
                              className={
                                hasTyped && !isInvalid
                                  ? "form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  : "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              }
                            />
                            <label className="form-label" htmlFor="telefono">
                              Telefono de contacto (EJ: +58412123456789 )
                            </label>
                            <br />
                            {errors.telefono && (
                              <span className="text-danger">
                                {errors.telefono.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              {...register("password", {
                                required: "Este campo es obligatorio",
                              })}
                              autoComplete="current-password"
                              className={
                                "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              }
                            />
                            <label className="form-label" htmlFor="password">
                              Contraseña
                            </label>
                            <br />
                            {errors.password && (
                              <span className="text-danger">
                                {errors.password.message}
                              </span>
                            )}
                          </div>
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                            <input
                              type="password"
                              autoComplete="current-password"
                              {...register("passwordrep", {
                                required: "Este campo es obligatorio",
                                validate: (value: string) => {
                                  return (
                                    value === watch("password") ||
                                    "Las contraseñas no coinciden"
                                  );
                                },
                              })}
                              id="passwordrep"
                              className={
                                "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              }
                            />

                            <label
                              className={
                                repeatedPassword == userData?.password
                                  ? ""
                                  : "text-danger"
                              }
                              htmlFor="passwordrep"
                            >
                              {" "}
                              {repeatedPassword == userData?.password
                                ? "Verificación"
                                : "Las contraseñas no coinciden"}
                            </label>
                            <br />
                            {errors.passwordrep && (
                              <span className="text-danger">
                                {errors.passwordrep.message}
                              </span>
                            )}
                          </div>
                        </div>
                        {type === "Candidatos" ? (
                          <div className="d-flex flex-row ml-5 align-items-center mb-4">
                            <Controller
                              control={control}
                              name="estado"
                              rules={{ required: "Este campo es obligatorio" }}
                              render={(props: any) => (
                                <Select
                                  {...props}
                                  id="estado"
                                  options={regions}
                                  placeholder="Ubicación"
                                  isClearable={true}
                                  className="w-75"
                                  onChange={(( value ) => props.field.onChange(value))}
                                  menuPortalTarget={document?.body}
                                  styles={{
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                  }}
                                />
                              )}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        {errors.estado && (
                          <span className="text-danger ml-3 mb-3">
                            {errors.estado.message}
                          </span>
                        )}

                        <div className="form-check d-flex justify-content-center mb-5">
                          <div className=" flex-fill mb-0">
                            <textarea
                              className={
                                "form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              }
                              id="direccion"
                              {...register("direccion", {
                                required: "Este campo es obligatorio",
                              })}
                              rows={3}
                            ></textarea>
                            <label className="form-label" htmlFor="direccion">
                              {type === "Empresas"
                                ? "Direccion fiscal"
                                : "Dirección de habitación"}
                            </label>
                            <br />
                            {errors.direccion && (
                              <span className="text-danger ml-3 mb-3">
                              {errors.direccion.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Crear cuenta
                          </button>
                        </div>
                      </form>
                    )}
                    <div className="text-center">
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
                      <></>
                    </div>
                  </div>
                  {/* logo */}
                  <div className="col-md-10 p-5 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <Image
                      width={400}
                      height={400}
                      src="/AlcoSloganLogo.png"
                      className="img-fluid"
                      alt="GrupoAlcoLogo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
