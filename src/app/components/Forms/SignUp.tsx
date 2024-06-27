import React, { Ref, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import defaultLogo from "../../../../public/AlcoLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDeleteLeft
} from "@fortawesome/free-solid-svg-icons";
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
    const [selectedAdImages, setSelectedAdImages] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState(defaultLogo);
    const [AdImageInputErr, setAdImageInputErr] = React.useState(false); // Initialize with false


    //logo handling functions
    // Function to preview the selected ad image
    const PreviewAdImage = (selectedImages: any) => {
        if (selectedImages.length === 0) {
            // If no images are selected, display a default image or message 
            // my default image is adImage 
            setPreviewImage(defaultLogo);
        } else {
            const reader: any = new FileReader();

            reader.onload = () => {
                // Set the previewImage state with the data URL of the selected image
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedImages[0]);
        }
    };

    const handleAdimages = (event: any) => {
        const selectedImages = Array.from(event.target.files);

        // Clear any previous error messages
        setAdImageInputErr(false);

        if (selectedAdImages.length + selectedImages.length <= 1) {
            // Allow up to 1 images to be selected
            setSelectedAdImages((prevSelectedAdImages: any) => [
                ...prevSelectedAdImages,
                ...selectedImages,
            ]);

            // Display a preview of the selected images
            PreviewAdImage([...selectedAdImages, ...selectedImages]);
        } else {
            // Display an error message if the user exceeds the image limit
            alert("You can only select up to 3 files.");
        }
    };

    const handleRemoveAdImages = (index: any) => {
        const updatedAdImages = selectedAdImages.filter((_, i) => i !== index);
        setSelectedAdImages(updatedAdImages);

        // Display a preview of the updated selected images
        PreviewAdImage(updatedAdImages);
    };

    //SignUp function
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", { ...userData, type, logo: type === 'Empresas' ? selectedAdImages : 'noLogo'  })
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
            console.log(error);
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}

                                                    />
                                                    {hasTyped && !isInvalid ? <label htmlFor="cedula" className="text-danger">Formato invalido</label> : <label htmlFor="riff">Cédula</label>}
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
                                                            className="BrowseImageInput form-control"
                                                        />
                                                        {AdImageInputErr && (
                                                            <p className="px-3 text-danger">
                                                                Por favor Selecciona una imagen por favor
                                                            </p>
                                                        )}
                                                        {selectedAdImages.length > 0 && (
                                                            <div className="p-3 d-flex gap-3">
                                                                <p>Imagen Seleccionada:</p>
                                                                <ul>
                                                                    {selectedAdImages.map((file: any, index) => (
                                                                        <div
                                                                            className="d-flex align-items-center justify-content-between gap-3"
                                                                            key={index} // Moved key to the outer element
                                                                        >
                                                                            <li>{file.name}</li>
                                                                            <FontAwesomeIcon className="text-danger" icon={faDeleteLeft}
                                                                                onClick={() => handleRemoveAdImages(index)}
                                                                            ></FontAwesomeIcon>
                                                                        </div>
                                                                    ))}
                                                                </ul>
                                                            </div>
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
                                                    />
                                                    <label className="form-label" htmlFor="nombres">Nombres</label>
                                                </div>
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className=" flex-fill mb-0">
                                                    <input type="text"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        onChange={onHandleInputChange}
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <label className="form-label" htmlFor="email">Email</label>
                                                </div>

                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" mb-0">
                                                    <input
                                                        type="number"
                                                        name="telefono"
                                                        onChange={onHandleInputChange}
                                                        id="telefono"
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
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
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'} />
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
                                                        className={'form-control'}
                                                    />
                                                    <label className={repeatedPassword == userData?.password ? "" : "text-danger"} htmlFor="passwordrep"> {repeatedPassword == userData?.password ? "Repite tu contraseña" : "Las contraseñas no coinciden"}</label>

                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <div className=" flex-fill mb-0">
                                                    <textarea
                                                        className={hasTyped && !isInvalid ? 'form-control is-invalid' : 'form-control'}
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