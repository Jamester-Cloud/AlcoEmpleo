import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCity, faSuitcaseRolling,faHouseSignal,faBuilding  } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function ListsOffer() {
  return (
    <div>
        
        <section className="section">
    <div className="container  mt-2">
        <div className="justify-content-center row">
            <div className="col-lg-12">
                <div className="candidate-list-widgets mb-4">
                    <form action="#" className="">
                        <div className="g-2 row">
                            <div className="col-lg-3">
                                <div className="">
                                    <i className=""></i><input id="formOffer" placeholder="Trabajo, Compañia " type="search" className="form-control  " />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="filler-job-form">
                                    <i className="uil uil-location-point"></i>
                                    <select className="form-select selectForm__inner" data-trigger="true" name="choices-single-location" id="choices-single-location" aria-label="Default select example">
                                        <option value="AF">Caracas</option>
                                        <option value="AX">Acarigua</option>
                                        <option value="AL">Barquisimeto</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="filler-job-form">
                                    <i className="uil uil-clipboard-notes"></i>
                                    <select className="form-select selectForm__inner" data-trigger="true" name="choices-single-categories" id="choices-single-categories" aria-label="Default select example">
                                        <option value="4">Contabilidad</option>
                                        <option value="1">Programador</option>
                                        <option value="3">Cocinero</option>
                                        <option value="5">Pintor</option>
                                    </select>
                                </div>
                            </div>   {/* Listado Tipo de Busqueda  */}
                           
                            <div className="col-lg-3  ">
                                <div>
                                    <a className="btn btn-secondary  w-full" href="#"><i className="uil uil-filter"></i> Filtrar</a>
                                </div>
                           
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="align-items-center row">
                    <div className="col-lg-8">
                        <div className="mb-3 mb-lg-0"><h6 className="fs-16 mb-0">Mostrando 1 – 8</h6></div>
                    </div>
                    <div className="col-lg-4">
                        <div className="candidate-list-widgets">
                            <div className="row">
                                <div className="">
                                    <div className="selection-widget">
                                        <select className="form-select" data-trigger="true" name="choices-single-filter-orderby" id="choices-single-filter-orderby" aria-label="Default select example">
                                       
                                            <option value="ne">Más Reciente</option>
                                            <option value="od">Más Antiguo</option>
                                            <option value="rd">Random</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                   {/* Iniciando Lista de Candidatos*/}
                <div className="candidate-list ">
                 
                 {/* Candidato */}
                    <div className="candidate-list-box card mt-4">
                        <div className="p-4 card-body   ">
                            <div className=" row d-grid grid-cols-1 sm:grid-cols-2   text-center">
                                <div className="col-auto">
                                    <div className="candidate-list-images">
                                        <a href="#"><Image src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md img-thumbnail rounded-circle m-auto" /></a>
                                    </div>
                                    <div className="candidate-list-content mt-3 mt-lg-0">
                                        <h5 className="fs-19 mb-0 ">
                                            <a className="primary-link text-decoration-none" href="#">Cisco</a>
                                        </h5>
                                        <p className="text-muted mb-2"><FontAwesomeIcon icon={faSuitcaseRolling} className='mr-1'/>Categoria:Programador</p>
                                        <p className="text-muted mb-2"><FontAwesomeIcon icon={faCity}/>Ciudad: Acarigua</p>
                                    
                                 
                                        <ul className="list-inline mb-0 text-muted">
                                            <li className="list-inline-item"><FontAwesomeIcon icon={faHouseSignal}/> Presencial y Remoto</li>
                                        </ul>
                                    </div>
                              
                                <div className="col-lg-4">
                                    <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                                        <span className="badge bg-soft-secondary fs-14 mt-1">Leader</span><span className="badge bg-soft-secondary fs-14 mt-1">Manager</span><span className="badge bg-soft-secondary fs-14 mt-1">Developer</span>
                                    </div>
                                </div>
                                </div>
                              
                                <div className=' text-justify'>
                                    <h3>Descripción</h3>
                                    <p  className=' text-justify'>Somos un equipo de alto desempeño, dedicado a brindar soluciones, con experiencia profesional y enfoque al cliente, nos auto definimos como una empresa de innovación y desarrollo con vocación de servicio, orientados hacia la excelencia y la calidad, buscando programadores Backend, y necesitamos que tengas los siguientes conocimientos
                                    </p>
                                    <h4 >Requerimientos:</h4>
                                    <ul className=' list-disc grid grid-cols-2 gap-4 text-start'>     
                                        <li>Mysql</li>
                                        <li>PHP</li>
                                        <li>ADMIN</li>
                                        <li>Mysql</li>
                                        <li>Experiencia en Mysql y otros factores </li>
                                        <li>Experiencia en Redes Informticas</li>
                                        <li>Experiencia 3 años Comprobables En redes de Informatica</li>
                                    </ul>
                                </div>
                             
                            </div>
                            <div className="favorite-icon">
                                <a href="#"><i className="mdi mdi-heart fs-18"></i></a>
                            </div>
                        </div>
                    </div>  {/*Final Oferta  */}
                      {/* Candidato */}
                    <div className="candidate-list-box card mt-4">
                        <div className="p-4 card-body   ">
                            <div className=" row d-grid grid-cols-1 sm:grid-cols-2   text-center">
                                <div className="col-auto">
                                    <div className="candidate-list-images">
                                        <a href="#"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="avatar-md img-thumbnail rounded-circle m-auto" /></a>
                                    </div>
                                    <div className="candidate-list-content mt-3 mt-lg-0">
                                        <h5 className="fs-19 mb-0 ">
                                            <a className="primary-link text-decoration-none" href="#">Amibar</a>
                                        </h5>
                                        <p className="text-muted mb-2"><FontAwesomeIcon icon={faSuitcaseRolling} className='mr-1'/>Categoria:Cocinero</p>
                                        <p className="text-muted mb-2"><FontAwesomeIcon icon={faCity}className='mr-1'/>Ciudad: Barquisimeto</p>
                                    
                                 
                                        <ul className="list-inline mb-0 text-muted">
                                            <li className="list-inline-item"><FontAwesomeIcon icon={faBuilding}className='mr-1'/> Presencial</li>
                                        </ul>
                                    </div>
                              
                                <div className="col-lg-4">
                                    <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                                        <span className="badge bg-soft-secondary fs-14 mt-1">Leader</span><span className="badge bg-soft-secondary fs-14 mt-1">Manager</span><span className="badge bg-soft-secondary fs-14 mt-1">Developer</span>
                                    </div>
                                </div>
                                </div>
                              
                                <div className=' text-justify'>
                                    <h3>Descripción</h3>
                                    <p  className=' text-justify'>Buscamos un cocinero cualificado para preparar platos deliciosos de acuerdo con el menú. Se encargará de cocinar platos que deleiten a nuestros clientes por su sabor y servicio oportuno.

Un cocinero excelente debe ser capaz de seguir las instrucciones para cocinar y servir comidas bien preparadas. Debe ser capaz de manejarse en la cocina y de realizar varias tareas a la vez. También es importante la experiencia en el uso de diversos ingredientes y técnicas de cocina. El objetivo es conservar y mejorar nuestra reputación para ampliar nuestra clientela.
                                    </p>
                                    <h4 >Requerimientos:</h4>
                                    <ul className=' list-disc grid grid-cols-2 gap-4 text-start'>     
                                        <li>Lavar Platos</li>
                                        <li>Cocinar a la Parilla</li>
                                        <li>Preparar Salsa</li>
                             
                                       
                                    </ul>
                                </div>
                             
                            </div>
                            <div className="favorite-icon">
                                <a href="#"><i className="mdi mdi-heart fs-18"></i></a>
                            </div>
                        </div>
                    </div>  {/*Final Oferta  */}
                    
                    
               
        
                
            
                </div>
            </div>
        </div>
        {/* Numeros de paginados */}
        <div className="row">
            <div className="mt-4 pt-2 col-lg-12">
                <nav aria-label="Page navigation example">
                    <div className="pagination job-pagination mb-0 justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link"  href="#"><i className="mdi mdi-chevron-double-left fs-15"></i></a>
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
      
    </div>
  )
}
