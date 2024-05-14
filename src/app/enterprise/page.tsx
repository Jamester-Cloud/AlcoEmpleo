"use client"
import React from "react"
import axios from "axios"
import ListCarousel from "../components/carousel/Carousel"
import Image from "next/image"


export default function CandidateSearch() {
    const [data, setData]: any = React.useState()
    const [premiumsData, setPremiumsData]: any = React.useState()

    const fetchAllCandidates = async () => {
        //
        try {
            const response: any = await axios.get("/api/enterprise/candidateList")
            console.log(response.data)
            if (response.status == 200) return {
                candidatos: response.data.dataCandidatos,
                candidatosPremiums: response.data.dataCandidatosPremium
            }
        } catch (error) {

        }
    }

    React.useEffect(() => {
        if (!data && !premiumsData) {
            (async () => {
                try {
                    const dataCandidates: any = await fetchAllCandidates()
                    setData(dataCandidates.candidatos)
                    setPremiumsData(dataCandidates.candidatosPremiums)
                    console.log(premiumsData)
                } catch (err) {
                    console.log('Error al cargar los datos el usuario');
                }
            })();
        }
    })

    return (
        <section className="section">
            <div className="container">
                <div className="justify-content-center row">
                    <div className="col-lg-12 mt-2">
                        <div className="candidate-list-widgets mb-4">
                            <h3>Busqueda personalizada</h3>
                            <hr />
                            <form action="#" className="">
                                <div className="g-2 row">
                                    <div className="col-lg-3">
                                        <div className="filler-job-form">
                                            <i className="uil uil-briefcase-alt"></i><input id="exampleFormControlInput1" placeholder="Cargo" type="search" className="form-control filler-job-input-box form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="filler-job-form">
                                            <i className="uil uil-location-point"></i>
                                            <select className="form-select selectForm__inner" data-trigger="true" name="choices-single-location" id="choices-single-location" aria-label="Default select example">
                                                <option value="">Ubicación</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="filler-job-form">
                                            <i className="uil uil-clipboard-notes"></i>
                                            <select className="form-select selectForm__inner" data-trigger="true" name="choices-single-categories" id="choices-single-categories" aria-label="Default select example">
                                                <option value="">Especialidad</option>
                                                <option value="1">IT &amp; Software</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div>
                                            <a className="btn btn-primary" href="#"><i className="uil uil-filter"></i> Buscar</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="justify-content-center row">
                    <h3 className="mb-5">Perfiles Destacados</h3>
                    {premiumsData === undefined ? <div> Cargando... </div> : <ListCarousel className="h-100 justify-content-center align-items-center" data={premiumsData} />}
                </div>
                <div className="justify-content-center row mt-5">
                    <h3>Otros candidatos</h3>
                    <hr />
                </div>
                {/* Normal candidates loop */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="align-items-center row">
                            {/* Cantidad total de registros */}
                            {/* <div className="col-lg-8">
                                <div className="mb-3 mb-lg-0"><h6 className="fs-16 mb-0">Showing 1 – 8 of 11 results</h6></div>
                            </div> */}
                            <div className="col-lg-4">
                                <div className="candidate-list-widgets">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="selection-widget">
                                                <select className="form-select" data-trigger="true" name="choices-single-filter-orderby" id="choices-single-filter-orderby" aria-label="Default select example">
                                                    <option value="df">Default</option>
                                                    <option value="ne">Newest</option>
                                                    <option value="od">Oldest</option>
                                                    <option value="rd">Random</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="selection-widget mt-2 mt-lg-0">
                                                <select className="form-select" data-trigger="true" name="choices-candidate-page" id="choices-candidate-page" aria-label="Default select example">
                                                    <option value="df">All</option>
                                                    <option value="ne">8 per Page</option>
                                                    <option value="ne">12 per Page</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Lista de candidatos aca */}
                        <div className="candidate-list">

                            {data?.map((item: any) =>
                                <div className="candidate-list-box card mt-4" key={item._id}>
                                    <div className="p-4 card-body">
                                        <div className="align-items-center row">
                                            <div className="col-auto">
                                                <div className="candidate-list-images">
                                                    <a href="#"><Image src="/AlcoLogo.png" width={40} height={30} alt="" className="avatar-md img-thumbnail rounded-circle" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="candidate-list-content mt-3 mt-lg-0">
                                                    <h5 className="fs-19 mb-0">
                                                        <a className="primary-link" href="#">{item.personaData.nombre}</a><span className="badge bg-success ms-1"><i className="mdi mdi-star align-middle"></i>4.8</span>
                                                    </h5>
                                                    <p className="text-muted mb-2">{item.Candidato.perfil.puestoDeseado}</p>
                                                    <ul className="list-inline mb-0 text-muted">
                                                        <li className="list-inline-item"><i className="mdi mdi-map-marker"></i> Venezuela</li>
                                                        <li className="list-inline-item"><i className="mdi mdi-wallet"></i>{item.Candidato.perfil.salarioDeseado} $</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                                                    <span className="badge bg-soft-secondary fs-14 mt-1">Datos verificados</span><span className="badge bg-soft-secondary fs-14 mt-1">CV anexado</span><span className="badge bg-soft-secondary fs-14 mt-1"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="favorite-icon">
                                            <a href="#"><i className="mdi mdi-heart fs-18"></i></a>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mt-4 pt-2 col-lg-12">
                        <nav aria-label="Page navigation example">
                            <div className="pagination job-pagination mb-0 justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" tabIndex={-1} href="#"><i className="mdi mdi-chevron-double-left fs-15"></i></a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="mdi mdi-chevron-double-right fs-15"></i></a>
                                </li>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}