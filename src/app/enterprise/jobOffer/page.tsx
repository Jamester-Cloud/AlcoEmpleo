"use client"
import React, { useState, useEffect } from 'react';
import CardOffer from "@/app/components/cards/CardJobOffer"
import "@/app/components/cards/css/styles.css"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { Modal } from "react-bootstrap";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faDeleteLeft
} from "@fortawesome/free-solid-svg-icons";

export default function JobOffer() {
    const router = useRouter()
    const [isPremium, setIsPremium] = useState<boolean | null>(null);
    const [isUpdate, setUpdate] = useState(false);
    const [idOferta, setIdOfertaTrabajo] = useState();
    const [ofertas, setOfertas] = useState();
    const [data, setData]: any = useState({
        tituloOferta: "",
        descripcionOferta: "",
        beneficios: [],
        requisitos: [],
        nuevoBeneficio: '',
        nuevoRequisito: '',
        modalidadTrabajo: "",
        empresa: "",
        idEmpresa: "",
        idOferta: ""
    })

    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const handleClose = () => setShow(false);

    const [beneficio, setBeneficios]: any = useState()
    const [requisito, setRequisitos]: any = useState()

    const onHandleInputChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setData({ ...data, [name]: newValue });
    }

    const onHandleBeneficiosChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setBeneficios(newValue);

    }

    const onHandleRequisitosChange = ({ target: { name, value } }: any) => {
        let newValue = value;
        setRequisitos(newValue);

    }

    const loadBeneficio = (e: any) => {
        e.preventDefault()

        const newArray = [
            ...data.beneficios,
            beneficio
        ];

        if (beneficio != '') setData({ ...data, beneficios: newArray });
        setBeneficios('');
    }
    const loadRequisito = (e: any) => {
        e.preventDefault()
        const newArray = [
            ...data.requisitos,
            requisito
        ];
        if (requisito != '') setData({ ...data, requisitos: newArray });
        setRequisitos('');
    }

    const deleteBeneficio = (e: any) => {
        e.preventDefault()
        if (beneficio == '') {
            let arrayNew = data.beneficios.pop()
            setData({ ...data, beneficios: arrayNew });
        }
        const newArray = data.beneficios.filter((item: any, index: any) => item !== beneficio);
        setData({ ...data, beneficios: newArray });

    };

    const deleteRequisito = (e: any) => {
        e.preventDefault()
        if (beneficio == '') {
            let arrayNew = data.requisitos.pop()
            setData({ ...data, requisitos: arrayNew });
        }
        const newArray = data.requisitos.filter((item: any, index: any) => item !== requisito);
        setData({ ...data, requisitos: newArray });

    };
    //Getting the data for enterprise user
    const getUserDetails = async () => {
        const isPremiumFromStorage = localStorage.getItem('isPremium') === 'true';
        setIsPremium(isPremiumFromStorage);
        const res = await axios.get("/api/enterprise/me");
        console.log(res.data);
        setData({ ...data, empresa: res.data?.personaData.nombre, idEmpresa: res?.data.empresa._id });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await axios.post('/api/enterprise/jobOffer/save', { data: data, isUpdate: isUpdate, idOferta: idOferta })

        if (response.status == 200) {
            toast.success('Anuncio publicado', {
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
            //getPublicaciones();
            setTimeout(() => {
                if (response.status === 200) {
                    router.push('/enterprise/')
                }
            }, 2000);
        }

    }

    useEffect(() => {
        if (data.empresa === "") (async () => {
            try {
                await getUserDetails()
            } catch (err) {
                console.log('Error al cargar los datos el usuario');
            }
        })()
    }, [!data])

    const getPublicaciones = async () => {
        const res = await axios.post('/api/enterprise/jobOffer/')
        if (res.status == 200) {
            console.log(res)
            setOfertas(res.data.ofertas);
        }
    }

    const updateOferta = async (idOferta: string) => {
        console.log(idOferta);
        const oferta = await axios.post('/api/enterprise/jobOffer/get', { id: idOferta })
        if (oferta.status == 200) {
            //aca establezco los datos nuevos
            console.log(oferta.data.ofertas._id)
            setData({
                tituloOferta: oferta.data.ofertas.tituloOferta,
                modalidadTrabajo: oferta.data.ofertas.modalidadTrabajo,
                requisitos: oferta.data.ofertas.requisitos,
                beneficios: oferta.data.ofertas.beneficios,
                idEmpresa: oferta.data.ofertas.idEmpresa,
                descripcionOfertaTrabajo: oferta.data.ofertas.descripcionOfertaTrabajo,
                idOferta: oferta.data.ofertas._id
            })
            setIdOfertaTrabajo(oferta.data.ofertas._id)
            setUpdate(true);
            setShow(false);
        }
    }

    const deleteOferta = async (idOferta: string) => {
        try {
            let res = await axios.post('/api/enterprise/jobOffer/delete/', { idOferta: idOferta })
            if (res.status == 200) {
                toast.info('Anuncio Eliminado', {
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
                await getPublicaciones();
            }
        } catch (error) {
            console.log("No se puedo eliminar")
        }
    }

    useEffect(() => {
        getPublicaciones();
    }, [!ofertas])

    const form = (title: string, data: any) => {
        switch (title) {
            case 'Administrar ofertas':
                return (
                    <>
                        <table className="min-w-50 bg-white shadow-md rounded mb-4">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Titulo</th>
                                    <th className="py-2 px-4 border-b">Modificar</th>
                                    <th className="py-2 px-4 border-b">Eliminar</th>
                                    {/* actualizar carga el formulario anterior */}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item: any, key: number) => (
                                    <tr className='p-5' key={key}>
                                        <td className='p-2'>
                                            {item.tituloOferta}
                                        </td>
                                        <td className='mt-2'>
                                            <button onClick={() => updateOferta(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                Actualizar
                                            </button>
                                        </td>
                                        <td className='mt-2'>
                                            <button onClick={() => deleteOferta(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
                break;

            default:
                break;
        }
    }

    const handleModal = (e: any, title: string, data: any) => {
        e.preventDefault();
        setModalTitle(title);
        setShow(true);
    };


    return (


        <div className="row g-0">
            {isPremium === false ? (
                <h1 className="text-red-500   text-center py-96">
                    Para Ofertar el Empleo Debe de ser Premium
                </h1>
            ) : (
                <>
                    <div className="col-lg-6 p-3 mb-2">
                        <div className="px-1 py-5 mx-auto">

                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 text-right">
                                    <button className='btn btn-primary' onClick={(e) => handleModal(e, 'Administrar ofertas', {})}> Publicacíones</button>
                                </div>
                                {/* <div className="col-md-6 text-right">
                                    <button className='btn btn-primary' onClick={(e) => handleModal(e, 'Administrar ofertas', {})}> Solicitudes</button>
                                </div> */}
                                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                                    <h3>Oferta de trabajo</h3>

                                    <p className="blue-text">Datos de la publicacion</p>
                                    <form className="form-card" onSubmit={handleSubmit}>
                                        <div className="row justify-content-between text-left">
                                            <div className="form-group col-md-12 flex-column d-flex">
                                                <label className="form-control-label px-3">Titulo<span className="text-danger"> *</span></label>
                                                <input
                                                    type="text"
                                                    id="tituloOferta"
                                                    required
                                                    name="tituloOferta"
                                                    onChange={onHandleInputChange}
                                                    value={data.tituloOferta}
                                                    className="form-control t-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Titulo de la oferta de empleo"
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-sm-12 flex-column d-flex">
                                                <label className="form-control-label px-3">Descripcion de la oferta<span className="text-danger"> *</span></label>
                                                <textarea
                                                    id="descripcionOferta"
                                                    className="form-control t-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    name="descripcionOferta"
                                                    defaultValue={data.descripcionOfertaTrabajo}
                                                    onChange={onHandleInputChange}
                                                    placeholder="Descripcion de la oferta de empleo"
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex">
                                                <label className="form-control-label px-3">Modalidad de Trabajo<span className="text-danger"> *</span></label>
                                                <input
                                                    type="text"
                                                    id="modalidadTrabajo"
                                                    required
                                                    name="modalidadTrabajo"
                                                    onChange={onHandleInputChange}
                                                    value={data.modalidadTrabajo}
                                                    className="form-control t-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Modalidad de la oferta de empleo"
                                                />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row mt-3">
                                            <div className="col-md-12 text-left">
                                                <label className="form-control-label px-3">Beneficios<span className="text-danger"> *</span></label>
                                                <input
                                                    type="text"
                                                    id="beneficios"
                                                    name="beneficios"
                                                    onChange={onHandleBeneficiosChange}
                                                    value={beneficio}
                                                    className="form-control t-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Ingrese beneficios de la oferta a incluir o eliminar"
                                                />
                                            </div>
                                            <div className="col-md-3 text-start justify-content-between mt-2">
                                                <button
                                                    type="button"
                                                    onClick={loadBeneficio}
                                                    className="btn btn-sm btn-primary rounded"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={deleteBeneficio}
                                                    className="btn btn-sm btn-danger rounded ml-2"
                                                >
                                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex">
                                                <label className="form-control-label px-3">Requisitos<span className="text-danger"> *</span></label>
                                                <input
                                                    type="text"
                                                    id="requisito"
                                                    name="requisito"
                                                    onChange={onHandleRequisitosChange}
                                                    value={requisito}
                                                    className="form-control t-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Ingrese un requisito para la oferta a incluir o eliminar"
                                                />
                                            </div>
                                            <div className="col-md-3 text-start justify-content-between mt-2">
                                                <button
                                                    type="button"
                                                    onClick={loadRequisito}
                                                    className="btn btn-sm btn-primary rounded"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={deleteRequisito}
                                                    className="btn btn-sm btn-danger rounded ml-2"
                                                >
                                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left mt-3">
                                            <div className="form-group col-md-12 flex-column d-flex">
                                                <button className='btn btn-sm btn-primary' type='submit'> Publicar anuncio</button>
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 align-items-right mt-5 p-5">
                        <h3>Publicación: </h3>
                        <CardOffer data={data} />
                    </div>
                </>
            )}
            <Modal
                size="lg"

                show={show}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-5">
                        {form(modalTitle, ofertas)}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}