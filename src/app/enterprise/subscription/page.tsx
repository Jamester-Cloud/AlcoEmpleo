"use client";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
//import '../subscription/css/styles.css'

export default function SubscriptionPage() {

    const { register, handleSubmit } = useForm();
    const [processor, setProcessor] = useState('');
    const [paymentData, setPaymentData] = useState({ email: "admgrupoalco@gmail.com", monto: "5$", cedula: "12247978", telefono: "04145299886", banco: "Exterior" });

    const handleProcessor = (data: string) => {
        setProcessor(data)
    }

    const submit = async (data: any) => {
        console.log(data)
        let whatsappMessage = encodeURIComponent(`Saludos!, mi nombre es, ${data.nombre} ${data.apellidos}. Adjunto la informacion de mi pago, con referencia: ${data.referencia}, hecho en: ${data.proccesor} con un monto de: ${paymentData.monto}.`)
        window.open(`https://wa.me/${paymentData.telefono}?text=${whatsappMessage}`)
        // 
    }

    const loadPaymentData = () => {
        switch (processor) {
            case 'Zinli':

                return (
                    <ul>
                        <li>Email Zinli: {paymentData.email}</li>
                        <li>Monto: {paymentData.monto}</li>
                    </ul>
                )
            case 'Paypal':
                return (
                    <ul>
                        <li>Email Paypal: {paymentData.email}</li>
                        <li>Monto: {paymentData.monto}</li>
                    </ul>
                )

            case 'Binance':
                return (
                    <ul>
                        <li>Email Binance: {paymentData.email}</li>
                        <li>Monto: {paymentData.monto}</li>
                    </ul>
                )
            case 'Pago movil':
                return (
                    <ul>
                        <li>Telefono : {paymentData.telefono}</li>
                        <li>Banco: {paymentData.banco}</li>
                        <li>cedula: {paymentData.cedula}</li>
                        <li>Monto: {paymentData.monto}</li>
                    </ul>
                )

        }
    }

    return (
        <div className="container-fluid">
            <h3>Subscripcion</h3>
            {/* Hay 2 logicas de vista, una es cuando es por primera vez, la otra es cuando ya tiene una activa/desactivada pero no es primera vez que se inscribe */}
            <div className="card">Aca iria informacion de la subscripcion(si esta activa, cuanto tiempo le queda, fecha de vencimiento, fecha de inicio)</div>
            <div className="row mt-5">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                Metodos de pago
                            </div>
                            <div className="card-body">
                                <ul>
                                    <li>
                                        <input type="radio" onClick={() => handleProcessor('Paypal')} {...register("proccesor", { required: true })} value="Paypal" /> Paypal
                                    </li>
                                    <li>
                                        <input type="radio" onClick={() => handleProcessor('Pago movil')} {...register("proccesor", { required: true })} value="Mobile" /> Pago movil
                                    </li>
                                    <li>
                                        <input type="radio" onClick={() => handleProcessor('Zinli')} {...register("proccesor", { required: true })} value="Zinli" /> Zinli
                                    </li>
                                    <li>
                                        <input type="radio" onClick={() => handleProcessor('Binance')} {...register("proccesor", { required: true })} value="Binance" /> Binance
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Reporte de pagos
                            </div>
                            <div className="card-body">
                                Se aparece la informacion, correspondiente al pago, al dar algunos de los <br />
                                {processor}
                                {loadPaymentData()}
                                <div className="row">
                                    <div className="col-md-12">
                                        <input className='form-control' type="text" {...register("cedula", { required: true })} placeholder="Cedula" />
                                    </div>
                                    <div className="col-md-6">
                                        <input className='form-control' type="text" {...register("nombre", { required: true })} placeholder="Nombres" />
                                    </div>
                                    <div className="col-md-6">
                                        <input className='form-control' type="text" {...register("apellidos", { required: true })} placeholder="Apellidos" />
                                    </div>

                                    <div className="col-md-12">
                                        <textarea className='form-control' {...register("direccion", { required: true })} placeholder="Direccion" />
                                    </div>

                                    <div className="col-md-6">
                                        <input className='form-control' type="text" {...register("referencia", { required: true })} placeholder="Referencia" />
                                    </div>

                                </div>

                                <button className="btn btn-primary">Reportar pago</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}