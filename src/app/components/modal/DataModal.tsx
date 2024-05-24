import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';

export default function DataModal(props: any) {
    let { data, title, show, onHide } = props;
    console.log(data);

    const form = (title: string) => {
        switch (title) {
            //Perfil
            case 'Perfil del candidato':
                return (
                    <form className='form'>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="puestoDeseado" className='form-control' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="salarioDeseado" className='form-control' />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <textarea id="descripcionPersonal" className='form-control' />
                            </div>
                        </div>
                    </form>
                )
                break;

            case 'Datos personales':
                return (
                    <form className='form'>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="nombre" className='form-control' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="apellido" className='form-control' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="telefono" className='form-control' />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <input type="text" id="email" className='form-control' />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <textarea id="email" className='form-control' />
                            </div>
                        </div>
                    </form>
                )
                break;

            case 'Experiencias Laborales':
                return (
                    <form className='form'>
                        {data?.map((item: any, key: any) => (
                            <div className="row" key={item._id}>
                                <h5>Experiencia:</h5>
                                <div className="col-md-3"><label className="labels">Empresa</label><input type="text" className="form-control" placeholder="Empresa" defaultValue={item.nombreEmpresa} /></div>
                                <div className="col-md-3"><label className="labels">Descripcíon</label><textarea className="form-control" defaultValue={item.descripcion} /></div>
                                <div className="col-md-3"><label className="labels">Duracíon</label><input type="text" defaultValue={item.duracion} className="form-control" placeholder="additional details" /></div>
                                <h6 className="mt-3">Logros:</h6>
                                {item?.logros.map((subItem: any) => (
                                    <div key={subItem._id}>
                                        <div className="col-md-12 mb-3"><label className="labels">Logro:</label><input type="text" defaultValue={subItem.descripcionLogro} className="form-control" placeholder="additional details" /></div>
                                    </div>
                                ))}
                                <h6>Referencias:</h6>
                                {item?.referencias.map((subItem: any) => (
                                    <div key={subItem._id}>
                                        <div className="col-md-12 mb-3"><label className="labels">Recomendado por:</label><input type="text" defaultValue={subItem.referencia} className="form-control" placeholder="additional details" /></div>
                                    </div>
                                ))}
                                <hr />
                            </div>
                        ))}
                        <div className="row text-center">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>

                        </div>
                    </form>

                )
                break;

            case 'Habilidades':
                return (
                    <form className='form '>
                        {data?.map((item: any, key: any) => (
                            <div className="row" key={item._id}>
                                <div className="col-md-6"><label className="labels">Habilidad</label><input type="text" className="form-control"
                                    defaultValue={item.nombreHabilidad} placeholder="experience" /></div> <br />
                                <div className="col-md-6"><label className="labels">Nivel de habilidad</label><input type="text"
                                    className="form-control" defaultValue={item.nivelHabilidad} placeholder="experience" /></div> <br />
                            </div>
                        ))}
                        <div className="row text-center mt-5">
                            <button className="btn btn-primary btn-block">Guardar cambios</button>
                        </div>
                    </form>

                )
                break
        }
    }


    const onHandlingSubmit = () => {

    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        {form(title)}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}