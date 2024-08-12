/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
type FormValues = {
  sliders: {
    titulo: string;
    texto: string;
    imagen: { ruta: string };
  }[];
  celular: {
    numero: string;
  }[];
  banner: {
    titulo: string;
    texto: string;
  }[];
  secciones: {
    titulo: string;
    texto: string;
  }[];
  politicaPrivacidad: string;
  direccion: string;
  idUsuario: string;
  cedula: string;
  riff: string;
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
    },
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  //array fields react hook form
  const {
    fields: fieldsSliders,
    append: appendSliders,
    remove: removeSliders,
  } = useFieldArray({
    name: "sliders",
    control,
  });

  const {
    fields: fieldsBanners,
    append: appendBanners,
    remove: removeBanners,
  } = useFieldArray({
    name: "banner",
    control,
  });

  const {
    fields: fieldsSecciones,
    append: appendSecciones,
    remove: removeSecciones,
  } = useFieldArray({
    name: "secciones",
    control,
  });

  const {
    fields: fieldsCelular,
    append: appendCelular,
    remove: removeCelular,
  } = useFieldArray({
    name: "celular",
    control,
  });
  //states Candidates
  const [candidates, setCandidates]: any = useState();
  const [pageCandidate, setPageCandidate] = useState(1);
  const [pageCandidateCount, setCandidatePageCount]: any = useState(1);
  //states enteprise
  const [enterprises, setEnterprises]: any = useState();
  const [pageEnterprise, setPageEnterprise] = useState(1);
  const [pageEnterpriseCount, setEnterprisePageCount]: any = useState(1);
  //states homepage
  const [siteData, setSiteData]: any = useState();
  //UseEffects
  //siteData
  useEffect(() => {
    let defaultValues = {
      celular: [],
      secciones: [],
      banner: [],
      sliders: [],
      direccion: "",
      politicaPrivacidad: "",
    };

    defaultValues.celular = siteData?.homePage[0]?.celular?.map((item: any) => {
      return { numero: item.numero };
    });
    defaultValues.sliders = siteData?.homePage[0]?.sliders?.map((item: any) => {
      return {
        titulo: item.titulo,
        texto: item.texto,
        imagen: { ruta: item.imagen.ruta },
      };
    });
    defaultValues.secciones = siteData?.homePage[0]?.secciones?.map(
      (item: any) => {
        return { titulo: item.titulo, texto: item.texto };
      }
    );
    defaultValues.banner = siteData?.homePage[0]?.banner?.map((item: any) => {
      return { titulo: item.titulo, texto: item.texto };
    });
    defaultValues.direccion = siteData?.homePage[0]?.direccion;
    defaultValues.politicaPrivacidad =
      siteData?.homePage[0]?.politicaPrivacidad;

    reset({ ...defaultValues });
  }, [siteData?.homePage[0]]);

  //site
  useEffect(() => {
    fetchData();
  }, [!siteData]);

  //candidate
  useEffect(() => {
    if (!candidates) fetchCandidateData();
  }, [!candidates]);

  //enteprise
  useEffect(() => {
    if (!enterprises) fetchEnterpriseData();
  }, [!enterprises]);

  //siteData
  const fetchData = async () => {
    try {
      const homeData = await axios.post("/api/administrator/homepage");

      Promise.all([homeData]).then((values: any) => {
        setSiteData(values[0].data);
      });
    } catch (error) {
      console.log("error en la peticion de datos para el panel", error);
    }
  };
  // candidate data Table handle controls
  const fetchCandidateData = async () => {
    const candidateData = await axios.post(
      "/api/administrator/candidates/pagination",
      { query: { limit: 10, page: pageCandidate } }
    );
    if (candidateData.status == 200) {
      setCandidates(candidateData.data.data);
      setPageCandidate(pageCandidate);
      setCandidatePageCount(parseInt(candidateData.data.pagination.pageCount));
      console.log(candidateData.data.pagination.pageCount);
    }
  };

  const nextPageCandidate = async (nextPage: number) => {

    const candidateData = await axios.post(
      "/api/administrator/candidates/pagination",
      { query: { page: nextPage, limit: 10 } }
    );

    setCandidates(candidateData.data.data);
    setCandidatePageCount(candidateData.data.pagination.pageCount);

    if (candidateData.status == 200) {
      console.log(pageCandidate);
      setPageCandidate(nextPage);
    }
  };
  const prevPageCandidate = async (prevPage: number) => {

    const candidateData = await axios.post(
      "/api/administrator/candidates/pagination",
      { query: { page: prevPage, limit: 10 } }
    );

    setCandidates(candidateData.data.data);
    setCandidatePageCount(candidateData.data.pagination.pageCount);

    if (candidateData.status == 200) {
      setPageCandidate(prevPage);
    }
  };

  const goToPageCandidate = async (pageNumber: number) => {

    const candidateData = await axios.post(
      "/api/administrator/candidates/pagination",
      { query: { page: pageNumber, limit: 10 } }
    );

    setCandidates(candidateData.data.data);
    setPageCandidate(pageNumber);
  };

  //enterprise handle data controls
  const fetchEnterpriseData = async () => {
    const enterpriseData = await axios.post(
      "/api/administrator/enterprise/pagination",
      { query: { limit: 5, page: pageEnterprise } }
    );
    if (enterpriseData.status == 200) {
      setEnterprises(enterpriseData.data.data);
      setPageEnterprise(pageEnterprise);
      setEnterprisePageCount(
        parseInt(enterpriseData.data.pagination.pageCount)
      );
    }
  };

  const nextPageEnterprise = async (nextPage: number) => {
    console.log("Pagina siguiente");
    const enterpriseData = await axios.post(
      "/api/administrator/enterprise/pagination",
      { query: { page: nextPage, limit: 5 } }
    );
    setEnterprises(enterpriseData.data.data);
    setEnterprisePageCount(enterpriseData.data.pagination.pageCount);

    if (enterpriseData.status == 200) {
      console.log(pageCandidate);
      setEnterprises(nextPage);
    }
  };
  const prevPageEnterprise = async (prevPage: number) => {
    console.log("Pagina previa");
    const enterpriseData = await axios.post(
      "/api/administrator/enterprise/pagination",
      { query: { page: prevPage, limit: 5 } }
    );
    setEnterprises(enterpriseData.data.data);
    setEnterprisePageCount(enterpriseData.data.pagination.pageCount);
    if (enterpriseData.status == 200) {
      setPageEnterprise(prevPage);
    }
  };

  const goToPageEnterprise = async (pageNumber: number) => {
    const enterpriseData = await axios.post(
      "/api/administrator/enterprise/pagination",
      { query: { page: pageNumber, limit: 5 } }
    );
    setEnterprises(enterpriseData.data.data);
    setPageEnterprise(pageNumber);
  };

  //table functions
  const handleUserSubscripcion = async (id: string, isPremium: boolean) => {
    try {
      const subscription = await axios.post("/api/administrator/subscription", {
        idUsuario: id,
        isPremium: isPremium,
      });
      if (subscription.status === 200)
        console.log("Peticion completada exitosamente"),
          fetchData(),
          toast.success("Registro actualizado", {
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
      console.log("Error al procesar la solicitud de subscripcion", error);
      toast.error(
        "Registro no actualizado. Error en la solicitud, intente mas tarde",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };
  const handleCandidateSearch = async (data: any) => {
    if (data.cedula == "") return false;
    const search = await axios.post("/api/administrator/searchUser/search", {
      query: { cedula: data.cedula },
    });
    if (search.status == 200) {
      console.log("candidatos", search);
      setCandidates(search.data.data);
    }
  };

  const handleEnterpriseSearch = async (data: any) => {
    if (data.riff == "") return false;
    const search = await axios.post("/api/administrator/searchUser/search", {
      query: { riff: data.riff },
    });
    if (search.status == 200) {
      setEnterprises(search.data.data);
      console.log("empresas", search);
    }
  };
  
  // const handlUserStatus = async (data: any) => {
  //     const search = await axios.post('/api/administrator/searchUser/search', {cedula:data.cedula})
  //     if(search.status == 200) console.log("Exito")
  // }

  //HomePage data
  const onSubmit = async (data: any) => {
    const res = await axios.post("/api/administrator/homepage/edit", { data });
    if (res.status == 200)
      console.log("Peticion exitosa"),
        toast.success("Informacíon actualizada", {
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
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tabla Candidatos</h2>
        <form onSubmit={handleSubmit(handleCandidateSearch)}>
          <>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  {...register("cedula")}
                  maxLength={15}
                  className="form-control"
                  placeholder="Cedula EJ: V123456789"
                />
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </>
        </form>
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Icono</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Subscripción</th>
              <th className="py-2 px-4 border-b">Perfil</th>
              <th className="py-2 px-4 border-b">Suspender</th>
              <th className="py-2 px-4 border-b">Generar Cuestionario</th>
            </tr>
          </thead>
          <tbody>
            {candidates?.map((item: any, key: number) => (
              <tr key={key}>
                <td>
                  <Image className="rounded-full m-2" src={"/Imagen-card.png"} alt={""} width={80} height={80} />
                  {item.personaData.cedula}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.personaData.nombre} {item.personaData.apellido}  <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 ml-1" />
                </td>
                <td className="py-2 px-4 border-b">
                  {item.usuarioData.isPremium ? (
                    <button
                      onClick={() =>
                        handleUserSubscripcion(
                          item.usuarioData._id,
                          item.usuarioData.isPremium
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Anular Subscripción
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUserSubscripcion(
                          item.usuarioData._id,
                          item.usuarioData.isPremium
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Aprobar Subscripción
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Ver Perfil
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                    Suspender Usuario
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/admin/quizzes/${item._id}`} className="btn btn-info text-white text-xs py-2 px-4 rounded">
                    Generar Cuestionario
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* paginacion que viene desde el backend */}
        <Pagination>
          <Pagination.Prev
            onClick={() => prevPageCandidate(pageCandidate - 1)}
            disabled={pageCandidate == 1}
          />
          {Array(parseInt(pageCandidateCount))
            .fill(null)
            .map((_, key) => {
              return (
                <Pagination.Item
                  key={key}
                  onClick={() => goToPageCandidate(key + 1)}
                >
                  {key + 1}
                </Pagination.Item>
              );
            })}
          <Pagination.Next
            onClick={() => nextPageCandidate(pageCandidate + 1)}
            disabled={pageCandidate == pageCandidateCount}
          />
        </Pagination>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tabla Empresas</h2>
        <form onSubmit={handleSubmit(handleEnterpriseSearch)}>
          <>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  {...register("riff")}
                  maxLength={15}
                  className="form-control"
                  placeholder="Riff EJ: J123456789"
                />
              </div>
              <div className="col-md-6">
                <button className="btn btn-primary" type="submit">
                  Buscar
                </button>
              </div>
            </div>
          </>
        </form>
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Perfil</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Subscripción</th>
              <th className="py-2 px-4 border-b">Perfil</th>
              <th className="py-2 px-4 border-b">Suspender</th>
            </tr>
          </thead>
          <tbody>
            {enterprises?.map((item: any, key: number) => (
              <tr key={key}>
                <td className="py-2 px-4 border-b">
                  <Image
                    width={50}
                    height={80}
                    className="img-fluid rounded-2xl p-1"
                    src="/AlcoSloganLogo.png"
                    alt="GrupoAlco"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  {item.personaData.nombre} {item.personaData.apellido}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.usuarioData.isPremium ? (
                    <button
                      onClick={() =>
                        handleUserSubscripcion(
                          item.usuarioData._id,
                          item.usuarioData.isPremium
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Anular Subscripción
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleUserSubscripcion(
                          item.usuarioData._id,
                          item.usuarioData.isPremium
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Aprobar Subscripción
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Ver Perfil
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                    Suspender Usuario
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* paginacion que viene desde el backend */}
        <Pagination>
          <Pagination.Prev
            onClick={() => prevPageEnterprise(pageEnterprise - 1)}
            disabled={pageEnterprise == 1}
          />
          {Array(parseInt(pageEnterpriseCount))
            .fill(null)
            .map((_, key) => {
              return (
                <Pagination.Item
                  key={key}
                  onClick={() => goToPageEnterprise(key + 1)}
                >
                  {key + 1}
                </Pagination.Item>
              );
            })}
          <Pagination.Next
            onClick={() => nextPageEnterprise(pageEnterprise + 1)}
            disabled={pageEnterprise == pageEnterpriseCount}
          />
        </Pagination>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Configuración del sitio</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección Física
            </label>
            <textarea
              className="form-control w-full mt-1 p-2 border rounded-md"
              {...register("direccion", { required: true })}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="politicaPrivacidad"
              className="block text-sm font-medium text-gray-700"
            >
              Política de Privacidad
            </label>
            <input
              type="text"
              className="form-control w-full mt-1 p-2 border rounded-md"
              {...register("politicaPrivacidad", { required: true })}
              id="politicaPrivacidad"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Texto Sliders</h3>
            {fieldsSliders.map((field, index) => (
              <div key={field.id} className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Título del Slider
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`sliders.${index}.titulo`)}
                      placeholder="Título"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Texto del Slider
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`sliders.${index}.texto`)}
                      placeholder="Texto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-danger">
                      Imagen (Cuidado, rompe el funcionamiento si la imagen no
                      existe)
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`sliders.${index}.imagen.ruta`)}
                      placeholder="Ruta de la imagen"
                    />
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
                  <label className="block text-sm font-medium text-gray-700">
                    Número
                  </label>
                  <input
                    type="text"
                    className="form-control w-full mt-1 p-2 border rounded-md"
                    {...register(`celular.${index}.numero`)}
                    placeholder="Número"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => removeCelular(index)}
                  >
                    Eliminar
                  </button>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Título del Banner
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`banner.${index}.titulo`)}
                      placeholder="Título"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Texto del Banner
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`banner.${index}.texto`)}
                      placeholder="Texto"
                    />
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
                    <label className="block text-sm font-medium text-gray-700">
                      Título de la Sección
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`secciones.${index}.titulo`)}
                      placeholder="Título"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Texto de la Sección
                    </label>
                    <input
                      type="text"
                      className="form-control w-full mt-1 p-2 border rounded-md"
                      {...register(`secciones.${index}.texto`)}
                      placeholder="Texto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Guardar Configuración
          </button>
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
