import React, { Ref, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image";
import Select from "react-select";
import { ToastContainer, toast, Bounce } from 'react-toastify';


export default function SignUpForm(props: any) {

    let { type, data } = props;

    const router = useRouter()

    const [userData, setUserData] = React.useState(data)
    //Email
    const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //states
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [hasTyped, setHasTyped] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [repeatedPassword, setRepeatedPassword] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [selectedAdImages, setSelectedAdImages]: any = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState();
    const [regions, setRegions] = React.useState<any>();
    const [selectedLocation, setSelectedLocation] = React.useState<any>();

    const [AdImageInputErr, setAdImageInputErr] = React.useState(false); // Initialize with false

    

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
        setUserData({ ...userData, estado: selectedOption ? selectedOption.value : '' });
      };


    const handleAdimages = (event: any) => {
        setSelectedAdImages(event.target.files)
    };
    //SignUp function
    const onSignup = async () => {   
        console.log(selectedAdImages)
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",
                { ...userData, type, logo: type === 'Empresas' ? selectedAdImages : 'noLogo' },
                { headers: { 'content-type': 'multipart/form-data' } })

            toast.success('Registro exitoso!', {
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
                if (response.status === 200) router.push("/login")
            }, 2000);

        } catch (error: any) {
            toast.error(`Error en el registro del usuario: ${error.response.data.error} `, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log("sign up failed", error.error);
        } finally {
            setLoading(false);
        }

    }

    const onHandleInputChange = ({ target: { name, value } }: any) => {

        let newValue = value;
        setUserData({ ...userData, [name]: newValue });
        setHasTyped(true);
        setIsInvalid(newValue ? true : false)

        if (!/^[JGCV][0-9]{9}$/.test(value) && value !== '' && name == "rif") {
            setIsInvalid(false)
        }

        if (!/^[JGCVE][0-9]{7,8}$/.test(value) && value !== '' && name == "cedula") {
            setIsInvalid(false)
            setHasTyped(true);

        }

        if ((name == 'nombres' || name == 'apellidos') && !/^[a-zA-Z ]*$/.test(value)) {
            setIsInvalid(false)
            setHasTyped(true);
        }

        if (!isValidEmail.test(value) && name == 'email') {
            setHasTyped(true);
            setIsInvalid(false)
        }

    }

    const isFormUserValid = () => {
        return type === 'Empresas' ? Object.values(userData).every((value) => value !== '')
            && userData?.rif !== ''
            && /^[JGCV][0-9]{9}$/.test(userData?.rif)
            : Object.values(userData).every((value) => value !== ''
                && /^[JGCVE][0-9]{7,8}$/.test(userData?.cedula));
    };

    const isOnlyLetters = () => {
        return /^[a-zA-Z ]*$/.test((userData?.nombre || userData?.apellidos))
    }

    const isEmailOnly = () => {
        return isValidEmail.test(userData?.email)
    }


    useEffect(() => {
        setButtonDisabled(!isFormUserValid() || !isOnlyLetters() || !isEmailOnly())
    }, [userData]);



    return (
        <section className="">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="text-black" style={{ borderRadius: "25px" }}>
                            <div className="p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{loading ? 'Enviando datos...' : type}</p>

                                        <form className="mx-1 mx-md-4">

                                            {type === 'Empresas' ? <div className="d-flex flex-row align-items-center mb-4">

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        maxLength={13}
                                                        name="rif"
                                                        id="rif"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                                    />
                                                    {hasTyped && !isInvalid ? <label htmlFor="rif" className="text-danger">Formato invalido</label> : <label htmlFor="riff">RIF</label>}
                                                    <br /><span className="text-fade">Formato: J-G: 123456789, Ejemplo: J123456789</span>
                                                    <hr />
                                                </div>

                                            </div> : <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        name="cedula"
                                                        id="cedula"
                                                        maxLength={13}
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid  mt-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control mt-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}

                                                    />
                                              
                                                    {hasTyped && !isInvalid ? <label htmlFor="cedula" className="text-danger">Formato invalido Ejemplo: V-E V123456789</label> : <label htmlFor="riff">Cédula V-E: V123456789</label>}
                                                    
                                                    <hr />
                                                </div>

                                            </div>}

                                            {type === 'Empresas' ? <div className="d-flex flex-row align-items-center mb-4">

                                                <fieldset>
                                                    <div className="mb-3">
                                                        <p className="mb-0">
                                                            Sube tu logo empresarial{" "}
                                                            <sup>
                                                                <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                                                            </sup>
                                                        </p>
                                                        <input
                                                            type="file"
                                                            onChange={handleAdimages}
                                                            multiple
                                                            accept=".jpg, .jpeg, .png"
                                                            className="BrowseImageInput form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        {AdImageInputErr && (
                                                            <p className="px-3 text-danger">
                                                                Por favor Selecciona una imagen por favor
                                                            </p>
                                                        )}
                                                    </div>
                                                </fieldset>

                                            </div> : <>

                                            </>}



                                            {type === 'Empresas' ? <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        name="razonSocial"
                                                        type="text"
                                                        onChange={onHandleInputChange}
                                                        id="razonSocial"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                                    />
                                                    <label className="form-label mt-2" htmlFor="razonSocial">Razon Social</label>
                                                </div>
                                            </div> : <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        name="nombres"
                                                        type="text"
                                                        onChange={onHandleInputChange}
                                                        id="nombres"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                                    />
                                                    <label className="form-label" htmlFor="nombres">Nombres</label>
                                                </div>
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input type="text"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'} />
                                                    <label className="form-label" htmlFor="apellidos">Apellidos</label>
                                                </div>
                                            </div>}


                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="email"
                                                        onChange={onHandleInputChange}
                                                        id="email"
                                                        name="email"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control  t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'} />
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                </div>

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" mb-0">
                                                    <input
                                                        type="text"
                                                        name="telefono"
                                                        maxLength={14}
                                                        onChange={onHandleInputChange}
                                                        id="telefono"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'} />
                                                    <label className="form-label" htmlFor="telefono">Telefono de contacto</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        onChange={onHandleInputChange}
                                                        autoComplete="current-password"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'} />
                                                    <label className="form-label" htmlFor="password">Contraseña</label>
                                                </div>
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        autoComplete="current-password"
                                                        name="passwordrep"
                                                        value={repeatedPassword}
                                                        id="passwordrep"
                                                        onChange={(e) => setRepeatedPassword(e.target.value)}
                                                        className={'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                                    />
                                                    <label className={repeatedPassword == userData?.password ? "" : "text-danger"} htmlFor="passwordrep"> {repeatedPassword == userData?.password ? "Repite tu contraseña" : "Las contraseñas no coinciden"}</label>

                                                </div>
                                            </div>
                                            {type === 'Candidatos' ? <div className=" flex justify-center items-center m-2">

                                            <Select
                                               id="estado"
                                                options={regions}
                                                value={selectedLocation}
                                                onChange={handleLocationChange}
                                                placeholder="Ubicación"
                                                isClearable={true}
                                                className=" w-75 "
                                                            name="estado"
                                                            menuPortalTarget={document?.body}
                                                            styles={{
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                            }}></Select>

                                            </div>  : <>

                                            </>}

                                            <div className="form-check d-flex justify-content-center mb-5">

                                             
                                                <div className=" flex-fill mb-0">
                                        
                                                    <textarea
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' : 'form-control t-2 w-full  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                                        onChange={onHandleInputChange}
                                                        id="direccion"
                                                        name="direccion"
                                                        rows={3}
                                                    ></textarea>
                                                    <label className="form-label" htmlFor="direccion">{type === 'Empresas' ? 'Direccion fiscal' : 'Dirección de habitación'}</label>
                                                </div>
                                            </div>

                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Estoy de acuerdo a los <a href="#!">Terminos de servicio del GrupoAlco</a>
                                                </label>
                                            </div> */}

                                        </form>
                                        <div className="text-center">
                                            <button type="button" onClick={onSignup} disabled={buttonDisabled} className="btn btn-primary btn-block">Crear cuenta</button>

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
                                            <>
                                           
                                            
                                            </>

                                        </div>
                                    </div>
                                    {/* logo */}
                                    <div className="col-md-10 p-5 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <Image width={400} height={400} src="/AlcoSloganLogo.png"
                                            className="img-fluid" alt="GrupoAlcoLogo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}