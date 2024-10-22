"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import Footer from "@/app/components/Footer/footer";
import {
  faCheckCircle,

} from "@fortawesome/free-solid-svg-icons";
import "@/app/candidate/edit/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type FormValues = {
  actaConstitutiva: File;
  direccionFiscal: string;
  idUsuario: string;
  cedula: string;
  riff: string;
  telefono: string;
  razonSocial: String;
  idPersona: String;
  logo: File;
  email:String;
};

export default function UserProfile({ params }: any) {


  let { id } = params;

  const methods = useForm<FormValues>({
    defaultValues: {
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

  const [userData, setUserData]: any = useState({});

  const getUserDetails = async () => {
    const res = await axios.post("/api/administrator/enterprise/getEnterprise", { idUsuario: id });
    console.log(res.data)
    setUserData({ ...res.data.data[0], personaData: res.data.data[0].personaData[0], logoEmpresa: res?.data?.logo[0]?.documentos.idArchivo, acta: res?.data?.acta })
  };

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);

  const handleModal = (e: any, title: string, data: any) => {
    e.preventDefault();
    setModalTitle(title);
    setShow(true);
  };

  const handleSubmitForm = async (data: any) => {
    try {
      const res = await axios.post('/api/enterprise/me/edit', { data: data, dataType: 'Personas' }, { headers: { 'content-type': 'multipart/form-data' } })
      if (res.status == 200) {
        console.log(res.data)
        setShow(false);
        await getUserDetails()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogoForm = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post('/api/enterprise/me/edit', { logo: data.logo[0], idUsuario: data.idUsuario, dataType: 'Logo' }, { headers: { 'content-type': 'multipart/form-data' } })
      if (res.status == 200) {
        console.log(res.data)
        setShow(false);
        await getUserDetails()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleActaForm = async (data: any) => {
    console.log(data)
    try {
      const res = await axios.post('/api/enterprise/me/edit', { acta: data.actaConstitutiva[0], idUsuario: data.idUsuario, dataType: 'Acta' }, { headers: { 'content-type': 'multipart/form-data' } })
      if (res.status == 200) {
        console.log(res.data)
        setShow(false);
        await getUserDetails()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails();
    console.log(userData)
  }, [!userData]);

  const form = (title: string, data: any) => {
    switch (title) {
      case 'Editar datos empresa':
        return (
          <>
            <form onSubmit={handleSubmit(handleSubmitForm)} className='form '>
              <div
                className="col-md-12"><label className="labels">Riff</label><input type="text" className="form-control"
                  {...register("riff")} placeholder="Riff" defaultValue={data?.personaData?.cedula} />
              </div> <br />
              <input type="hidden"  {...register("idPersona")} defaultValue={data?.personaData?._id} />

              <input type="hidden"   {...register("idUsuario")} defaultValue={data?._id} />
              <div
                className="col-md-12"><label className="labels">Razon Social</label>
                <input type="text" className="form-control"
                  {...register("razonSocial")} placeholder="razonSocial" defaultValue={data?.personaData?.nombre} />
              </div>
              <div
                className="col-md-12"><label className="labels">Email</label><textarea className="form-control"
                  {...register("email")} placeholder="Direccion Fiscal" defaultValue={data?.usersData?.email} />
              </div>
              <div
                className="col-md-12"><label className="labels">Direccíon Fiscal</label><textarea className="form-control"
                  {...register("direccionFiscal")} placeholder="Direccion Fiscal" defaultValue={data?.personaData?.direccion} />
              </div>

              <div
                className="col-md-12"><label className="labels">Telefono</label><textarea className="form-control"
                  {...register("telefono")} placeholder="Telefono" defaultValue={data?.personaData?.telefono} />
              </div>

              <div className="col-md-12 text-center mt-5">
                <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
              </div>

            </form>
          </>
        )
      case 'Actualizar logo':
        return (
          <form onSubmit={handleSubmit(handleLogoForm)} className='form '>
            <div className="col-md-12 mt-4">
              <label className="labels">Logo institucional</label>
              <div className="d-flex flex-column align-items-center ">
                <input type="hidden"   {...register("idUsuario")} defaultValue={data?._id} />
                <input type="file" accept=".jpg, .jpeg, .png" placeholder="Actualizar Logo" {...register("logo", { required: true })} className="form-group form-control" />
              </div>
            </div>
            <div className="col-md-12 text-center mt-5">
              <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
            </div>

          </form>
        )
        break;
      case 'Actualizar Acta':
        return (
          <form onSubmit={handleSubmit(handleActaForm)} className='form '>
            <div className="col-md-12 mt-4">
              <label className="labels">Acta constitutiva</label>
              <div className="d-flex flex-column align-items-center ">
                <input type="hidden"   {...register("idUsuario")} defaultValue={data?._id} />
                <input type="file" accept=".pdf" placeholder="Actualizar Acta" {...register("actaConstitutiva", { required: true })} className="form-group form-control" />
              </div>
            </div>
            <div className="col-md-12 text-center mt-5">
              <button className="btn btn-primary btn-block" type='submit'>Guardar cambios</button>
            </div>

          </form>
        )
        break;
    }
  }

  return (
    <div className="">
      <div className="container mx-auto mt-5 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 relative">
          <div className="flex flex-wrap justify-center sm:justify-between items-center space-y-2 sm:space-y-0">
            <button
              onClick={(e) => handleModal(e, 'Editar datos empresa', {})}
              className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md w-full sm:w-auto"
            >
              Actualizar información básica
            </button>
            <button
              onClick={(e) => handleModal(e, 'Actualizar logo', {})}
              className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md w-full sm:w-auto"
            >
              Editar Logo
            </button>
            <button
              onClick={(e) => handleModal(e, 'Actualizar Acta', {})}
              className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md w-full sm:w-auto"
            >
              Editar Acta
            </button>
            {userData?.acta?.idArchivo ? (
              <a
                href={`/api/enterprise/download?idArchivo=${userData.acta.idArchivo}`}
                className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md w-full sm:w-auto text-center no-underline	"
              >
                Descargar Acta constitutiva
              </a>
            ) : (
              <p className="text-gray-500 text-center w-full">Sin Acta constitutiva</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start mt-4">
            <Image
              src={userData?.logoEmpresa ? `/api/enterprise/enterpriseLogo?idArchivo=${userData?.logoEmpresa}` : '/AlcoLogo.png'}
              alt="Admin"
              className="rounded-2xl mb-4 md:mb-0 md:mr-4 w-full md:w-72"
              width={800}
              height={800}
            />
            <div className="text-left md:flex-1 md:flex md:flex-col md:justify-center">
              <h2 className="text-2xl mt-2 font-bold">
                {/* Condicionar a subida de acta constitutiva */}
                {/* <span className="badge bg-success rounded-full ml-4">
                  <FontAwesomeIcon icon={faCheckCircle} /> Verificado
                </span> */}
              </h2>
              <p className="text-xl text-gray-600">
              </p>
              <div className="flex flex-col md:flex-row mt-2 text-gray-500">
                <div className="flex flex-row mb-2 md:mb-0">
                  <p className="text-blue-800 mr-2">Teléfono:</p>{" "}
                  <p>{userData?.personaData?.telefono || ""}</p>
                </div>
                <div className="flex flex-row md:ml-10">
                  <p className="text-blue-800 mr-2">Email:</p>{" "}
                  <p>{userData?.usersData?.email || ""}</p>
                </div>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p className="text-blue-800 mr-2">Dirección:</p>{" "}
                <p>{userData?.personaData?.direccion || ""}</p>
              </div>
              <div className="flex flex-row text-gray-600 mt-2">
                <p className="text-blue-800 mr-2">Razón Social:</p>{" "}
                <p>{userData?.personaData?.nombre || ""}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {/* <h3 className="text-xl font-semibold mb-2">Descripción</h3>
            <hr />
            <p className="text-gray-600">
            </p>
             */}
          </div>
        </div>
      </div>
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
          <div className="row">
            {form(modalTitle, userData)}
          </div>
        </Modal.Body>
      </Modal>
    </div>

  );
}
