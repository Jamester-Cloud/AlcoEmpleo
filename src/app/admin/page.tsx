"use client"
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from 'react-toastify';
type FormValues = {
    sliders: {
        titulo: string,
        texto: string
    }[],
    celular: {
        numero: string,
    }[],
    banner: {
        titulo: string,
        texto: string
    }[],
    secciones: {
        titulo: string,
        texto: string
    }[],
    politicaPrivacidad: string,
    direccion: string,
    idUsuario: string
};
export default function AdminPage() {

    const methods = useForm<FormValues>({
        defaultValues: {
            sliders: [{ titulo: "", texto: "" }],
            celular: [{ numero: "" }],
            banner: [{ titulo: "", texto: "" }],
            secciones: [{ titulo: "", texto: "" }],
            politicaPrivacidad: "",
            direccion: "",
        }
    });

    const {
        control,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = methods;

    //array fields
    const { fields: fieldsSliders, append: appendSliders, remove: removeSliders } = useFieldArray({
        name: "sliders",
        control
    });

    const { fields: fieldsBanners, append: appendBanners, remove: removeBanners } = useFieldArray({
        name: "banner",
        control
    });

    const { fields: fieldsSecciones, append: appendSecciones, remove: removeSecciones } = useFieldArray({
        name: "secciones",
        control
    });

    const { fields: fieldsCelular, append: appendCelular, remove: removeCelular } = useFieldArray({
        name: "celular",
        control
    });
    //states
    const [candidates, setCandidates]: any = useState();
    const [enterprises, setEnterprises]: any = useState();
    const [siteData, setSiteData]: any = useState();
    //UseEffects
    useEffect(() => {
        let defaultValues = {
            celular: [],
            secciones: [],
            banner: [],
            sliders: [],
            direccion: "",
            politicaPrivacidad: ""
        }

        defaultValues.celular = siteData?.homePage[0]?.celular?.map((item: any) => { return { numero: item.numero } })
        defaultValues.sliders = siteData?.homePage[0]?.sliders?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })
        defaultValues.secciones = siteData?.homePage[0]?.secciones?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })
        defaultValues.banner = siteData?.homePage[0]?.banner?.map((item: any) => { return { titulo: item.titulo, texto: item.texto } })
        defaultValues.direccion = siteData?.homePage[0]?.direccion
        defaultValues.politicaPrivacidad = siteData?.homePage[0]?.politicaPrivacidad


        reset({ ...defaultValues })
    }, [siteData?.homePage[0]])


    useEffect(() => {
        fetchData()
    }, [!siteData, !candidates, !enterprises])

    const fetchData = async () => {

        try {
            const candidateData = await axios.post('/api/administrator/candidates');
            const enterpriseData = await axios.post('/api/administrator/enterprise');
            const homeData = await axios.post('/api/administrator/homepage');

            Promise.all([homeData, enterpriseData, candidateData]).then((values: any) => {
                console.log("HomePage", values[0].data)
                // console.log("Empresa", values[1].data)
                // console.log("Candidatos", values[2].data)

                setSiteData(values[0].data);
                setEnterprises(values[1].data)
                setCandidates(values[2].data)
            })
        } catch (error) {
            console.log("error en la peticion de datos para el panel", error)
        }
    }

    const handleUserSubscripcion = async (id: string, isPremium: boolean) => {
        try {
            const subscription = await axios.post('/api/administrator/subscription', { idUsuario: id, isPremium: isPremium })
            if (subscription.status === 200) console.log("Peticion completada exitosamente"), fetchData(), toast.success('Registro actualizado', {
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
        } catch (error) {
            console.log("Error al procesar la solicitud de subscripcion", error)
            toast.error('Registro no actualizado. Error en la solicitud, intente mas tarde', {
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
        }
    }
    const onSubmit = async (data: any) => {
        const res = await axios.post('/api/administrator/homepage/edit', { data })
        if (res.status == 200) console.log("Peticion exitosa"),
            toast.success('Informacíon actualizada', {
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
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Tabla Candidatos</h2>
                <table className="min-w-full bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Subscripción</th>
                            <th className="py-2 px-4 border-b">Perfil</th>
                            <th className="py-2 px-4 border-b">Suspender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates?.paginatedCandidateQuery?.map((item: any, key: number) => (
                            <tr key={key}>
                                <td className="py-2 px-4 border-b">{item.personaData.nombre} {item.personaData.apellido}</td>
                                <td className="py-2 px-4 border-b">
                                    {item.usuarioData.isPremium ? (
                                        <button
                                            onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Anular Subscripción
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Aprobar Subscripción
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Ver Perfil</button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Suspender Usuario</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Tabla Empresas</h2>
                <table className="min-w-full bg-white shadow-md rounded mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Subscripción</th>
                            <th className="py-2 px-4 border-b">Perfil</th>
                            <th className="py-2 px-4 border-b">Suspender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enterprises?.paginatedEmpresaQuery?.map((item: any, key: number) => (
                            <tr key={key}>
                                <td className="py-2 px-4 border-b">{item.personaData.nombre}</td>
                                <td className="py-2 px-4 border-b">
                                    {item.usuarioData.isPremium ? (
                                        <button
                                            onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Anular Subscripción
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUserSubscripcion(item.usuarioData._id, item.usuarioData.isPremium)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Aprobar Subscripción
                                        </button>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Ver Perfil</button>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Suspender Usuario</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Configuración del sitio</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input type="hidden" {...register('idUsuario')} defaultValue={localStorage.getItem('idUsuario') as string} />
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección Física</label>
                        <textarea className="form-control w-full mt-1 p-2 border rounded-md" {...register('direccion', { required: true })}></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="politicaPrivacidad" className="block text-sm font-medium text-gray-700">Política de Privacidad</label>
                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register('politicaPrivacidad', { required: true })} id="politicaPrivacidad" />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Texto Sliders</h3>
                        {fieldsSliders.map((field, index) => (
                            <div key={field.id} className="mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Título del Slider</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`sliders.${index}.titulo`)} placeholder="Título" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Texto del Slider</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`sliders.${index}.texto`)} placeholder="Texto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Teléfonos</h3>
                        <button
                            type="button"
                            onClick={() => appendCelular({ numero: "" })}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
                        >
                            Agregar Teléfono de Contacto
                        </button>
                        {fieldsCelular.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Número</label>
                                    <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`celular.${index}.numero`)} placeholder="Número" />
                                </div>
                                <div className="flex items-end">
                                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => removeCelular(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Texto Banners</h3>
                        {fieldsBanners.map((field, index) => (
                            <div key={field.id} className="mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Título del Banner</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`banner.${index}.titulo`)} placeholder="Título" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Texto del Banner</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`banner.${index}.texto`)} placeholder="Texto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Texto Secciones</h3>
                        {fieldsSecciones.map((field, index) => (
                            <div key={field.id} className="mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Título de la Sección</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`secciones.${index}.titulo`)} placeholder="Título" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Texto de la Sección</label>
                                        <input type="text" className="form-control w-full mt-1 p-2 border rounded-md" {...register(`secciones.${index}.texto`)} placeholder="Texto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar Configuración</button>
                </form>
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
    );
}